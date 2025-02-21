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
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import { TEIElement } from '../../../../../infrastructure/slate/TEI'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddErfassungElementChildrenNodeButton } from '../../AddErfassungElementChildrenNodeButton'
import {
  useGetRuleForTerm,
  useInsertNewTEINodeForIndexNormData,
} from '../HeadCustomHooks'
import { OrigPlaceNormdatenVerknuepfung } from '../OrigPlaceNormdatenVerknuepfung'

interface Props {
  element: Element
}

export const ORIG_PLACE_DATA_TYPE = 'origPlace_norm'

export const OrigPlace: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()

  const { data_indexName } = element as any
  const termElements = element.children as Element[]
  const [firstTermElement] = termElements
  const id = firstTermElement as any
  const insertNewOrigPlaceGndID = useInsertNewTEINodeForIndexNormData(
    data_indexName,
    editor,
    firstTermElement,
    ORIG_PLACE_DATA_TYPE,
    1
  )
  const repeatableOrigPlaceGndID = useGetRuleForTerm(
    'repeatable',
    data_indexName,
    ORIG_PLACE_DATA_TYPE
  )

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} className={'small-bottom-gab'}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.orig_place')}
          showDelete={false}
          helpText={t('editor.help_text.orig_place')}
        />
      </Grid>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid key={id} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement
            label={t('editor.free_text')}
            element={firstTermElement}
            paddingLeft={'24px'}
          />
        </Grid>

        {termElements
          .filter(TEIElement.isOrigPlaceNormElement)
          .map((element) => {
            const { id } = element
            return <OrigPlaceNormdatenVerknuepfung key={id} element={element} />
          })}
        {repeatableOrigPlaceGndID && (
          <Grid item xs={11}>
            <AddErfassungElementChildrenNodeButton
              insertNewErfassungElementChildrenNode={insertNewOrigPlaceGndID}
              buttonLabel={t('editor.linked_normdata')}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
})
