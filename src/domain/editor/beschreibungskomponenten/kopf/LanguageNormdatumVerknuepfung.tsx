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
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSlateStatic } from 'slate-react'

import { extractFirstText } from '../../../../infrastructure/slate/SlateBoundary'
import { LanguageTermElement } from '../../../../infrastructure/slate/TEI'
import { GNDEntityFact } from '../../../erfassung/GNDEntityFact'
import { DeleteSlateNodeButton } from '../../DeleteSlateNodeButton'
import { NormdatenAutocomplete } from '../../normdaten/NormdatenAutocomplete'
import { useNormdatenFindById } from '../../normdaten/useNormdaten'

interface Props {
  element: LanguageTermElement
}

export const LanguageNormdatumVerknuepfung: FC<Props> = ({ element }) => {
  const editor = useSlateStatic()
  const [languages, setLanguages] = useState<GNDEntityFact[]>([])
  const { t } = useTranslation()
  const textContent = extractFirstText(element)

  const [autoCompleteGndEntity, setAutoCompleteGndEntity] =
    useState<GNDEntityFact>(() =>
      GNDEntityFact.new({ gndIdentifier: textContent, typeName: 'Language' })
    )
  useNormdatenFindById(textContent, setAutoCompleteGndEntity)

  return (
    <Grid className={'small-bottom-gab'} container>
      <Grid item xs={3} style={{ display: 'table', paddingLeft: '24px' }}>
        <span className={'align-display-table-cell-vertical-align'}>
          {t('editor.linked_normdata')}:{' '}
        </span>
      </Grid>
      <Grid item xs={8}>
        <NormdatenAutocomplete
          gndOptions={languages}
          gndOptionsSetter={setLanguages}
          origin="language"
          termElement={element}
          editor={editor}
          autoCompleteGndEntity={autoCompleteGndEntity}
          setAutoCompleteGndEntity={setAutoCompleteGndEntity}
        />
      </Grid>
      <Grid item xs={1}>
        <DeleteSlateNodeButton element={element} />
      </Grid>
    </Grid>
  )
}
