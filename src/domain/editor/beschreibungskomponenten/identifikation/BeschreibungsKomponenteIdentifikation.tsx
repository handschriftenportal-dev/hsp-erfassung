import type { FC, JSX } from 'react'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RenderElementProps } from 'slate-react'
import {
  BESCHREIBUNGS_KOMPONENTEN_LEVEL,
  INDENTATION,
} from 'src/domain/editor/beschreibungskomponenten/ComponentSection'
import { AddElementButtonForIdentification } from 'src/domain/editor/beschreibungskomponenten/identifikation/AddElementButtonForIdentification'
import { HeadLine } from 'src/domain/editor/HeadLine'
import {
  HorizontalRule,
  HorizontalRuleLight,
} from 'src/domain/editor/HorizontalRule'
import { SimpleAccordion } from 'src/domain/editor/SimpleAccordion'
import { selectReadOnly } from 'src/domain/erfassung/ErfassungsState'
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE,
} from 'src/domain/erfassung/TEIConstants'

interface Props extends RenderElementProps {}

type GroupReactElementsResult = {
  andere: JSX.Element[]
  corpus: JSX.Element[]
  vorbesitzer: JSX.Element[]

  ort: JSX.Element[]
  koerperschaft: JSX.Element[]
}

function groupReactElements(children: JSX.Element[]): GroupReactElementsResult {
  return children.reduce<GroupReactElementsResult>(
    (result, child) => {
      const { data_origin, data_type } =
        child?.props?.children?.props?.element ?? {}

      switch (data_origin) {
        case TEI_ELEMENT_SETTLEMENT:
          result.ort.push(child)
          break
        case TEI_ELEMENT_REPOSITORY:
          result.koerperschaft.push(child)
          break
      }

      switch (data_type) {
        case VORBESITZER_DATA_TYPE:
          result.vorbesitzer.push(child)
          break
        case SAMMLUNG_DATA_TYPE:
          result.corpus.push(child)
          break
        default:
          result.andere.push(child)
      }

      return result
    },
    {
      vorbesitzer: [],
      corpus: [],
      andere: [],
      ort: [],
      koerperschaft: [],
    }
  )
}

const TEMPORARILY_HIDE_CORPUS_AND_ALT_SIGNATURE_ADDING: boolean = true

export const BeschreibungsKomponenteIdentifikation: FC<Props> = memo(
  ({ element, children, attributes }) => {
    const readOnly = useSelector(selectReadOnly)
    const { t } = useTranslation()
    const { path = '', level = BESCHREIBUNGS_KOMPONENTEN_LEVEL, id } = element

    const headline = (
      <HeadLine
        label={t('sidebar.identification')}
        labelSize="h3"
        helpText={t('editor.help_text.identifikation')}
      />
    )

    const reactElementGroups = groupReactElements(children)

    const content = (
      <div style={{ display: 'block' }}>
        <div className={'small-bottom-gab'}>{reactElementGroups.andere}</div>
        {reactElementGroups.ort.length === 0 && (
          <AddElementButtonForIdentification
            type={'ort'}
            msIdentifierChildren={element.children}
            path={path}
          >
            {t('editor.settlement')}
          </AddElementButtonForIdentification>
        )}
        {reactElementGroups.koerperschaft.length === 0 && (
          <AddElementButtonForIdentification
            type={'koerperschaft'}
            msIdentifierChildren={element.children}
            path={path}
          >
            {t('editor.repository')}
          </AddElementButtonForIdentification>
        )}
        {path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) && (
          <>
            <span>{reactElementGroups.corpus}</span>
            {!TEMPORARILY_HIDE_CORPUS_AND_ALT_SIGNATURE_ADDING && (
              <AddElementButtonForIdentification
                type={'sammlung'}
                msIdentifierChildren={element.children}
                path={path}
                gab={'mid'}
              >
                {t('editor.corpus')}
              </AddElementButtonForIdentification>
            )}
          </>
        )}
        <span>{reactElementGroups.corpus}</span>
        {!TEMPORARILY_HIDE_CORPUS_AND_ALT_SIGNATURE_ADDING &&
          (path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) ||
            reactElementGroups.vorbesitzer.length === 0) && (
            <AddElementButtonForIdentification
              msIdentifierChildren={element.children}
              type={'vorbesitzer'}
              path={path}
              gab={'mid'}
            >
              {t('editor.former_signature')}
            </AddElementButtonForIdentification>
          )}
      </div>
    )

    const relativeLevel = level - BESCHREIBUNGS_KOMPONENTEN_LEVEL
    const marginLeft = relativeLevel > 0 ? INDENTATION : 0
    const margin = {
      marginLeft: `${marginLeft}px`,
    }
    const style = {
      marginLeft: `${-INDENTATION * (relativeLevel - 1)}px`,
    }

    return (
      <section id={id}>
        {level === BESCHREIBUNGS_KOMPONENTEN_LEVEL ? (
          <HorizontalRule />
        ) : (
          <HorizontalRuleLight style={style} />
        )}
        <div style={margin}>
          {!readOnly ? (
            <SimpleAccordion
              attributes={attributes}
              element={element}
              detailsContent={content}
              level={relativeLevel}
            >
              {headline}
            </SimpleAccordion>
          ) : (
            <>
              <span>{headline}</span>
              <span>{reactElementGroups.andere}</span>
              <span>{reactElementGroups.corpus}</span>
              <span>{reactElementGroups.vorbesitzer}</span>
            </>
          )}
        </div>
      </section>
    )
  }
)
