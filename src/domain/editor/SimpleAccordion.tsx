/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, makeStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch, useSelector } from 'react-redux'
import { selectCollapseAccordionsByIds, selectExpandAllComponents, selectExpandSelectedAccordionWithNestedAccordions, updateCollapseAccordionsByIds } from '../erfassung/ErfassungsState'
import { useSlateStatic } from 'slate-react'
import { getParentNodeSlate } from '../../infrastructure/slate/SlateBoundary'

/**
 * Author: Christoph Marten on 22.03.2022 at 13:03
 */

const useStyles = makeStyles({
  komponentAccordionRoot: {
    '&.MuiAccordion-root:before': {
      backgroundColor: 'white'
    },
    '&.MuiPaper-elevation1': {
      boxShadow: 'unset'
    },
  },
  accordionDetailsRoot: {
    '&.MuiAccordionDetails-root': {
      display: 'block',
    }
  },
})

interface SimpleAccordionProps {
  summaryContent: JSX.Element
  detailsContent: JSX.Element
  node: any
}

export const SimpleAccordion = React.memo(({ node, summaryContent, detailsContent }: SimpleAccordionProps) => {

  const classes = useStyles()
  const isExpanded = useSelector(selectExpandAllComponents)
  const expandSelectedAccordionWithNestedAccordions = useSelector(selectExpandSelectedAccordionWithNestedAccordions)
  const dispatch = useDispatch()
  const collapseAccordionsByIds = useSelector(selectCollapseAccordionsByIds)
  const editor = useSlateStatic()
  const simpleAccordionId = JSON.parse(JSON.stringify(node.id))

  const [expandedPanel, setExpandedPanel] = useState(false)

  useEffect(() => {
    setExpandedPanel(isExpanded)
  }, [isExpanded])

  const addParentNodesToCollapse = useCallback((selecetedNode: any, nodesToExpand : any) => {
    let nodeOrigin = ''
    let parentNode: any = selecetedNode

    while (nodeOrigin !== 'msDesc') {

      parentNode = getParentNodeSlate(editor, parentNode)

      if (parentNode !== null) {
        const parentNodeId = JSON.parse(JSON.stringify(parentNode.id))
        if (parentNode.data_origin !== 'msDesc') {
          nodesToExpand.push(parentNodeId)
        }
        nodeOrigin = parentNode.data_origin
      } else {
        break
      }
    }
  }, [editor])

  const addChildNodesToCollapse = useCallback((selecetedNode: any, nodesToExpand : any) => {
    if (selecetedNode.id) {
      nodesToExpand.push(selecetedNode.id)
    }
    if (selecetedNode.children) {
      for (const child of selecetedNode.children) {
        addChildNodesToCollapse(child, nodesToExpand)
      }
    }
  }, [])

  useEffect(() => {

    if ((node) && (node.id) && node.id === expandSelectedAccordionWithNestedAccordions) {
      const nodesToExpand : any = []
      addChildNodesToCollapse(node, nodesToExpand)
      addParentNodesToCollapse(node, nodesToExpand)
      nodesToExpand.push(expandSelectedAccordionWithNestedAccordions)
      dispatch(updateCollapseAccordionsByIds(nodesToExpand))
    }
  }, [expandSelectedAccordionWithNestedAccordions])

  useEffect(() => {

    for (const accordionId of collapseAccordionsByIds) {
      if (simpleAccordionId === accordionId) {
        setExpandedPanel(true)
      }
    }
    const htmlElement = document.getElementById(expandSelectedAccordionWithNestedAccordions)
    if (htmlElement) {
      setTimeout(() => {
        htmlElement.scrollIntoView(true)
        // Wait for Accordions to Collapse
      }, 800)
    }
  }, [collapseAccordionsByIds])

  const handleOnClick = useCallback((event: any) => {
    event.preventDefault()
    setExpandedPanel(!expandedPanel)
  }, [expandedPanel])

  return (<Accordion expanded={expandedPanel}
    classes={{ root: classes.komponentAccordionRoot }}
    >
    <AccordionSummary onClick={handleOnClick}
      expandIcon={<ExpandMoreIcon />}
      contentEditable={false}
    >
      {summaryContent}
    </AccordionSummary>
    <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
      {detailsContent}
    </AccordionDetails>
  </Accordion>)

})
