import { Add, ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import type { FC, MouseEvent, PropsWithChildren } from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Element } from "slate";
import type { RenderElementProps } from "slate-react";
import { useSlateStatic } from "slate-react";
import {
  HilfeButton,
  HilfeText,
} from "src/domain/editor/beschreibungskomponenten/hilfetexte";
import { HeadLine } from "src/domain/editor/HeadLine";
import {
  selectCollapseAccordionsByIds,
  selectExpandAllComponents,
  selectExpandSelectedAccordionWithNestedAccordions,
  updateCollapseAccordionsByIds,
  updateExpandSelectedAccordionWithNestedAccordions,
} from "src/domain/erfassung/ErfassungsState";
import { useGlobalModalContext } from "src/infrastructure/modal/GlobalModal";
import { getParentNode } from "src/infrastructure/slate/SlateBoundary";

interface Props extends RenderElementProps {
  element: Element;
  level: number;
  headline: string;
  helperText?: string;
}

function expandIcon(level: number, expandedPanel: boolean) {
  if (level === 0) {
    return <ExpandMore />;
  }
  return expandedPanel ? <Remove /> : <Add />;
}

const COLLAPSED_MSPART_COMPONENTS = new Set(["head", "msIdentifier"]);

export const BeschreibungsKomponenteAccordion: FC<PropsWithChildren<Props>> =
  memo(({ attributes, children, element, headline, helperText, level }) => {
    const expandComponents = useSelector(selectExpandAllComponents);
    const expandSelectedAccordionWithNestedAccordions = useSelector(
      selectExpandSelectedAccordionWithNestedAccordions
    );
    const dispatch = useDispatch();
    const { hideModal } = useGlobalModalContext();
    const collapseAccordionsByIds = useSelector(selectCollapseAccordionsByIds);
    const editor = useSlateStatic();
    const [showHelpText, setShowHelpText] = useState(false);
    const { id } = element;

    const [expandedPanel, setExpandedPanel] = useState(() => {
      const { path, data_origin } = element;
      return !(
        path?.includes("msPart") && COLLAPSED_MSPART_COMPONENTS.has(data_origin)
      );
    });
    const initializeComponent = useRef(true);

    useEffect(() => {
      if (initializeComponent.current) {
        initializeComponent.current = false;
        return;
      }
      setExpandedPanel(expandComponents);
    }, [expandComponents]);

    const upperComponentIds = useCallback(
      (element: Element | undefined): string[] => {
        const result: string[] = [];
        while (Element.isElement(element) && element.data_origin !== "msDesc") {
          if (element.id !== undefined) {
            result.push(element.id);
          }
          element = getParentNode(editor, element) as Element;
        }
        return result;
      },
      [editor]
    );

    useEffect(() => {
      if (id === expandSelectedAccordionWithNestedAccordions) {
        dispatch(updateCollapseAccordionsByIds(upperComponentIds(element)));
      }
    }, [
      dispatch,
      element,
      expandSelectedAccordionWithNestedAccordions,
      id,
      upperComponentIds,
    ]);

    useEffect(() => {
      for (const accordionId of collapseAccordionsByIds) {
        if (id === accordionId) {
          setExpandedPanel(true);
        }
      }
    }, [collapseAccordionsByIds, id]);

    const handleOnClick = useCallback(
      (event: MouseEvent): void => {
        event.preventDefault();
        hideModal();
        if (expandedPanel) {
          dispatch(updateCollapseAccordionsByIds([]));
          dispatch(updateExpandSelectedAccordionWithNestedAccordions("null"));
        } else if (id !== undefined) {
          dispatch(updateExpandSelectedAccordionWithNestedAccordions(id));
        }

        setExpandedPanel(!expandedPanel);
      },
      [hideModal, expandedPanel, dispatch, id]
    );

    return (
      <Accordion disableGutters expanded={expandedPanel}>
        <AccordionSummary
          onClick={handleOnClick}
          className={level === 0 ? "" : "simple-accordion-sub-component"}
          expandIcon={expandIcon(level, expandedPanel)}
        >
          <HeadLine label={headline} labelSize="h3" />
        </AccordionSummary>
        <AccordionDetails {...attributes}>
          {helperText && (
            <Grid container spacing={1}>
              <Grid size={3} sx={{ alignContent: "flex-start" }}>
                <HilfeButton
                  onClick={() => setShowHelpText(!showHelpText)}
                  activated={showHelpText}
                />
              </Grid>
              <Grid size={8}>
                {showHelpText && <HilfeText helperText={helperText} />}
              </Grid>
            </Grid>
          )}
          <Grid container spacing={1}>
            {children}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });
