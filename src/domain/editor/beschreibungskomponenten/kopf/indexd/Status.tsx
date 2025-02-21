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

import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Element } from 'slate'

import { ErfassungsRules } from '../../../../../infrastructure/slate/ErfassungsRules'
import { selectBeschreibungsSubtype } from '../../../../erfassung/ErfassungsState'
import { FixedValueListAutocomplete } from '../FixedValueListAutocomplete'

interface Props {
  element: Element
}

export const Status: FC<Props> = memo(({ element }) => {
  const beschreibungSubtype = useSelector(selectBeschreibungsSubtype)
  const { t } = useTranslation()
  const [termElement] = element.children as Element[]
  const { id, data_type } = termElement as any

  return (
    <div id={id} key={id} className={'big-top-gab small-bottom-gab'}>
      <FixedValueListAutocomplete
        leftSidelabel={t('editor.status')}
        key={id}
        termElement={termElement}
        helpText={t('editor.help_text.status')}
        optionsArray={
          ErfassungsRules[beschreibungSubtype].erfassungsElemente[
            'term' + data_type
          ].values
        }
      />
    </div>
  )
})
