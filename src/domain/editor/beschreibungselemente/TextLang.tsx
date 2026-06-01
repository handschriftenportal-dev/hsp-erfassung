import { Paper } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
import { splitIntoWords } from 'src/infrastructure/helper'
import {
  APICall,
  useAPICallTranslation,
} from 'src/infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { theme } from 'src/theme'

interface Props extends RenderElementProps {}

export const TextLang: FC<Props> = memo(({ attributes, element, children }) => {
  const { data_mainLang = '', data_otherLangs = '' } = element
  const [mainLang, setMainLang] = useState(data_mainLang)
  const [otherLangs, setOtherLangs] = useState(splitIntoWords(data_otherLangs))

  const readOnly = useSelector(selectReadOnly)
  const { t } = useTranslation()
  const apiTranslation = useAPICallTranslation()

  useEffect(() => {
    let cancel = false
    function protectDispatch<T>(dispatch: Dispatch<T>): Dispatch<T> {
      return function protectedDispatch(value: T): void {
        if (!cancel) {
          dispatch(value)
        }
      }
    }

    function fetch(isoCode: string): Promise<string> {
      return SBBNormdatenServiceAdapter.fetchLanguageById(isoCode).then(
        (response) =>
          APICall.isSuccess(response)
            ? `${response.value.preferredName} (${response.value.gndIdentifier})`
            : `${isoCode} (${apiTranslation(response)})`
      )
    }

    if (data_mainLang) {
      fetch(data_mainLang).then(protectDispatch(setMainLang))
    }
    if (data_otherLangs) {
      Promise.all(splitIntoWords(data_otherLangs).map(fetch)).then(
        protectDispatch(setOtherLangs)
      )
    }

    return () => {
      cancel = true
    }
  }, [apiTranslation, data_mainLang, data_otherLangs])

  return (
    <Paper
      variant="outlined"
      sx={{ padding: theme.spacing(2) }}
      {...attributes}
    >
      <TitleTwoColumnElement
        element={element}
        title={t('editor.text_lang_element')}
        showDelete={!readOnly}
        helpText={undefined}
      />
      <table className={'horizontal-data-table'}>
        <tbody>
          <tr>
            <th>{t('editor.free_text')}</th>
            <td>{children}</td>
          </tr>
          <tr>
            <th>{t('editor.main_language')}</th>
            <td>{mainLang}</td>
          </tr>
          {otherLangs.length > 0 && (
            <tr>
              <th>{t('editor.other_language')}</th>
              <td>
                <ul>
                  {otherLangs.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Paper>
  )
})
