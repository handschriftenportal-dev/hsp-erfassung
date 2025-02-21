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

import React from 'react'
import { RenderElementProps } from 'slate-react'

import {
  TEI_ELEMENT_ADDITIONAL,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_COLLECTION,
  TEI_ELEMENT_DECONOTE_CONTENT,
  TEI_ELEMENT_DECONOTE_FORM,
  TEI_ELEMENT_HEAD,
  TEI_ELEMENT_HISTORY,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_INDEX,
  TEI_ELEMENT_ITEM,
  TEI_ELEMENT_LINEBREAK,
  TEI_ELEMENT_MSCONTENTS,
  TEI_ELEMENT_NOTE,
  TEI_ELEMENT_NOTE_MUSIC,
  TEI_ELEMENT_NOTE_REGISTER,
  TEI_ELEMENT_NOTE_TEXT,
  TEI_ELEMENT_PART_ACCMAT,
  TEI_ELEMENT_PART_BINDING,
  TEI_ELEMENT_PART_BOOKLET,
  TEI_ELEMENT_PART_FRAGMENT,
  TEI_ELEMENT_PART_OTHER,
  TEI_ELEMENT_PHYSICAL,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  TEI_ELEMENT_TEXT_LANG_ELEMENT,
  TEI_ELEMENT_TITLE,
} from '../erfassung/TEIConstants'
import { BaseElement } from './BaseElement'
import { TextLang } from './beschreibungselemente/TextLang'
import { BeschreibungsKomponenteAbschnitt } from './beschreibungskomponenten/BeschreibungsKomponenteAbschnitt'
import { BeschreibungsKomponenteAuesseres } from './beschreibungskomponenten/BeschreibungsKomponenteAuesseres'
import { BeschreibungsKomponenteAuesseresKunst } from './beschreibungskomponenten/BeschreibungsKomponenteAuesseresKunst'
import { BeschreibungsKomponenteBeigabe } from './beschreibungskomponenten/BeschreibungsKomponenteBeigabe'
import { BeschreibungsKomponenteEinband } from './beschreibungskomponenten/BeschreibungsKomponenteEinband'
import { BeschreibungsKomponenteFaszikel } from './beschreibungskomponenten/BeschreibungsKomponenteFaszikel'
import { BeschreibungsKomponenteFragment } from './beschreibungskomponenten/BeschreibungsKomponenteFragment'
import { BeschreibungsKomponenteGeschichte } from './beschreibungskomponenten/BeschreibungsKomponenteGeschichte'
import { BeschreibungsKomponenteInhalt } from './beschreibungskomponenten/BeschreibungsKomponenteInhalt'
import { BeschreibungsKomponenteInhaltKunst } from './beschreibungskomponenten/BeschreibungsKomponenteInhaltKunst'
import { BeschreibungsKomponenteInhaltMusik } from './beschreibungskomponenten/BeschreibungsKomponenteInhaltMusik'
import { BeschreibungsKomponenteInhaltRegister } from './beschreibungskomponenten/BeschreibungsKomponenteInhaltRegister'
import { BeschreibungsKomponenteInhaltText } from './beschreibungskomponenten/BeschreibungsKomponenteInhaltText'
import { BeschreibungsKomponenteLiteratur } from './beschreibungskomponenten/BeschreibungsKomponenteLiteratur'
import { BeschreibungsKomponenteSonstiges } from './beschreibungskomponenten/BeschreibungsKomponenteSonstiges'
import { AltIdentifier } from './beschreibungskomponenten/identifikation/AltIdentifier'
import { BeschreibungsKomponenteIdentifikation } from './beschreibungskomponenten/identifikation/BeschreibungsKomponenteIdentifikation'
import { Collection } from './beschreibungskomponenten/identifikation/Collection'
import { Idno } from './beschreibungskomponenten/identifikation/Idno'
import { Repository } from './beschreibungskomponenten/identifikation/Repository'
import { Settlement } from './beschreibungskomponenten/identifikation/Settlement'
import { BeschreibungsKomponenteKopf } from './beschreibungskomponenten/kopf/BeschreibungsKomponenteKopf'
import { Index } from './beschreibungskomponenten/kopf/indexd/Index'
import { Note } from './beschreibungskomponenten/kopf/Note'
import { Title } from './beschreibungskomponenten/kopf/Title'
import { HiddenElement } from './HiddenElement'
import { LBElement } from './LBElement'
import { NormdatenAnsicht } from './normdaten/ansicht/NormdatenAnsicht'
import {
  SemantischeZitate,
  TEI_ELEMENT_QUOTE,
} from './semantischeAuszeichnungen/SemantischeZitate'
import { Volltext } from './volltext/Volltext'

type Mapping = (props: any) => React.JSX.Element
type OptionalMapping = (props: any) => React.JSX.Element | undefined

