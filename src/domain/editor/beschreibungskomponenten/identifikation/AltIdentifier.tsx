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
import { RenderElementProps } from 'slate-react'

import { childElementsWithDataOrigin } from '../../../../infrastructure/slate/SlateBoundary'
import { selectReadOnly } from '../../../erfassung/ErfassungsState'
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_COLLECTION,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE,
} from '../../../erfassung/TEIConstants'
import { BaseElement } from '../../BaseElement'
import { TitleTwoColumnElement } from '../../TitleTwoColumnElement'
import { AddErfassungElementChildrenNodeButton } from '../AddErfassungElementChildrenNodeButton'
import { useInsertNewTEINodeForAltIdentifier } from './IdentificationCustomHooks'

interface Props extends RenderElementProps {}

const noop = (): void => undefined

const AltIdentifierFallback: FC<Props> = ({ children, attributes }: Props) => {
  return (
    <Grid item xs={12}>
      <span {...attributes}>{children}</span>
    </Grid>
  )
}

const AltIdentifierCorpus: FC<Props> = ({
  element,
  children,
  attributes,
}: Props) => {
  const { t } = useTranslation()
  const readOnly = useSelector(selectReadOnly)
  const insertTEINode = useInsertNewTEINodeForAltIdentifier()

  const { data_type } = element as any
  const collectionElements = childElementsWithDataOrigin(
    element,
    TEI_ELEMENT_COLLECTION
  )
  const [idnoElement] = childElementsWithDataOrigin(element, TEI_ELEMENT_IDNO)
  const showAddCorpusName = collectionElements.length === 0
  const insertNewCorpusName = idnoElement
    ? insertTEINode(data_type, idnoElement, 0, 0)
    : noop

  return (
    <Grid
      style={{ marginTop: '12px' }}
      className={'small-bottom-gab'}
      container
    >
      <TitleTwoColumnElement
        element={element}
        title={t('editor.corpus')}
        showDelete={!readOnly}
        helpText={readOnly ? undefined : t('editor.help_text.corpus')}
      />
      {!readOnly ? (
        <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
          <span {...attributes}>{children}</span>
          {showAddCorpusName && (
            <Grid item xs={11}>
              <AddErfassungElementChildrenNodeButton
                insertNewErfassungElementChildrenNode={insertNewCorpusName}
                buttonLabel={t('editor.corpus_name')}
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <AltIdentifierFallback element={element} attributes={attributes}>
          {children}
        </AltIdentifierFallback>
      )}
    </Grid>
  )
}

const AltIdentifierFormer: FC<Props> = ({
  element,
  children,
  attributes,
}: Props) => {
  const { t } = useTranslation()
  const readOnly = useSelector(selectReadOnly)
  const insertTEINode = useInsertNewTEINodeForAltIdentifier()

  const { data_type } = element as any

  const settlementElements = childElementsWithDataOrigin(
    element,
    TEI_ELEMENT_SETTLEMENT
  )
  const repositoryElements = childElementsWithDataOrigin(
    element,
    TEI_ELEMENT_REPOSITORY
  )
  const [idnoElement] = childElementsWithDataOrigin(element, TEI_ELEMENT_IDNO)

  const showAddPlace = settlementElements.length === 0
  const showAddInstitution = repositoryElements.length === 0
  const insertNewSettlement = idnoElement
    ? insertTEINode(data_type, idnoElement, 0, 0)
    : noop
  const insertNewRepository = idnoElement
    ? insertTEINode(data_type, idnoElement, showAddPlace ? 0 : 1, 1)
    : noop

  return (
    <Grid
      style={{ marginTop: '12px' }}
      className={'small-bottom-gab'}
      container
    >
      <TitleTwoColumnElement
        element={element}
        title={t('editor.former_signature')}
        showDelete={!readOnly}
        helpText={readOnly ? undefined : t('editor.help_text.former_signature')}
      />
      {!readOnly ? (
        <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
          <span {...attributes}>{children}</span>
          {showAddPlace && (
            <Grid className={'small-bottom-gab'} container>
              <Grid item xs={11}>
                <AddErfassungElementChildrenNodeButton
                  insertNewErfassungElementChildrenNode={insertNewSettlement}
                  buttonLabel={t('editor.place')}
                />
              </Grid>
            </Grid>
          )}
          {showAddInstitution && (
            <Grid className={'small-bottom-gab'} container>
              <Grid item xs={11}>
                <AddErfassungElementChildrenNodeButton
                  insertNewErfassungElementChildrenNode={insertNewRepository}
                  buttonLabel={t('editor.institution')}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <AltIdentifierFallback element={element} attributes={attributes}>
          {children}
        </AltIdentifierFallback>
      )}
    </Grid>
  )
}

const selectAltIdentifier = (path: string, data_type: string): FC<Props> => {
  if (
    !(
      path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) ||
      (path.includes(TEI_ELEMENT_MSPART) &&
        path.includes(TEI_ELEMENT_IDENTIFICATION))
    )
  ) {
    return BaseElement
  } else if (data_type === SAMMLUNG_DATA_TYPE) {
    return AltIdentifierCorpus
  } else if (data_type === VORBESITZER_DATA_TYPE) {
    return AltIdentifierFormer
  } else {
    return AltIdentifierFallback
  }
}

export const AltIdentifier: FC<Props> = memo(
  ({ element, children, attributes }: Props) => {
    const { path = '', data_type } = element as any
    const AltIdentifierComponent = selectAltIdentifier(path, data_type)

    return (
      <AltIdentifierComponent element={element} attributes={attributes}>
        {children}
      </AltIdentifierComponent>
    )
  }
)
