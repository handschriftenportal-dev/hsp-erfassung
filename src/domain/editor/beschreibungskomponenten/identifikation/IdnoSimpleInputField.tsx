import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { NoneEditableTwoColumnElementJSX } from 'src/domain/editor/NoneEditableTwoColumnElementJSX'
import {
  selectReadOnly,
  updateSaveAllowed,
} from 'src/domain/erfassung/ErfassungsState'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

interface Props {
  props: RenderElementProps
  title: string
  required: boolean
  helpertext?: string
  empty?: boolean
}

export const IdnoSimpleInputField: FC<Props> = memo(
  ({ props, title, required, helpertext, empty }) => {
    const { t } = useTranslation()
    const readOnly = useSelector(selectReadOnly)
    const dispatch = useDispatch()
    const textContent = HSPNode.extractFirstText(props.element)
    const error = textContent === '' && !empty

    useEffect(() => {
      if (error) {
        const stringPath = props.element.path ?? ''
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
        dispatch(updateSaveAllowed({ allowed: true, errorMessage: '' }))
      }
    }, [error])

    return !readOnly ? (
      <Grid className={'small-bottom-gab'} container>
        <LabelledTextField
          helpertext={helpertext}
          error={error}
          label={title}
          element={props.element}
          marginTop={''}
          deletable={!required}
          paddingLeft={'24px'}
        />
      </Grid>
    ) : (
      <Grid container>
        <NoneEditableTwoColumnElementJSX label={title}>
          {textContent}
        </NoneEditableTwoColumnElementJSX>
      </Grid>
    )
  }
)
