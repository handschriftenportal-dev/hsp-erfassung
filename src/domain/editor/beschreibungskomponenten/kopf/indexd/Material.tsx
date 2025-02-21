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

import { css } from '@emotion/react'
import { Grid } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Element } from 'slate'
import { useSlateStatic } from 'slate-react'

import { ErfassungsRules } from '../../../../../infrastructure/slate/ErfassungsRules'
import { isNodeInComponent } from '../../../../../infrastructure/slate/SlateBoundary'
import { selectBeschreibungsSubtype } from '../../../../erfassung/ErfassungsState'
import { TEI_ELEMENT_PART_BINDING } from '../../../../erfassung/TEIConstants'
import { EditableTextfieldTwoColumnElement } from '../../../EditableTextfieldTwoColumnElement'
import { TitleTwoColumnElement } from '../../../TitleTwoColumnElement'
import { AddErfassungElementChildrenNodeButton } from '../../AddErfassungElementChildrenNodeButton'
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'
import {
  useGetRuleForTerm,
  useInsertNewTEINodeForIndexNormData,
} from '../HeadCustomHooks'

interface Props {
  element: Element
}

export const Material: FC<Props> = ({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const termElements = element.children
  const [firstTerm] = termElements
  const { id } = firstTerm as any
  const { data_indexName } = element as any
  const insertNewMaterialTEINode = useInsertNewTEINodeForIndexNormData(
    data_indexName,
    editor,
    firstTerm,
    'material_type',
    1
  )
  const repeatableMaterialType = useGetRuleForTerm(
    'repeatable',
    data_indexName,
    'material_type'
  )
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} css={css({ marginBottom: '12px' })}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.material')}
          showDelete={false}
          helpText={t('editor.help_text.material')}
        />
      </Grid>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid key={id} className={'small-bottom-gab'} container>
          <EditableTextfieldTwoColumnElement
            label={t('editor.free_text')}
            element={firstTerm}
            deletable={false}
            error={false}
            paddingLeft={'24px'}
          />
        </Grid>
        {termElements.map((termElement: any) => {
          const optionsArray = isNodeInComponent(
            editor,
            termElement,
            TEI_ELEMENT_PART_BINDING
          )
            ? ErfassungsRules[beschreibungSubtype].erfassungsElemente
                .msPartbinding_termmaterial_type.values
            : ErfassungsRules[beschreibungSubtype].erfassungsElemente
                .termmaterial_type.values

          return (
            <FixedValueListAutocomplete
              paddingLeft={'24px'}
              useDeleteButton={true}
              leftSidelabel={t('editor.linked_normdata')}
              key={termElement.id}
              termElement={termElement}
              optionsArray={optionsArray}
            />
          )
        })}

        {repeatableMaterialType && (
          <Grid item xs={11}>
            <AddErfassungElementChildrenNodeButton
              insertNewErfassungElementChildrenNode={insertNewMaterialTEINode}
              buttonLabel={t('editor.linked_normdata')}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
