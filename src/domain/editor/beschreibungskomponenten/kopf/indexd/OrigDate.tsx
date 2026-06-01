import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { AddIndexElementButton } from 'src/domain/editor/beschreibungskomponenten/kopf/AddIndexElementButton'
import { useInsertNewTEINodeForIndex } from 'src/domain/editor/beschreibungskomponenten/kopf/HeadCustomHooks'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { createInsertTextChangeEventHandler } from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
}

export const OrigDate: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()
  const { data_indexName = '' } = element
  const [origDate, notBefore, notAfter, dateType] =
    element.children as Element[]
  const { id } = origDate
  const useInsertNewOrigDateElement = useInsertNewTEINodeForIndex(
    data_indexName,
    editor,
    origDate
  )
  const { repeatable } = ErfassungsRegeln.indexRegel(data_indexName)
  const notBeforeValue = HSPNode.extractFirstText(notBefore)
  const notAfterValue = HSPNode.extractFirstText(notAfter)
  const dateTypeValue = HSPNode.extractFirstText(dateType)

  const handleOrigDateTypeEvent = useCallback(
    createInsertTextChangeEventHandler(editor, dateType),
    [dateType, editor]
  )

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab'} container>
        <Grid item xs={12} className={'small-bottom-gab'}>
          <TitleTwoColumnElement
            element={element}
            title={t('editor.orig_date')}
            showDelete
            helpText={t('editor.help_text.orig_date')}
          />
        </Grid>

        <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
          <Grid style={{ display: 'flex' }} item xs={12}>
            <LabelledTextField
              marginBottom={'12px'}
              label={t('editor.free_text')}
              paddingLeft={'24px'}
              element={origDate}
            />
          </Grid>
          <Grid style={{ display: 'flex' }} item xs={12}>
            <Grid item xs={3} />
            <Grid style={{ paddingRight: '2%' }} item xs={2}>
              <TextField
                label={t('editor.not_before')}
                onChange={createInsertTextChangeEventHandler(editor, notBefore)}
                defaultValue={notBeforeValue}
                size="small"
                variant="filled"
                slotProps={{
                  input: { className: 'text-field-input-style' },
                }}
              />
            </Grid>
            <Grid style={{ paddingRight: '2%' }} item xs={2}>
              <TextField
                label={t('editor.not_after')}
                onChange={createInsertTextChangeEventHandler(editor, notAfter)}
                defaultValue={notAfterValue}
                size="small"
                variant="filled"
                slotProps={{
                  input: { className: 'text-field-input-style' },
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} />
            <Grid item xs={8}>
              <FormControl
                variant="standard"
                style={{ display: 'flex' }}
                component="fieldset"
              >
                <RadioGroup
                  value={dateTypeValue}
                  row
                  aria-label={t('editor.origTime')}
                  name="orig-time-row-radio-buttons-group"
                >
                  <FormControlLabel
                    style={{ marginRight: '100px' }}
                    value="datable"
                    control={<Radio onChange={handleOrigDateTypeEvent} />}
                    label={t('editor.datable')}
                  />
                  <FormControlLabel
                    value="dated"
                    control={<Radio onChange={handleOrigDateTypeEvent} />}
                    label={t('editor.dated')}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {repeatable && (
          <Grid item xs={11}>
            <AddIndexElementButton
              element={element}
              insertNewErfassungsElementNode={useInsertNewOrigDateElement}
              buttonLabel={t('editor.orig_date')}
            />
          </Grid>
        )}
      </Grid>
    </div>
  )
})
