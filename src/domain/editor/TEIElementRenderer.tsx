/*
 * MIT License
 *
 * Copyright (c) 2023 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React from 'react'
import { SLATE_NODE_TEXTELEMENT } from '../../infrastructure/Constants'
import {
  BeschreibungsKomponenteIdentifikation,
  TEI_ELEMENT_ALT_IDENTIFIER,
  TEI_ELEMENT_COLLECTION,
  TEI_ELEMENT_IDENTIFICATION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT
} from './beschreibungskomponenten/identifikation/BeschreibungsKomponenteIdentifikation'
import { TEIXMLElement } from './TEIXMLElement'
import {
  BeschreibungsKomponenteKopf,
  TEI_ELEMENT_HEAD,
  TEI_ELEMENT_INDEX,
  TEI_ELEMENT_NOTE,
  TEI_ELEMENT_TITLE
} from './beschreibungskomponenten/kopf/BeschreibungsKomponenteKopf'
import {
  BeschreibungsKomponenteFragment,
  TEI_ELEMENT_PART_FRAGMENT
} from './beschreibungskomponenten/BeschreibungsKomponenteFragment'
import {
  BeschreibungsKomponenteGeschichte,
  TEI_ELEMENT_HISTORY
} from './beschreibungskomponenten/BeschreibungsKomponenteGeschichte'
import {
  BeschreibungsKomponenteAeusseres,
  TEI_ELEMENT_PHYSICAL
} from './beschreibungskomponenten/BeschreibungsKomponenteAeusseres'
import { HiddenElement } from './HiddenElement'
import {
  BeschreibungsKomponenteEinband,
  TEI_ELEMENT_PART_BINDING
} from './beschreibungskomponenten/BeschreibungsKomponenteEinband'
import {
  BeschreibungsKomponenteAeusseresKunst,
  TEI_ELEMENT_DECONOTE_FORM
} from './beschreibungskomponenten/BeschreibungsKomponenteAeusseresKunst'
import {
  BeschreibungsKomponenteFaszikel,
  TEI_ELEMENT_PART_BOOKLET
} from './beschreibungskomponenten/BeschreibungsKomponenteFaszikel'
import {
  BeschreibungsKomponenteBeigabe,
  TEI_ELEMENT_PART_ACCMAT
} from './beschreibungskomponenten/BeschreibungsKomponenteBeigabe'
import {
  BeschreibungsKomponenteInhaltKunst,
  TEI_ELEMENT_DECONOTE_CONTENT
} from './beschreibungskomponenten/BeschreibungsKomponenteInhaltKunst'
import {
  BeschreibungsKomponenteInhaltMusik,
  TEI_ELEMENT_NOTE_MUSIC
} from './beschreibungskomponenten/BeschreibungsKomponenteInhaltMusik'
import {
  BeschreibungsKomponenteLiteratur,
  TEI_ELEMENT_ADDITIONAL
} from './beschreibungskomponenten/BeschreibungsKomponenteLiteratur'
import { BaseElement } from './BaseElement'
import { Koerperschaft, TEI_ELEMENT_ORGNAME } from './normdaten/Koerperschaft'
import { Person, TEI_ELEMENT_PERSNAME } from './normdaten/Person'
import { Ort, TEI_ELEMENT_PLACENAME } from './normdaten/Ort'
import { Title } from './beschreibungskomponenten/kopf/Title'
import { Index } from './beschreibungskomponenten/kopf/indexd/Index'
import { Note } from './beschreibungskomponenten/kopf/Note'
import {
  BeschreibungsKomponenteAbschnitt,
  TEI_ELEMENT_ITEM
} from './beschreibungskomponenten/BeschreibungsKomponenteAbschnitt'
import {
  BeschreibungsKomponenteInhaltText,
  TEI_ELEMENT_NOTE_TEXT
} from './beschreibungskomponenten/BeschreibungsKomponenteInhaltText'
import {
  BeschreibungsKomponenteInhalt,
  TEI_ELEMENT_MSCONTENTS
} from './beschreibungskomponenten/BeschreibungsKomponenteInhalt'
import {
  BeschreibungsKomponenteSonstiges,
  TEI_ELEMENT_PART_OTHER
} from './beschreibungskomponenten/BeschreibungsKomponenteSonstiges'
import { AltIdentifier } from './beschreibungskomponenten/identifikation/AltIdentifier'
import { Settlement } from './beschreibungskomponenten/identifikation/Settlement'
import { Repository } from './beschreibungskomponenten/identifikation/Repository'
import { Collection } from './beschreibungskomponenten/identifikation/Collection'
import { Idno } from './beschreibungskomponenten/identifikation/Idno'

export const render = (props: any, cls: Record<any, any>, normdatenurl: any) => {
  props.cls = cls
  props.normdatenurl = normdatenurl

  const elementMap = new Map()

  elementMap.set(TEI_ELEMENT_SETTLEMENT,
      <Settlement {...props}/>)
  elementMap.set(TEI_ELEMENT_REPOSITORY,
      <Repository {...props}/>)
  elementMap.set(TEI_ELEMENT_COLLECTION,
      <Collection {...props}/>)
  elementMap.set(TEI_ELEMENT_IDNO,
      <Idno {...props}/>)
  elementMap.set(TEI_ELEMENT_ALT_IDENTIFIER,
      <AltIdentifier {...props}/>)
  elementMap.set(TEI_ELEMENT_ORGNAME,
      <Koerperschaft element={props.element} attributes={props.attributes} children={props.children}
                     normdatenurl={props.normdatenurl}/>)
  elementMap.set(TEI_ELEMENT_PERSNAME,
      <Person element={props.element} attributes={props.attributes} children={props.children}
              normdatenurl={props.normdatenurl}/>)
  elementMap.set(TEI_ELEMENT_PLACENAME,
      <Ort element={props.element} attributes={props.attributes} children={props.children}
           normdatenurl={props.normdatenurl}/>)
  elementMap.set(TEI_ELEMENT_NOTE,
      <Note element={props.element} children={props.children} attributes={props.attributes}/>)
  elementMap.set(TEI_ELEMENT_INDEX,
      <Index element={props.element} attributes={props.attributes} children={props.children}
             normdatenurl={props.normdatenurl} />)
  elementMap.set(TEI_ELEMENT_TITLE,
      <Title element={props.element} children={props.children} attributes={props.attributes}/>)
  const componentMap = new Map()

  componentMap.set(TEI_ELEMENT_IDENTIFICATION,
      <BeschreibungsKomponenteIdentifikation element={props.element} cls={props.cls} children={props.children}
                                             attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_HEAD,
      <BeschreibungsKomponenteKopf element={props.element} cls={props.cls} children={props.children}
                                   attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_NOTE_TEXT,
      <BeschreibungsKomponenteInhaltText element={props.element} cls={props.cls} children={props.children}
                                         attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_MSCONTENTS,
      <BeschreibungsKomponenteInhalt element={props.element} cls={props.cls} children={props.children}/>)
  componentMap.set(TEI_ELEMENT_ITEM,
      <BeschreibungsKomponenteAbschnitt element={props.element} cls={props.cls} children={props.children}/>)
  componentMap.set(TEI_ELEMENT_DECONOTE_CONTENT,
      <BeschreibungsKomponenteInhaltKunst element={props.element} cls={props.cls} children={props.children}
                                          attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_NOTE_MUSIC,
      <BeschreibungsKomponenteInhaltMusik element={props.element} cls={props.cls} children={props.children}
                                          attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_PART_FRAGMENT,
      <BeschreibungsKomponenteFragment element={props.element} cls={props.cls} children={props.children}
                                       attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_PART_BOOKLET,
      <BeschreibungsKomponenteFaszikel element={props.element} cls={props.cls} children={props.children}
                                       attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_HISTORY,
      <BeschreibungsKomponenteGeschichte element={props.element} cls={props.cls} children={props.children}
                                         attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_PHYSICAL,
      <BeschreibungsKomponenteAeusseres element={props.element} cls={props.cls} children={props.children}
                                        attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_PART_BINDING,
      <BeschreibungsKomponenteEinband element={props.element} cls={props.cls} children={props.children}
                                      attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_DECONOTE_FORM,
      <BeschreibungsKomponenteAeusseresKunst element={props.element} cls={props.cls} children={props.children}
                                             attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_PART_ACCMAT,
      <BeschreibungsKomponenteBeigabe element={props.element} cls={props.cls} children={props.children}
                                      attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_PART_OTHER,
      <BeschreibungsKomponenteSonstiges element={props.element} cls={props.cls} children={props.children}
                                        attributes={props.attributes}/>)
  componentMap.set(TEI_ELEMENT_ADDITIONAL,
      <BeschreibungsKomponenteLiteratur element={props.element} cls={props.cls} children={props.children}
                                        attributes={props.attributes}/>)

  if (props && props.element && props.element.data_origin) {
    switch (props.element.data_origin) {

      case 'teiHeader':
        if (!props.element.showtei) {
          return <HiddenElement/>
        } else {
          return TEIXMLElement(props, cls)
        }
      default:
        if (props.element.data_origin !== SLATE_NODE_TEXTELEMENT) {

          if (!props.element.showtei && componentMap.has(props.element.component)) {
            return componentMap.get(props.element.component)
          }

          if (!props.element.showtei && elementMap.has(props.element.data_origin)) {
            return elementMap.get(props.element.data_origin)
          }
          return TEIXMLElement(props, cls)
        } else {
          return <BaseElement children={props.children} attributes={props.attributes}/>
        }
    }
  }
  return BaseElement(props)
}
