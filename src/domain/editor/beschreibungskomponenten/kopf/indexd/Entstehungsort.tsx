import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { NormdatenMehrfachAuswahl } from 'src/domain/editor/normdaten/NormdatenMehrfachAuswahl'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { selectEntstehungsorte } from 'src/domain/erfassung/ErfassungsState'
import { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { ENTSTEHUNGSORT_NORMDATUM } from 'src/domain/erfassung/TEIConstants'
import type { TermElement } from 'src/infrastructure/slate/HSPElement'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { replaceMatchingChildren } from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
}

export const Entstehungsort: FC<Props> = memo(function Entstehungsort({
  element,
}) {
  const editor = useSlateStatic()
  const id = useId()
  const { t } = useTranslation()

  const { children } = element
  const [freitext, ...normdaten] = children as TermElement[]
  const [auswahl, setAuswahl] = useState<GNDEntityFact[]>(() =>
    normdaten.reduce<GNDEntityFact[]>((result, termElement) => {
      const normdatum = GNDEntityFact.fromTermElement(termElement)
      return normdatum.id === '' ? result : [...result, normdatum]
    }, [])
  )

  const entstehungsorte = useSelector(selectEntstehungsorte)

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} className={'small-bottom-gab'}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.orig_place')}
          helpText={t('editor.help_text.orig_place')}
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
            <NormdatenMehrfachAuswahl
              auswahl={auswahl}
              normdaten={entstehungsorte}
              onChange={(auswahl) => {
                const newTerm = HSPElement.termElement(ENTSTEHUNGSORT_NORMDATUM)
                setAuswahl(auswahl)
                const termElements =
                  auswahl.length === 0
                    ? newTerm.createEmpty()
                    : auswahl.map(newTerm.fromGNDEntityFact)
                replaceMatchingChildren(
                  editor,
                  element,
                  HSPNode.isEntstehungsortTermElement,
                  termElements
                )
              }}
              aria-labelledby={id}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})
