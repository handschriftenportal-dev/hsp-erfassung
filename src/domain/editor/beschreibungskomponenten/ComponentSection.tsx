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

import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { selectReadOnly } from '../../erfassung/ErfassungsState'
import {
  TEI_ELEMENT_DECONOTE_FORM,
  TEI_ELEMENT_PHYSICAL,
} from '../../erfassung/TEIConstants'
import { HeadLine } from '../HeadLine'
import { HorizontalRule, HorizontalRuleLight } from '../HorizontalRule'
import { SimpleAccordion } from '../SimpleAccordion'

interface Props extends RenderElementProps {
  headlineKey: string
  helpTextKey: string
}

export const BESCHREIBUNGS_KOMPONENTEN_LEVEL = 5
export const INDENTATION = 24
const noShiftComponents = new Set([
  TEI_ELEMENT_PHYSICAL,
  TEI_ELEMENT_DECONOTE_FORM,
])

export const ComponentSection: FC<Props> = ({
  attributes,
  element,
  children,
  headlineKey,
  helpTextKey,
}) => {
  const readOnly = useSelector(selectReadOnly)
  const { t } = useTranslation()
  const { id, level, region } = element as any
  const relativeLevel = level - BESCHREIBUNGS_KOMPONENTEN_LEVEL

  const margin = {
    marginLeft: `${relativeLevel > 0 ? INDENTATION : 0}px`,
  }
  const subcomponentRulerShift = {
    marginLeft: noShiftComponents.has(region)
      ? '0px'
      : `${-INDENTATION * (relativeLevel - 1)}px`,
  }

  return (
    <section id={id}>
      {level === BESCHREIBUNGS_KOMPONENTEN_LEVEL ? (
        <HorizontalRule />
      ) : (
        <HorizontalRuleLight style={subcomponentRulerShift} />
      )}
      <div style={margin}>
        {readOnly ? (
          <>
            <HeadLine label={t(headlineKey)} labelSize="h3" />
            <div {...attributes}>{children}</div>
          </>
        ) : (
          <SimpleAccordion
            attributes={attributes}
            element={element}
            detailsContent={children}
            level={relativeLevel}
          >
            <HeadLine
              label={t(headlineKey)}
              labelSize="h3"
              helpText={t(helpTextKey)}
            />
          </SimpleAccordion>
        )}
      </div>
    </section>
  )
}
