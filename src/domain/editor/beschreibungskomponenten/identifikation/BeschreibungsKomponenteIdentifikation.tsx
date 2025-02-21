/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { Grid } from '@mui/material'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { selectReadOnly } from '../../../erfassung/ErfassungsState'
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE,
} from '../../../erfassung/TEIConstants'
import { HeadLine } from '../../HeadLine'
import { HiddenElement } from '../../HiddenElement'
import { HorizontalRule, HorizontalRuleLight } from '../../HorizontalRule'
import { SimpleAccordion } from '../../SimpleAccordion'
import {
  BESCHREIBUNGS_KOMPONENTEN_LEVEL,
  INDENTATION,
} from '../ComponentSection'
import { AddElementButtonForIdentification } from './AddElementButtonForIdentification'
import { MsIdentifikationSimpleWithBaseElements } from './MsIdentifikationSimpleWithBaseElements'

interface Props extends RenderElementProps {}

export const BeschreibungsKomponenteIdentifikation: FC<Props> = memo(
  ({ element, children, attributes }) => {
    const readOnly = useSelector(selectReadOnly)
    const { t } = useTranslation()
    const { path = '', level, component } = element as any

    if (!component) {
      return (
        <HiddenElement element={element} attributes={attributes}>
          {children}
        </HiddenElement>
      )
    }

    if (
      path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) ||
      (path.includes(TEI_ELEMENT_MSPART) &&
        path.includes(TEI_ELEMENT_IDENTIFICATION))
    ) {
      const headline = (
        <HeadLine
          label={t('sidebar.identification')}
          labelSize="h3"
          helpText={t('editor.help_text.identifikation')}
        />
      )
      let formerReactElements
      let corpusReactElements
      let allOtherReactElements

      try {
        formerReactElements = children.filter(
          (child: any) =>
            child.props.children.props.element.data_type ===
            VORBESITZER_DATA_TYPE
        )
      } catch (_error) {
        formerReactElements = null
      }

      try {
        corpusReactElements = children.filter(
          (child: any) =>
            child.props.children.props.element.data_type === SAMMLUNG_DATA_TYPE
        )
      } catch (_error) {
        corpusReactElements = null
      }

      try {
        allOtherReactElements = children.filter(
          (child: any) =>
            child.props.children.props.element.data_type !==
              SAMMLUNG_DATA_TYPE &&
            child.props.children.props.element.data_type !==
              VORBESITZER_DATA_TYPE
        )
      } catch (_error) {
        allOtherReactElements = null
      }

      const content = (
        <div style={{ display: 'block' }}>
          <div className={'small-bottom-gab'}>{allOtherReactElements}</div>
          {children.filter(
            (child: any) =>
              child.props.children.props.element.data_origin ===
              TEI_ELEMENT_SETTLEMENT
          ).length === 0 && (
            <Grid
              style={{ marginBottom: '12px', justifyContent: 'end' }}
              item
              xs={11}
              container
            >
              <Grid className={'small-bottom-gab'} item xs={3}>
                <AddElementButtonForIdentification
                  dataOrigin={TEI_ELEMENT_SETTLEMENT}
                  msIdentifierChildren={element.children}
                  dataTypeToAdd={''}
                  path={path}
                  isAltIdentifier={false}
                  buttonLabel={t('editor.settlement')}
                />
              </Grid>
            </Grid>
          )}
          {children.filter(
            (child: any) =>
              child.props.children.props.element.data_origin ===
              TEI_ELEMENT_REPOSITORY
          ).length === 0 && (
            <Grid
              style={{ marginBottom: '12px', justifyContent: 'end' }}
              item
              xs={11}
              container
            >
              <Grid className={'small-bottom-gab'} item xs={3}>
                <AddElementButtonForIdentification
                  dataOrigin={TEI_ELEMENT_REPOSITORY}
                  msIdentifierChildren={element.children}
                  dataTypeToAdd={''}
                  path={path}
                  buttonLabel={t('editor.repository')}
                  isAltIdentifier={false}
                />
              </Grid>
            </Grid>
          )}
          {path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) && (
            <>
              <span>{corpusReactElements}</span>
              <Grid
                style={{ marginBottom: '12px', justifyContent: 'end' }}
                item
                xs={11}
                container
              >
                <Grid className={'mid-bottom-gab'} item xs={3}>
                  <AddElementButtonForIdentification
                    dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
                    msIdentifierChildren={element.children}
                    dataTypeToAdd={SAMMLUNG_DATA_TYPE}
                    path={path}
                    buttonLabel={t('editor.corpus')}
                    isAltIdentifier={true}
                  />
                </Grid>
              </Grid>
            </>
          )}
          <span>{formerReactElements}</span>
          <Grid
            style={{ marginBottom: '12px', justifyContent: 'end' }}
            item
            xs={11}
            container
          >
            {(path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) ||
              formerReactElements?.length === 0) && (
              <Grid className={'mid-bottom-gab'} item xs={3}>
                <AddElementButtonForIdentification
                  msIdentifierChildren={element.children}
                  dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
                  dataTypeToAdd={VORBESITZER_DATA_TYPE}
                  path={path}
                  buttonLabel={t('editor.former_signature')}
                  isAltIdentifier={true}
                />
              </Grid>
            )}
          </Grid>
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
        <section id={(element as any).id}>
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
                <span>{allOtherReactElements}</span>
                <span>{corpusReactElements}</span>
                <span>{formerReactElements}</span>
              </>
            )}
          </div>
        </section>
      )
    }

    return (
      <MsIdentifikationSimpleWithBaseElements
        element={element}
        attributes={attributes}
        children={children}
      />
    )
  }
)
