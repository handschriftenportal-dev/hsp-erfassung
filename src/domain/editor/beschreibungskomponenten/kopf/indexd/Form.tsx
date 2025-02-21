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

import { Grid } from '@mui/material'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import { ErfassungsRules } from '../../../../../infrastructure/slate/ErfassungsRules'
import { isNodeInComponent } from '../../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../../erfassung/ErfassungsState'
import {
  TEI_ELEMENT_PART_ACCMAT,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_FRAGMENT,
} from '../../../../erfassung/TEIConstants'
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'

interface Props {
  element: Element
}

export const Form: FC<Props> = memo(({ element }) => {
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const { t } = useTranslation()
  const [termElement] = element.children as Element[]
  const { id, data_type } = termElement as any
  const optionsArrayFormFilter = ['binding', 'booklet', 'loose insert']
  const msPartTypeList = [
    TEI_ELEMENT_PART_FRAGMENT,
    TEI_ELEMENT_PART_BOOKLET,
    TEI_ELEMENT_PART_BINDING,
    TEI_ELEMENT_PART_ACCMAT,
  ]
  const editor = useSlateStatic()
  const disabled = msPartTypeList.some((msPartType) =>
    isNodeInComponent(editor, termElement, msPartType)
  )

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab small-bottom-gab'} container>
        <FixedValueListAutocomplete
          leftSidelabel={t('editor.form')}
          key={id}
          termElement={termElement}
          useDeleteButton={false}
          disabled={disabled}
          helpText={disabled ? undefined : t('editor.help_text.form_type')}
          optionsArray={ErfassungsRules[beschreibungSubtype].erfassungsElemente[
            'term' + data_type
          ].values.filter((o: string) => {
            return !optionsArrayFormFilter.includes(o)
          })}
        />
      </Grid>
    </div>
  )
})
