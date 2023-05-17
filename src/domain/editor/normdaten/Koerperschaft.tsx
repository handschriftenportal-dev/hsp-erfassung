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

import React from 'react'
import i18next from 'i18next'
import { GNDEntity } from '../../../infrastructure/normdaten/GNDEntity'
import { NormdatenDialog } from './NormdatenDialog'
import { useNormdaten } from './useNormdaten'
import { NormdataBaseStyle } from './styles/NormdatenStyle'
import { NormdatenProps } from './NormdatenProps'

export const TEI_ELEMENT_ORGNAME = 'orgName'

export const Koerperschaft = React.memo(({ normdatenurl, element, children, attributes }: NormdatenProps) => {
  const [open, setOpen] = React.useState(false)
  const gndEntity: GNDEntity = useNormdaten(normdatenurl, element)

  return (
      <>
        <span role={'organisation'} onClick={() => {
          setOpen(!open)
        }} style={NormdataBaseStyle} {...attributes}>{children}</span>
        <NormdatenDialog normdatenurl={normdatenurl} title={i18next.t('editor.corporatebody')} open={open}
                         setOpen={setOpen} gndEntity={gndEntity} gndEntities={''} element={element}/>
      </>
  )
})
