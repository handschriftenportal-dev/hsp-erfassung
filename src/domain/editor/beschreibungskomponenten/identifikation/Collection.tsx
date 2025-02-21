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
import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { ErfassungsRules } from '../../../../infrastructure/slate/ErfassungsRules'
import { extractFirstText } from '../../../../infrastructure/slate/SlateBoundary'
import { CollectionElement } from '../../../../infrastructure/slate/TEI'
import {
  selectBeschreibungsSubtype,
  selectReadOnly,
  updateSaveAllowed,
} from '../../../erfassung/ErfassungsState'
import { TEI_ELEMENT_MSDESC_IDENTIFICATION } from '../../../erfassung/TEIConstants'
import { BaseElement } from '../../BaseElement'
import { EditableTextfieldTwoColumnElement } from '../../EditableTextfieldTwoColumnElement'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'

interface Props extends RenderElementProps {
  element: CollectionElement
}
type CollectionType =
  | 'invalidCollection'
  | 'validCollection'
  | 'unknownCollection'

const ValidCollection: FC<Props> = ({ element }) => {
  const readOnly = useSelector(selectReadOnly)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const { region, data_origin, path } = element

  const originRule =
    ErfassungsRules[beschreibungSubtype].erfassungsElemente[region][data_origin]
  const emptyCorpusName = originRule.empty
  const requiredCorpusName = originRule.required
  const text = extractFirstText(element)
  const error = text === ''

  useEffect(() => {
    if (error) {
      const stringPath: string = path
      const stringToCut = '#document-TEI-text-body-'
      dispatch(
        updateSaveAllowed({
          allowed: false,
          errorMessage: t('editor.invalid_fields', {
            path: stringPath.slice(stringToCut.length),
          }),
        })
      )
    } else {
      dispatch(
        updateSaveAllowed({
          allowed: true,
          errorMessage: '',
        })
      )
    }
  }, [error])

  return !readOnly ? (
    <Grid className={'small-bottom-gab'} container>
      <EditableTextfieldTwoColumnElement
        helpertext={t('editor.corpus_name_not_empty')}
        error={error && !emptyCorpusName}
        label={t('editor.corpus_name')}
        element={element}
        marginTop={''}
        deletable={!requiredCorpusName}
        paddingLeft={'24px'}
      />
    </Grid>
  ) : (
    <Grid container>
      <NoneEditableTwoColumnElementJSX label={t('editor.corpus_name')}>
        {text}
      </NoneEditableTwoColumnElementJSX>
    </Grid>
  )
}

function collectionType({ path, region }: CollectionElement): CollectionType {
  if (path && !path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION)) {
    return 'invalidCollection'
  } else if (region === 'altIdentifiercorpus') {
    return 'validCollection'
  } else {
    return 'unknownCollection'
  }
}

export const Collection: FC<Props> = memo((props) => {
  switch (collectionType(props.element)) {
    case 'invalidCollection':
      return <BaseElement {...props} />
    case 'validCollection':
      return <ValidCollection {...props} />
    default:
      return null
  }
})
