import { FormControl, Grid, MenuItem, Select } from '@mui/material'
import type { FC } from 'react'
import { useId } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Element as ScrollAnchor } from 'react-scroll'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { AddIndexElementButton } from 'src/domain/editor/beschreibungskomponenten/kopf/AddIndexElementButton'
import { useInsertNewTEINodeForIndex } from 'src/domain/editor/beschreibungskomponenten/kopf/HeadCustomHooks'
import { ThesaurusAuswahl } from 'src/domain/editor/normdaten/ThesaurusAuswahl'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { Notationen } from 'src/infrastructure/normdaten/Notationen'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import {
  findPath,
  insertSlateText,
  replaceMatchingChildren,
} from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
}

export const Format: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const { children, data_indexName = '', id } = element
  const termElements = children as Element[]
  const [format, formatType] = termElements
  const { error, id: formatId = '' } = format
  const labelFormat = useId()
  const labelType = useId()
  const useInsertNewFormatElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    format
  )

  const selectValue = formatType ? HSPNode.extractFirstText(formatType) : ''

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab'} container>
        <Grid item xs={12} className={'small-bottom-gab'}>
          <TitleTwoColumnElement
            showDelete
            element={element}
            title={t('editor.format')}
            helpText={t('editor.help_text.format')}
          />
        </Grid>
        <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
          <Grid style={{ display: 'flex' }} item xs={12}>
            <Grid container className={'small-bottom-gab'}>
              <Grid
                item
                xs={3}
                style={{
                  display: 'table',
                  paddingLeft: '24px',
                }}
              >
                <span
                  className={'align-display-table-cell-vertical-align'}
                  style={{
                    color: !error ? 'inherit' : '#aa2e25',
                  }}
                >
                  <ScrollAnchor name={formatId}>
                    <label id={labelFormat}>
                      {t('editor.format_normdatum')}
                    </label>
                    :
                  </ScrollAnchor>
                </span>
              </Grid>
              <Grid item xs={8}>
                <ThesaurusAuswahl
                  thesaurus={Notationen.thesaurus.format}
                  auswahl={format.data_key}
                  aria-labelledby={labelFormat}
                  onChange={(begriff) =>
                    replaceMatchingChildren(
                      editor,
                      element,
                      (_) => true,
                      HSPElement.formatElementFactory(begriff, selectValue)
                    )
                  }
                />
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
              <span className={'align-display-table-cell-vertical-align'}>
                <label id={labelType}>{t('editor.format_type')}</label>:
              </span>
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
                    const at = findPath(editor, formatType)
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
                  <MenuItem value="computed">
                    {t('editor.type_of_information.computed')}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <AddIndexElementButton
            element={element}
            insertNewErfassungsElementNode={useInsertNewFormatElement}
            buttonLabel={t('editor.format')}
          />
        </Grid>
      </Grid>
    </div>
  )
})
