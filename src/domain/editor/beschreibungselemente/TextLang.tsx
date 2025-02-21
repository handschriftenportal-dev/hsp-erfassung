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

import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { FC, memo, MouseEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Node } from 'slate'
import { ReactEditor, RenderElementProps, useSlateStatic } from 'slate-react'

import { splitIntoWords } from '../../../infrastructure/helper'
import {
  APICall,
  useAPICallTranslation,
} from '../../../infrastructure/normdaten/APICall'
import { SBBNormdatenServiceAdapter } from '../../../infrastructure/normdaten/SBBNormdatenServiceAdapter'
import {
  findPath,
  updateNodes,
} from '../../../infrastructure/slate/SlateBoundary'
import {
  selectReadOnly,
  updateAlertMessage,
} from '../../erfassung/ErfassungsState'
import { GNDEntityFact } from '../../erfassung/GNDEntityFact'
import { EditableTextfieldTwoColumnElement } from '../EditableTextfieldTwoColumnElement'
import { NoneEditableTwoColumnElement } from '../NoneEditableTwoColumnElement'
import { TitleTwoColumnElement } from '../TitleTwoColumnElement'
import { TextLanguageAutocomplete } from './TextLanguageAutocomplete'

interface Props extends RenderElementProps {}

const iso6391 = 'ISO_639-1'

export const TextLang: FC<Props> = memo(({ element, children }) => {
  const { data_mainLang, data_otherLangs } = element as any
  const [mainLang, setMainLang] = useState(() =>
    GNDEntityFact.new({ typeName: 'Language' })
  )
  const [otherLangs, setOtherLangs] = useState<GNDEntityFact[]>([])
  const [allLanguageGNDEntities, setAllLanguageGNDEntities] = useState<
    GNDEntityFact[]
  >([])
  const readOnly = useSelector(selectReadOnly)
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const apiTranslation = useAPICallTranslation()
  const dispatch = useDispatch()

  const findLanguage = useCallback(
    (isoCode: string, successCallback: (gndEntity: GNDEntityFact) => void) => {
      SBBNormdatenServiceAdapter.fetchLanguageById(isoCode).then((response) => {
        if (APICall.isSuccess(response)) {
          successCallback(response.value)
        } else {
          dispatch(
            updateAlertMessage({
              message: apiTranslation(response),
              level: 'error',
            })
          )
        }
      })
    },
    [apiTranslation, dispatch]
  )

  useEffect(() => {
    let cancel = false

    if (data_mainLang) {
      findLanguage(data_mainLang, (gndEntity) => {
        if (cancel) return
        if (gndEntity) {
          setMainLang(gndEntity)
        }
      })
    }
    if (data_otherLangs) {
      splitIntoWords(data_otherLangs).forEach((code: string) => {
        findLanguage(code, (gndEntity) => {
          if (cancel) return
          if (gndEntity) {
            setOtherLangs((prevState) => {
              return prevState.concat(gndEntity)
            })
          }
        })
      })
    }
    return () => {
      cancel = true
    }
  }, [data_mainLang, data_otherLangs])

  const updateMainLanguage = useCallback(
    (_event: any, gndEntity: GNDEntityFact) => {
      const at = findPath(editor, element)
      if (
        gndEntity &&
        gndEntity.preferredName &&
        gndEntity.identifier &&
        gndEntity.identifier.find(
          (identifier) => identifier.type === iso6391
        ) &&
        at
      ) {
        setMainLang(gndEntity)
        updateNodes(
          editor,
          {
            data_mainLang: gndEntity?.identifier?.find(
              (identifier) => identifier.type === iso6391
            )?.text,
          } as Partial<Node>,
          at
        )
      }
    },
    []
  )

  const updateOtherLanguage = useCallback(
    (_event: any, gndEntity: GNDEntityFact, _reason: any, details: any) => {
      const at = findPath(editor, element)
      if (
        gndEntity &&
        gndEntity.preferredName &&
        gndEntity.identifier &&
        gndEntity.identifier.find(
          (identifier) => identifier.type === iso6391
        ) &&
        at
      ) {
        setOtherLangs((prevState) => {
          const newState = prevState.map((entity, index) => {
            if (index === details) {
              return gndEntity
            } else {
              return entity
            }
          })
          const newLangCodes = newState.flatMap((entity: GNDEntityFact) => {
            return entity.identifier
              ?.filter((identifier) => identifier.type === iso6391)
              .map((identifier) => identifier.text)
          })
          updateNodes(
            editor,
            { data_otherLangs: newLangCodes.join(' ') } as Partial<Node>,
            at
          )
          return newState
        })
      }
    },
    []
  )

  const deleteOtherLang = useCallback((event: any, position: number) => {
    event.preventDefault()
    setOtherLangs((prevState) => {
      console.log('Delete Language ' + position)
      const newState = prevState.filter((_, index) => index !== position)
      const newLangCodes = newState.flatMap((entity: GNDEntityFact) => {
        return entity.identifier
          ?.filter((identifier) => identifier.type === iso6391)
          .map((identifier) => identifier.text)
      })
      updateNodes(
        editor,
        {
          data_otherLangs:
            newLangCodes.length > 0 ? newLangCodes.join(' ') : '',
        } as Partial<Node>,
        ReactEditor.findPath(editor as ReactEditor, element)
      )
      return newState
    })
  }, [])

  const addOtherLang = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOtherLangs((prevState) =>
      prevState.concat({
        preferredName: '',
        gndIdentifier: '',
        variantName: [],
        identifier: [],
        typeName: 'Language',
        id: '',
      })
    )
  }, [])

  const loadingAllLanguages = useCallback(() => {
    SBBNormdatenServiceAdapter.findGNDEntity('sprache').then((response) => {
      if (APICall.isSuccess(response)) {
        setAllLanguageGNDEntities(response.value)
      }
    })
  }, [])

  return readOnly ? (
    <NoneEditableTwoColumnElement
      label={t('editor.text_lang_element')}
      children={children}
    />
  ) : (
    <>
      <TitleTwoColumnElement
        element={element}
        title={t('editor.text_lang_element')}
        showDelete={true}
        helpText={t('editor.help_text.text_language')}
      />
      <Grid
        className={'group-beschreibungs-element-with-line'}
        style={{ marginBottom: '32px' }}
        container
      >
        <Grid item xs={12}>
          <Grid className={'small-bottom-gab'} container>
            <EditableTextfieldTwoColumnElement
              label={t('editor.free_text')}
              element={element}
              paddingLeft={'24px'}
              deletable={false}
            />
          </Grid>
        </Grid>
        <Grid container>
          <TextLanguageAutocomplete
            title={t('editor.main_language') + ':'}
            options={allLanguageGNDEntities}
            value={mainLang}
            onOpen={loadingAllLanguages}
            onChange={updateMainLanguage}
          />
        </Grid>
        {otherLangs.map((otherLanguage: GNDEntityFact, index: number) => {
          return (
            <TextLanguageAutocomplete
              key={index}
              title={t('editor.other_language') + ':'}
              options={allLanguageGNDEntities}
              value={otherLanguage}
              onOpen={loadingAllLanguages}
              onChange={updateOtherLanguage}
              position={index}
              deleteCallback={deleteOtherLang}
            />
          )
        })}
        <Grid item xs={11}>
          <Grid className={'small-bottom-gab'} style={{ float: 'right' }}>
            <Button
              startIcon={<Add />}
              className={'grey-add-button-style'}
              onClick={addOtherLang}
              variant="text"
            >
              {t('editor.other_language')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
})
