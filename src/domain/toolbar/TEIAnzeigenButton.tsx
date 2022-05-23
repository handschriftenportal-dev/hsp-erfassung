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

import React, { useCallback } from 'react'
import { Editor, Node, Transforms } from 'slate'
import { TEIEncodingIcon } from './icons/TEIEncodingIcon'
import { useDispatch, useSelector } from 'react-redux'
import { enableShowTei, selectShowTei } from '../erfassung/ErfassungsState'
import { HSPLeftToolbarButton } from './styles/HSPLeftToolbarButton'
import { ReactEditor } from 'slate-react'

interface TEIAnzeigenButtonProps {
  title: string
  editor: ReactEditor
}

export const TEIAnzeigenButton = React.memo(({ title, editor }: TEIAnzeigenButtonProps) => {

  const showTei = useSelector(selectShowTei)
  const dispatch = useDispatch()


  const adjustShowTEIAttribute = useCallback((event: any) => {
    event.preventDefault()
    if (!showTei) {
      dispatch(enableShowTei(showTei))
      const nodes = Array.from(Editor.nodes(editor, { at: [0], reverse: true }))
      nodes.forEach(element => {

        Transforms.setNodes(
          editor, { showtei: true } as Partial<Node>,
          { at: element[1] }
        )
      })
    }
  }, [showTei])

  return (
      <HSPLeftToolbarButton id='teiAnzeigenButton' title={title}
                            onMouseDown={adjustShowTEIAttribute}
                            style={{
                              backgroundColor: showTei ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255,255, 0.8)',
                            }}>
        {
          <TEIEncodingIcon/>
        }
      </HSPLeftToolbarButton>
  )
})
