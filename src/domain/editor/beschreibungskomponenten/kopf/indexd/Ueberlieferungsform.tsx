import { Grid } from '@mui/material'
import type { FC } from 'react'
import { useId } from 'react'
import { useState } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Element as ScrollAnchor } from 'react-scroll'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import {
  HilfeButton,
  HilfeText,
} from 'src/domain/editor/beschreibungskomponenten/hilfetexte'
import { ThesaurusAuswahl } from 'src/domain/editor/normdaten/ThesaurusAuswahl'
import {
  TEI_ELEMENT_PART_ACCMAT,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_FRAGMENT,
} from 'src/domain/erfassung/TEIConstants'
import { Notationen } from 'src/infrastructure/normdaten/Notationen'
import { useThemenbereich } from 'src/infrastructure/normdaten/ThemenbereichService'
import type { TermElement } from 'src/infrastructure/slate/HSPElement'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import {
  isNodeInComponent,
  replaceMatchingChildren,
} from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
}

const msPartTypeList = [
  TEI_ELEMENT_PART_FRAGMENT,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_ACCMAT,
]

export const Ueberlieferungsform: FC<Props> = memo(({ element }) => {
  const { t } = useTranslation()
  const { id = '' } = element
  const labelId = useId()
  const terms = element.children as TermElement[]
  const api = useThemenbereich()
  const editor = useSlateStatic()
  const disabled = msPartTypeList.some((msPartType) =>
    isNodeInComponent(editor, element, msPartType)
  )
  const helpText = disabled ? undefined : t('editor.help_text.form_type')

  const [showHelpText, setShowHelpText] = useState(false)
  const error =
    element.error ?? terms.find((term) => term.error !== undefined)?.error

  return (
    <div id={id} key={id}>
      <Grid className={'big-top-gab small-bottom-gab'} container>
        <Grid container className={'small-bottom-gab'}>
          <Grid
            item
            xs={3}
            style={{
              display: 'table',
              paddingLeft: 0,
            }}
          >
            <span
              className={
                !showHelpText
                  ? 'align-display-table-cell-vertical-align'
                  : undefined
              }
              style={{
                color: !error ? 'inherit' : '#aa2e25',
              }}
            >
              <ScrollAnchor name={id}>
                <label id={labelId}>{t('editor.form')}</label>:
                {helpText && (
                  <HilfeButton
                    onClick={() => setShowHelpText(!showHelpText)}
                    activated={showHelpText}
                  />
                )}
                {terms.map(({ id = '' }, i) => (
                  <ScrollAnchor key={id + i} name={id} />
                ))}
              </ScrollAnchor>
            </span>
          </Grid>
          <Grid item xs={8}>
            {showHelpText && <HilfeText helpText={helpText} />}
            <ThesaurusAuswahl
              disabled={disabled}
              aria-labelledby={labelId}
              thesaurus={Notationen.thesaurus.ueberlieferungsform}
              auswahl={terms.map((term) => term.data_key ?? '')}
              onChange={(begriff) => {
                replaceMatchingChildren(
                  editor,
                  element,
                  (_) => true,
                  HSPElement.formElementFactory(begriff, api)
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
})
