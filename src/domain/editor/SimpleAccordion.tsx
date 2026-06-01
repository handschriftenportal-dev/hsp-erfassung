import { Add, ExpandMore, Remove } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import type { FC, JSX, MouseEvent } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Element } from 'slate'
import type { RenderElementProps } from 'slate-react'
import { useSlateStatic } from 'slate-react'
import {
  selectCollapseAccordionsByIds,
  selectExpandAllComponents,
  selectExpandSelectedAccordionWithNestedAccordions,
  updateCollapseAccordionsByIds,
  updateExpandSelectedAccordionWithNestedAccordions,
} from 'src/domain/erfassung/ErfassungsState'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import { getParentNode } from 'src/infrastructure/slate/SlateBoundary'

interface Props extends RenderElementProps {
  detailsContent: JSX.Element
  element: Element
  level: number
  children: JSX.Element
}

function expandIcon(level: number, expandedPanel: boolean) {
  if (level === 0) {
    return <ExpandMore />
  }
  return expandedPanel ? <Remove /> : <Add />
}

export const SimpleAccordion: FC<Props> = memo(
  ({ attributes, children, element, detailsContent, level }) => {
    const expandComponents = useSelector(selectExpandAllComponents)
    const expandSelectedAccordionWithNestedAccordions = useSelector(
      selectExpandSelectedAccordionWithNestedAccordions
    )
    const dispatch = useDispatch()
    const { hideModal } = useGlobalModalContext()
    const collapseAccordionsByIds = useSelector(selectCollapseAccordionsByIds)
    const editor = useSlateStatic()
    const { id } = element

    const [expandedPanel, setExpandedPanel] = useState(true)
    const initializeComponent = useRef(true)

    useEffect(() => {
      if (initializeComponent.current) {
        initializeComponent.current = false
        return
      }
      setExpandedPanel(expandComponents)
    }, [expandComponents])

    const upperComponentIds = useCallback(
      (element: Element | undefined): string[] => {
        const result: string[] = []
        while (Element.isElement(element) && element.data_origin !== 'msDesc') {
          if (element.id !== undefined) {
            result.push(element.id)
          }
          element = getParentNode(editor, element) as Element
        }
        return result
      },
      [editor]
    )

    useEffect(() => {
      if (id === expandSelectedAccordionWithNestedAccordions) {
        dispatch(updateCollapseAccordionsByIds(upperComponentIds(element)))
      }
    }, [element, expandSelectedAccordionWithNestedAccordions])

    useEffect(() => {
      for (const accordionId of collapseAccordionsByIds) {
        if (id === accordionId) {
          setExpandedPanel(true)
        }
      }
    }, [collapseAccordionsByIds])

    const handleOnClick = useCallback(
      (event: MouseEvent): void => {
        event.preventDefault()
        hideModal()
        if (expandedPanel) {
          dispatch(updateCollapseAccordionsByIds([]))
          dispatch(updateExpandSelectedAccordionWithNestedAccordions('null'))
        } else if (id !== undefined) {
          dispatch(updateExpandSelectedAccordionWithNestedAccordions(id))
        }

        setExpandedPanel(!expandedPanel)
      },
      [hideModal, expandedPanel, dispatch, id]
    )

    return (
      <Accordion disableGutters expanded={expandedPanel}>
        <AccordionSummary
          onClick={handleOnClick}
          className={level === 0 ? '' : 'simple-accordion-sub-component'}
          expandIcon={expandIcon(level, expandedPanel)}
        >
          {children}
        </AccordionSummary>
        <AccordionDetails {...attributes}>{detailsContent}</AccordionDetails>
      </Accordion>
    )
  }
)
