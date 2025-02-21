/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Add, ExpandMore, Remove } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import {
  FC,
  JSX,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Element } from 'slate'
import { RenderElementProps, useSlateStatic } from 'slate-react'

import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import { getParentNodeSlate } from '../../infrastructure/slate/SlateBoundary'
import {
  selectCollapseAccordionsByIds,
  selectExpandAllComponents,
  selectExpandSelectedAccordionWithNestedAccordions,
  updateCollapseAccordionsByIds,
  updateExpandSelectedAccordionWithNestedAccordions,
} from '../erfassung/ErfassungsState'

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
    const { id } = element as any

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
      (element: Element | null): string[] => {
        const result: string[] = []
        while (element !== null && element.data_origin !== 'msDesc') {
          result.push((element as any).id)
          element = getParentNodeSlate(editor, element)
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
        } else {
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