const combine = (mappings: OptionalMapping[], fallback: Mapping): Mapping => {
  return (props: any) => {
    for (const mapping of mappings) {
      const result = mapping(props)
      if (result !== undefined) {
        return result
      }
    }
    return fallback(props)
  }
}

const components: OptionalMapping = (props: any) => {
  switch (props.element.component) {
    case TEI_ELEMENT_IDENTIFICATION:
      return <BeschreibungsKomponenteIdentifikation {...props} />
    case TEI_ELEMENT_HEAD:
      return <BeschreibungsKomponenteKopf {...props} />
    case TEI_ELEMENT_NOTE_TEXT:
      return <BeschreibungsKomponenteInhaltText {...props} />
    case TEI_ELEMENT_NOTE_REGISTER:
      return <BeschreibungsKomponenteInhaltRegister {...props} />
    case TEI_ELEMENT_MSCONTENTS:
      return <BeschreibungsKomponenteInhalt {...props} />
    case TEI_ELEMENT_ITEM:
      return <BeschreibungsKomponenteAbschnitt {...props} />
    case TEI_ELEMENT_DECONOTE_CONTENT:
      return <BeschreibungsKomponenteInhaltKunst {...props} />
    case TEI_ELEMENT_NOTE_MUSIC:
      return <BeschreibungsKomponenteInhaltMusik {...props} />
    case TEI_ELEMENT_PART_FRAGMENT:
      return <BeschreibungsKomponenteFragment {...props} />
    case TEI_ELEMENT_PART_BOOKLET:
      return <BeschreibungsKomponenteFaszikel {...props} />
    case TEI_ELEMENT_HISTORY:
      return <BeschreibungsKomponenteGeschichte {...props} />
    case TEI_ELEMENT_PHYSICAL:
      return <BeschreibungsKomponenteAuesseres {...props} />
    case TEI_ELEMENT_PART_BINDING:
      return <BeschreibungsKomponenteEinband {...props} />
    case TEI_ELEMENT_DECONOTE_FORM:
      return <BeschreibungsKomponenteAuesseresKunst {...props} />
    case TEI_ELEMENT_PART_ACCMAT:
      return <BeschreibungsKomponenteBeigabe {...props} />
    case TEI_ELEMENT_PART_OTHER:
      return <BeschreibungsKomponenteSonstiges {...props} />
    case TEI_ELEMENT_ADDITIONAL:
      return <BeschreibungsKomponenteLiteratur {...props} />
  }
}
const elements: OptionalMapping = (props: any) => {
  switch (props.element.data_origin) {
    case 'volltext':
      return <Volltext {...props} />
    case 'teiHeader':
      return <HiddenElement {...props} />
    case undefined:
      return <BaseElement {...props} />
    case TEI_ELEMENT_SETTLEMENT:
      return <Settlement {...props} />
    case TEI_ELEMENT_REPOSITORY:
      return <Repository {...props} />
    case TEI_ELEMENT_COLLECTION:
      return <Collection {...props} />
    case TEI_ELEMENT_IDNO:
      return <Idno {...props} />
    case TEI_ELEMENT_ALT_IDENTIFIER:
      return <AltIdentifier {...props} />
    case TEI_ELEMENT_NOTE:
      return <Note {...props} />
    case TEI_ELEMENT_INDEX:
      return <Index {...props} />
    case TEI_ELEMENT_TITLE:
      return <Title {...props} />
    case TEI_ELEMENT_LINEBREAK:
      return <LBElement {...props} />
    case TEI_ELEMENT_TEXT_LANG_ELEMENT:
      return <TextLang {...props} />
    case TEI_ELEMENT_QUOTE:
      return <SemantischeZitate {...props} />
    case TEI_ELEMENT_IDENTIFICATION:
      return <BeschreibungsKomponenteIdentifikation {...props} />
  }
}

const normdataElements: OptionalMapping = (props: any) => {
  switch (props.element.data_origin) {
    case TEI_ELEMENT_COLLECTION:
    case TEI_ELEMENT_IDNO:
    case TEI_ELEMENT_ALT_IDENTIFIER:
    case TEI_ELEMENT_TEXT_LANG_ELEMENT:
    case TEI_ELEMENT_LINEBREAK:
      return <HiddenElement {...props} />
    case 'volltext':
      return <NormdatenAnsicht {...props} />
  }
}

const baseElement: Mapping = (props) => <BaseElement {...props} />
const formattedRenderer = combine([components, elements], baseElement)
const normdatenAnsicht = combine([normdataElements], formattedRenderer)

export const selectRenderer = (
  mode: string
): ((props: RenderElementProps) => React.JSX.Element) => {
  switch (mode) {
    case 'previewMode':
    case 'editMode':
      return formattedRenderer
    case 'normdataMode':
      return normdatenAnsicht
    default:
      throw new Error(`Rendering for "${mode}" not implemented`)
  }
}
