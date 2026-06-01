import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import { BaseElement } from 'src/domain/editor/BaseElement'
import { AddErfassungElementChildrenNodeButton } from 'src/domain/editor/beschreibungskomponenten/AddErfassungElementChildrenNodeButton'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
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
} from 'src/domain/erfassung/TEIConstants'
import { childElementsWithDataOrigin } from 'src/infrastructure/slate/SlateBoundary'

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

  const { data_type = '' } = element
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

  const { data_type = '' } = element

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
    const { path = '', data_type = '' } = element
    const AltIdentifierComponent = selectAltIdentifier(path, data_type)

    return (
      <AltIdentifierComponent element={element} attributes={attributes}>
        {children}
      </AltIdentifierComponent>
    )
  }
)
