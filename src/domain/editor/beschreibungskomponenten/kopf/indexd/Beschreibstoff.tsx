import { css } from '@emotion/react'
import { Grid } from '@mui/material'
import type { FC } from 'react'
import { useState } from 'react'
import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { ThesaurusAuswahl } from 'src/domain/editor/normdaten/ThesaurusAuswahl'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { BESCHREIBSTOFF_NORMDATUM } from 'src/domain/erfassung/TEIConstants'
import { Notationen } from 'src/infrastructure/normdaten/Notationen'
import type { TermElement } from 'src/infrastructure/slate/HSPElement'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { replaceMatchingChildren } from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
}

export const Beschreibstoff: FC<Props> = ({ element }) => {
  const editor = useSlateStatic()
  const id = useId()
  const { t } = useTranslation()

  const { children } = element
  const [freitext, ...normdaten] = children as TermElement[]
  const [auswahl, setAuswahl] = useState(() =>
    normdaten.reduce<string[]>(
      (acc, termElement) =>
        termElement.data_key === undefined
          ? acc
          : [...acc, termElement.data_key],
      []
    )
  )

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} css={css({ marginBottom: '12px' })}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.material')}
          helpText={t('editor.help_text.material')}
        />
      </Grid>
      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid key={id} className={'small-bottom-gab'} container>
          <LabelledTextField
            label={t('editor.free_text')}
            element={freitext}
            paddingLeft={'24px'}
          />
        </Grid>
        <Grid container>
          <Grid
            item
            xs={3}
            style={{
              display: 'table',
              paddingLeft: '24px',
            }}
          >
            <span className={'align-display-table-cell-vertical-align'}>
              <label id={id}>{t('editor.linked_normdata')}</label>:
            </span>
          </Grid>
          <Grid item xs={8}>
            <ThesaurusAuswahl
              multiple
              aria-labelledby={id}
              thesaurus={Notationen.thesaurus.beschreibstoff}
              auswahl={auswahl}
              onChange={(begriffe) => {
                const newTerm = HSPElement.termElement(BESCHREIBSTOFF_NORMDATUM)
                setAuswahl(begriffe.map((begriff) => begriff.identifier.id))
                const termElements =
                  begriffe.length === 0
                    ? newTerm.createEmpty()
                    : begriffe.map((begriff) => newTerm.fromBegriff(begriff))
                replaceMatchingChildren(
                  editor,
                  element,
                  HSPNode.isBeschreibstoffTermElement,
                  termElements
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
