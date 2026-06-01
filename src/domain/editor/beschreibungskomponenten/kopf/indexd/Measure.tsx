import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'

interface Props {
  element: Element
}

export const Measure: FC<Props> = memo(({ element }) => {
  const { t } = useTranslation()
  const [freeText, sheetCount] = element.children as Element[]

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} className={'small-bottom-gab'}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.measure')}
          helpText={t('editor.help_text.measure')}
        />
      </Grid>
      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid className={'small-bottom-gab'} container>
          <LabelledTextField
            label={t('editor.free_text')}
            element={freeText}
            deletable={false}
            error={false}
            paddingLeft={'24px'}
          />
        </Grid>
        <Grid className={'small-bottom-gab'} container>
          <LabelledTextField
            label={t('editor.sheet_count')}
            element={sheetCount}
            deletable={false}
            error={false}
            paddingLeft={'24px'}
          />
        </Grid>
      </Grid>
    </Grid>
  )
})
