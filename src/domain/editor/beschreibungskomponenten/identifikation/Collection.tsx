import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import { BaseElement } from 'src/domain/editor/BaseElement'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { NoneEditableTwoColumnElementJSX } from 'src/domain/editor/NoneEditableTwoColumnElementJSX'
import {
  selectReadOnly,
  updateSaveAllowed,
} from 'src/domain/erfassung/ErfassungsState'
import { TEI_ELEMENT_MSDESC_IDENTIFICATION } from 'src/domain/erfassung/TEIConstants'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import type { CollectionElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

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
  const { region, data_origin, path } = element

  const { empty: emptyCorpusName, required: requiredCorpusName } =
    ErfassungsRegeln.regionElementRegel(region, data_origin)
  const text = HSPNode.extractFirstText(element)
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
      <LabelledTextField
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
