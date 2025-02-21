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

import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { SBBNormdatenServiceAdapter } from '../../infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { useThemenbereich } from '../../infrastructure/normdaten/ThemenbereichService'
import { updateAlertMessage, updateTaggableNormdaten } from './ErfassungsState'
import { ThemenbereicheAPI, ThemenbereichNotationen } from './ThemenbereicheAPI'
import { VolltextSemantik } from './VolltextSemantik'

export const ThemenbereichInitializer: FC = memo(
  function ThemenbereichInitializer() {
    const api = useThemenbereich()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    useEffect(() => {
      ThemenbereicheAPI.loadAllThemenbereich(
        api,
        SBBNormdatenServiceAdapter
      ).then((state) => {
        dispatch(updateTaggableNormdaten(state))

        const notation = Object.entries(state).reduce((result, entry) => {
          const [semantik, didLoad] = entry
          const notation = ThemenbereichNotationen[semantik as VolltextSemantik]
          if (!didLoad && notation !== undefined) {
            result.push(notation)
          }
          return result
        }, [] as string[])
        if (notation.length > 0) {
          dispatch(
            updateAlertMessage({
              message: t('subject_area_dialog.subject_area_loading_error', {
                notation,
                count: notation.length,
              }),
              level: 'error',
            })
          )
        }
      })
    }, [api, dispatch, t])

    return null
  }
)
