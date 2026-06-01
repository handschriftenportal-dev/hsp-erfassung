import { css } from '@emotion/react'
import { FormControl, Grid, MenuItem, Select } from '@mui/material'
import type { FC } from 'react'
import { useId } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { AddIndexElementButton } from 'src/domain/editor/beschreibungskomponenten/kopf/AddIndexElementButton'
import { useInsertNewTEINodeForIndex } from 'src/domain/editor/beschreibungskomponenten/kopf/HeadCustomHooks'
import { BeschreibungsTextField } from 'src/domain/editor/BeschreibungsTextField'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import {
  findPath,
  insertSlateText,
} from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
}

const labelStyle = css({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '24px',
})

export const Dimensions: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const { data_indexName = '' } = element
  const labelType = useId()
  const termElements = element.children
  const [
    termDimensions,
    termHeight,
    termWidth,
    termDepth,
    termInformationType,
  ] = termElements as Element[]
  const { repeatable } = ErfassungsRegeln.indexRegel(data_indexName)

  const useAddNewDimensionIndexElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    termDimensions
  )

  const selectValue = termInformationType
    ? HSPNode.extractFirstText(termInformationType)
    : ''

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} className="small-bottom-gab">
        <TitleTwoColumnElement
          element={element}
          title={t('editor.dimensions')}
          showDelete
          helpText={t('editor.help_text.dimension')}
        />
      </Grid>
      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid
          style={{ display: 'flex' }}
          className={'small-bottom-gab'}
          item
          xs={12}
        >
          <Grid css={labelStyle} item xs={3}>
            {t('editor.dimensions_label')}:
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <BeschreibungsTextField
                  element={termDimensions}
                  label={t('editor.free_text')}
                />
              </Grid>
              <Grid item xs={2}>
                <BeschreibungsTextField
                  element={termHeight}
                  label={t('editor.height')}
                />
              </Grid>
              <Grid item xs={2}>
                <BeschreibungsTextField
                  element={termWidth}
                  label={t('editor.width')}
                />
              </Grid>
              <Grid item xs={2}>
                <BeschreibungsTextField
                  element={termDepth}
                  label={t('editor.depth')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={'small-bottom-gab'}>
          <Grid
            item
            xs={3}
            style={{
              display: 'table',
              paddingLeft: '24px',
            }}
          >
            <label id={labelType}>{t('editor.format_type')}</label>:
          </Grid>
          <Grid item xs={8}>
            <FormControl
              variant="filled"
              style={{ display: 'flex' }}
              component="fieldset"
              aria-labelledby={labelType}
            >
              <Select
                value={selectValue}
                onChange={(event) => {
                  event.preventDefault()
                  const at = findPath(editor, termInformationType)
                  const target = event.target
                  if (at) {
                    insertSlateText(editor, target.value, at)
                  }
                }}
                size="small"
              >
                <MenuItem value="">
                  <em>{t('editor.type_of_information.none')}</em>
                </MenuItem>
                <MenuItem value="deduced">
                  {t('editor.type_of_information.deduced')}
                </MenuItem>
                <MenuItem value="factual">
                  {t('editor.type_of_information.factual')}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {repeatable && (
        <Grid item xs={11}>
          <AddIndexElementButton
            element={element}
            insertNewErfassungsElementNode={useAddNewDimensionIndexElement}
            buttonLabel={t('editor.dimensions')}
          />
        </Grid>
      )}
    </Grid>
  )
})
