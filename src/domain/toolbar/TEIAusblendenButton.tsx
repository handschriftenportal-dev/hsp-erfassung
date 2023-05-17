/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, { useCallback } from 'react'
import { Editor, Node, Transforms } from 'slate'
import { NotesIcon } from './icons/NotesIcon'
import { useDispatch, useSelector } from 'react-redux'
import { disableShowTei, selectShowTei } from '../erfassung/ErfassungsState'
import { HSPLeftToolbarButton } from './styles/HSPLeftToolbarButton'
import { ReactEditor } from 'slate-react'

interface TEIAusblendenButtonProps {
  title: string
  editor: ReactEditor
}

export const TEIAusblendenButton = React.memo(({ title, editor }: TEIAusblendenButtonProps) => {

  const showTei = useSelector(selectShowTei)
  const dispatch = useDispatch()

  const hideTEIAttribute = useCallback((event: any) => {
    event.preventDefault()
    if (showTei) {
      dispatch(disableShowTei(showTei))
      const nodes = Array.from(Editor.nodes(editor, { at: [0], reverse: true }))
      nodes.forEach(element => {
        Transforms.setNodes(
          editor, { showtei: false } as Partial<Node>,
          { at: element[1] }
        )
      })
    }
  }, [showTei])

  return (
          <HSPLeftToolbarButton id='teiAusblendenButton' title={title} onMouseDown={hideTEIAttribute}
                                style={{ backgroundColor: showTei ? 'rgba(255, 255,255, 0.8)' : 'rgba(0, 0, 0, 0.04)' }}>
            {
              <NotesIcon/>
            }
          </HSPLeftToolbarButton>
  )
}
)
