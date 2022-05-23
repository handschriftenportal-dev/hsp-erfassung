/*
 * MIT License
 *
 * Copyright (c) 2022 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
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
 */

import {
  calculateNextNumberOfComponentesOnSameLevel,
  createBeschreibungsComponents,
  findAllowedComponentsForComponent,
  findComponentById,
  findComponentPosition,
  findExistingComponents,
  findFollowingComponentById
} from '../../../src/domain/erfassung/ErfassungsGuidline'
import { BeschreibungsKomponente } from '../../../src/domain/sidebar/BeschreibungsKomponenteFactory'
import { TEI_ELEMENT_ITEM } from '../../../src/domain/editor/beschreibungskomponenten/BeschreibungsKomponenteAbschnitt'


describe('ErfassungsGuideline Tests', () => {
  it('Find Allowed Components for note Text', () => {

    expect(JSON.stringify(findAllowedComponentsForComponent('medieval', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'notetext',
      xmlpath: '',
      wrapperID: ''
    }, [], true, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      xmlpath: '',
      wrapperID: ''
    }))).toEqual('[{"element":"decoNoteform"}]')
  })

  it('Find Allowed Components for head', () => {

    expect(JSON.stringify(findAllowedComponentsForComponent('medieval', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'head',
      xmlpath: '',
      wrapperID: ''
    }, [], true, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      xmlpath: '',
      wrapperID: ''
    }))).toEqual('[]')
  })

  it('Find Allowed Components for msPartbooklet with SameBehind', () => {

    expect(JSON.stringify(findAllowedComponentsForComponent('medieval', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'msPartbooklet',
      xmlpath: '',
      wrapperID: ''
    }, [], true, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      xmlpath: '',
      wrapperID: ''
    }, true))).toEqual('[{"element":"msPartbooklet"}]')
  })

  it('Find Allowed Components for msPartbooklet without SameBehind', () => {

    expect(JSON.stringify(findAllowedComponentsForComponent('medieval', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'msPartbooklet',
      xmlpath: '',
      wrapperID: ''
    }, [], true, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      xmlpath: '',
      wrapperID: ''
    }, false))).toEqual('[{"element":"msIdentifier"},{"element":"head"},{"element":"physDesc"},{"element":"history"},{"element":"msContents"},{"element":"additional"},{"element":"msPartbooklet"},{"element":"msPartother"}]')
  })

  it('Find Allowed Components for medieval', () => {

    expect(JSON.stringify(findAllowedComponentsForComponent('medieval', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'head',
      xmlpath: '',
      wrapperID: ''
    }, [], false, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      xmlpath: '',
      wrapperID: ''
    }))).toEqual('[{"element":"msContents"},{"element":"physDesc"},{"element":"history"},{"element":"msPartfragment"},{"element":"msPartbinding"},{"element":"msPartbooklet"},{"element":"msPartaccMat"},{"element":"msPartother"},{"element":"additional"}]')
  })

  it('Find Allowed Components for medieval msItem', () => {

    expect(JSON.stringify(findAllowedComponentsForComponent('medieval', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'msItem',
      xmlpath: '',
      wrapperID: ''
    }, [], true, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      xmlpath: '',
      wrapperID: ''
    }))).toEqual('[{"element":"notetext"},{"element":"decoNotecontent"},{"element":"notemusic"},{"element":"msItem"},{"element":"decoNoteform"}]')
  })

  it('Find Allowed Components for medieval with existing Literatur', () => {

    expect(JSON.stringify(findAllowedComponentsForComponent('medieval', {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: 'head',
      xmlpath: '',
      wrapperID: ''
    }, ['additional'], false, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '',
      path: [],
      teiElement: '',
      xmlpath: '',
      wrapperID: ''
    }))).toEqual('[{"element":"physDesc"},{"element":"history"}]')
  })

  it('Find Existing Components in Sidebar', () => {

    const sidebar: Array<BeschreibungsKomponente> = JSON.parse('[{"id":"9f43a88d-1ad5-4fe8-9bdc-fa743b8d8f4e","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[],"xmlpath":"#document-TEI-text-body-msDesc-msIdentifier","level":1,"parent":"root","wrapperid":""},{"id":"1fbf595d-9cad-4912-b87c-877bed373ee1","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,1],"xmlpath": "#document-TEI-text-body-msDesc-head","level":1,"parent":"root","wrapperid":""},{"id":"3df0ed3b-c0b9-48b0-a117-d82992272c68","label":"Einband","teiElement":"msPartbinding","children":[{"id":"b6845e64-f586-4b40-b754-fa971789c64b","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[0,2,0,0,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msIdentifier","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"13614ba5-c81a-40f9-96e7-c6872ee62775","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-head","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"7a81e17c-b12d-4523-bf88-3a98f4aadc8d","label":"Inhalt (Text)","teiElement":"msItemtext","children":[],"path":[0,2,0,0,2,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"0e5554c4-b6c8-41ea-8750-b934a01ff69a","label":"Inhalt (Kunst)","teiElement":"msItemiconography","children":[],"path":[0,2,0,0,2,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"3b8622bb-b3dc-4733-9988-c028601e30b6","label":"Inhalt (Musik)","teiElement":"notemusic","children":[],"path":[0,2,0,0,2,2,2],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","label":"Äußeres","teiElement":"physDesc","children":[{"id":"a8fbf6fd-227d-48fc-a667-0410ad1ea9c4","label":"Äußeres (Kunst)","teiElement":"decoDesc","children":[],"path":[0,2,0,0,2,3,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc-decoDesc","level":1,"parent":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2,3],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"dde54da5-2238-4afc-86b1-df2c20d89e24","label":"Geschichte","teiElement":"history","children":[],"path":[0,2,0,0,2,4],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-history","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart","level":1,"parent":"root","wrapperid":""}]')

    const result: Array<string> = findExistingComponents(sidebar, {
      children: [],
      copied: false,
      id: '',
      label: '',
      level: 0,
      parent: '3df0ed3b-c0b9-48b0-a117-d82992272c68',
      path: [],
      teiElement: '',
      wrapperID: '',
      xmlpath: ''
    }, [])

    expect(JSON.stringify(result)).toEqual('["msIdentifier","head","msItemtext","msItemiconography","notemusic","physDesc","history"]')
  })

  it('Find Component By ID in Sidebar', () => {

    const sidebar: Array<BeschreibungsKomponente> = JSON.parse('[{"id":"9f43a88d-1ad5-4fe8-9bdc-fa743b8d8f4e","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[],"xmlpath":"#document-TEI-text-body-msDesc-msIdentifier","level":1,"parent":"root","wrapperid":""},{"id":"1fbf595d-9cad-4912-b87c-877bed373ee1","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,1],"xmlpath": "#document-TEI-text-body-msDesc-head","level":1,"parent":"root","wrapperid":""},{"id":"3df0ed3b-c0b9-48b0-a117-d82992272c68","label":"Einband","teiElement":"msPartbinding","children":[{"id":"b6845e64-f586-4b40-b754-fa971789c64b","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[0,2,0,0,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msIdentifier","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"13614ba5-c81a-40f9-96e7-c6872ee62775","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-head","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"7a81e17c-b12d-4523-bf88-3a98f4aadc8d","label":"Inhalt (Text)","teiElement":"msItemtext","children":[],"path":[0,2,0,0,2,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"0e5554c4-b6c8-41ea-8750-b934a01ff69a","label":"Inhalt (Kunst)","teiElement":"msItemiconography","children":[],"path":[0,2,0,0,2,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"3b8622bb-b3dc-4733-9988-c028601e30b6","label":"Inhalt (Musik)","teiElement":"msItemmusic","children":[],"path":[0,2,0,0,2,2,2],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","label":"Äußeres","teiElement":"physDesc","children":[{"id":"a8fbf6fd-227d-48fc-a667-0410ad1ea9c4","label":"Äußeres (Kunst)","teiElement":"decoDesc","children":[],"path":[0,2,0,0,2,3,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc-decoDesc","level":1,"parent":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2,3],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"dde54da5-2238-4afc-86b1-df2c20d89e24","label":"Geschichte","teiElement":"history","children":[],"path":[0,2,0,0,2,4],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-history","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart","level":1,"parent":"root","wrapperid":""}]')

    const result: BeschreibungsKomponente | undefined = findComponentById(sidebar, '9f43a88d-1ad5-4fe8-9bdc-fa743b8d8f4e')

    expect(JSON.stringify(result)).toEqual('{"id":"9f43a88d-1ad5-4fe8-9bdc-fa743b8d8f4e","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[],"xmlpath":"#document-TEI-text-body-msDesc-msIdentifier","level":1,"parent":"root","wrapperid":""}')
  })

  it('Find Follower of Component By ID in Sidebar', () => {

    const sidebar: Array<BeschreibungsKomponente> = JSON.parse('[{"id":"9f43a88d-1ad5-4fe8-9bdc-fa743b8d8f4e","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[],"xmlpath":"#document-TEI-text-body-msDesc-msIdentifier","level":1,"parent":"root","wrapperid":""},' +
        '{"id":"1fbf595d-9cad-4912-b87c-877bed373ee1","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,1],"xmlpath": "#document-TEI-text-body-msDesc-head","level":1,"parent":"root","wrapperID":""},{"id":"3df0ed3b-c0b9-48b0-a117-d82992272c68","label":"Einband","teiElement":"msPartbinding","children":[{"id":"b6845e64-f586-4b40-b754-fa971789c64b","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[0,2,0,0,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msIdentifier","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"13614ba5-c81a-40f9-96e7-c6872ee62775","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-head","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"7a81e17c-b12d-4523-bf88-3a98f4aadc8d","label":"Inhalt (Text)","teiElement":"msItemtext","children":[],"path":[0,2,0,0,2,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"0e5554c4-b6c8-41ea-8750-b934a01ff69a","label":"Inhalt (Kunst)","teiElement":"msItemiconography","children":[],"path":[0,2,0,0,2,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"3b8622bb-b3dc-4733-9988-c028601e30b6","label":"Inhalt (Musik)","teiElement":"msItemmusic","children":[],"path":[0,2,0,0,2,2,2],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","label":"Äußeres","teiElement":"physDesc","children":[{"id":"a8fbf6fd-227d-48fc-a667-0410ad1ea9c4","label":"Äußeres (Kunst)","teiElement":"decoDesc","children":[],"path":[0,2,0,0,2,3,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc-decoDesc","level":1,"parent":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2,3],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"dde54da5-2238-4afc-86b1-df2c20d89e24","label":"Geschichte","teiElement":"history","children":[],"path":[0,2,0,0,2,4],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-history","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart","level":1,"parent":"root","wrapperid":""}]')

    const result: any = findFollowingComponentById(sidebar, sidebar[1])

    console.log(sidebar)

    expect(JSON.stringify(result)).toEqual('{"id":"3df0ed3b-c0b9-48b0-a117-d82992272c68","label":"Einband","teiElement":"msPartbinding","children":[{"id":"b6845e64-f586-4b40-b754-fa971789c64b","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[0,2,0,0,2,0],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-msIdentifier","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"13614ba5-c81a-40f9-96e7-c6872ee62775","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,2,1],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-head","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"7a81e17c-b12d-4523-bf88-3a98f4aadc8d","label":"Inhalt (Text)","teiElement":"msItemtext","children":[],"path":[0,2,0,0,2,2,0],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"0e5554c4-b6c8-41ea-8750-b934a01ff69a","label":"Inhalt (Kunst)","teiElement":"msItemiconography","children":[],"path":[0,2,0,0,2,2,1],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"3b8622bb-b3dc-4733-9988-c028601e30b6","label":"Inhalt (Musik)","teiElement":"msItemmusic","children":[],"path":[0,2,0,0,2,2,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","label":"Äußeres","teiElement":"physDesc","children":[{"id":"a8fbf6fd-227d-48fc-a667-0410ad1ea9c4","label":"Äußeres (Kunst)","teiElement":"decoDesc","children":[],"path":[0,2,0,0,2,3,1],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-physDesc-decoDesc","level":1,"parent":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2,3],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-physDesc","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"dde54da5-2238-4afc-86b1-df2c20d89e24","label":"Geschichte","teiElement":"history","children":[],"path":[0,2,0,0,2,4],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-history","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart","level":1,"parent":"root","wrapperid":""}')

    const headInPart = findComponentById(sidebar, '13614ba5-c81a-40f9-96e7-c6872ee62775')

    expect(JSON.stringify(findFollowingComponentById(sidebar, headInPart))).toEqual('{"id":"7a81e17c-b12d-4523-bf88-3a98f4aadc8d","label":"Inhalt (Text)","teiElement":"msItemtext","children":[],"path":[0,2,0,0,2,2,0],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}')
  })

  it('calculateNextNumberOfComponentesOnSameLevel in Sidebar', () => {

    const sidebar: Array<BeschreibungsKomponente> = JSON.parse('[{"id":"9f43a88d-1ad5-4fe8-9bdc-fa743b8d8f4e","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[],"xmlpath":"#document-TEI-text-body-msDesc-msIdentifier","level":1,"parent":"root","wrapperid":""},' +
        '{"id":"1fbf595d-9cad-4912-b87c-877bed373ee1","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,1],"xmlpath": "#document-TEI-text-body-msDesc-head","level":1,"parent":"root","wrapperID":""},{"id":"3df0ed3b-c0b9-48b0-a117-d82992272c68","label":"Einband","teiElement":"msPartbinding","children":[{"id":"b6845e64-f586-4b40-b754-fa971789c64b","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[0,2,0,0,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msIdentifier","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"13614ba5-c81a-40f9-96e7-c6872ee62775","label":"Kopf","teiElement":"head","children":[],"path":[0,2,0,0,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-head","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":""},{"id":"7a81e17c-b12d-4523-bf88-3a98f4aadc8d","label":"Inhalt (Text)","teiElement":"msItemtext","children":[],"path":[0,2,0,0,2,2,0],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"0e5554c4-b6c8-41ea-8750-b934a01ff69a","label":"Inhalt (Kunst)","teiElement":"msItemiconography","children":[],"path":[0,2,0,0,2,2,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"3b8622bb-b3dc-4733-9988-c028601e30b6","label":"Inhalt (Musik)","teiElement":"msItemmusic","children":[],"path":[0,2,0,0,2,2,2],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-msContents-msItem","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","label":"Äußeres","teiElement":"physDesc","children":[{"id":"a8fbf6fd-227d-48fc-a667-0410ad1ea9c4","label":"Äußeres (Kunst)","teiElement":"decoDesc","children":[],"path":[0,2,0,0,2,3,1],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc-decoDesc","level":1,"parent":"afb4fb93-6435-43df-a418-e4b5d43bfbb9","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2,3],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-physDesc","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"},{"id":"dde54da5-2238-4afc-86b1-df2c20d89e24","label":"Geschichte","teiElement":"history","children":[],"path":[0,2,0,0,2,4],"copied":false,"xmlpath": "#document-TEI-text-body-msDesc-msPart-history","level":1,"parent":"3df0ed3b-c0b9-48b0-a117-d82992272c68","wrapperid":"7bb62858-d671-4e88-9954-1f641f228eb9"}],"path":[0,2,0,0,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msPart","level":1,"parent":"root","wrapperid":""}]')

    const beschreibung = JSON.parse('{"id":"b5987b82-c8a6-46ec-8b3d-a49ef06556ce","label":"Fragment","teiElement":"msPartfragment","children":[{"id":"37adf08c-e86d-4902-90b1-85d5c0992fed","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[0,1,0,0,6,6,0],"xmlpath":"#document-TEI-text-body-msDesc-msPart-msPart-msIdentifier","level":3,"parent":"b5987b82-c8a6-46ec-8b3d-a49ef06556ce","wrapperID":""},{"id":"7bf8fd0f-2301-489a-b41e-d64b045d1baa","label":"Kopf","teiElement":"head","children":[],"path":[0,1,0,0,6,6,1],"xmlpath":"#document-TEI-text-body-msDesc-msPart-msPart-head","level":3,"parent":"b5987b82-c8a6-46ec-8b3d-a49ef06556ce","wrapperID":""}]}')

    const result: any = calculateNextNumberOfComponentesOnSameLevel(sidebar, beschreibung, 'head', true)

    expect(result).toEqual(2)
  })

  it.skip('Create Components with Children and Wrapper Check for head', () => {

    const { component, children } = createBeschreibungsComponents({
      children: [],
      copied: false,
      id: '3765bd63-4d9e-4fa2-ab4f-5bebce3faf0e',
      label: 'Identifikation',
      level: 1,
      parent: 'root',
      path: [0, 1, 0, 0, 0],
      teiElement: 'msIdentifier',
      wrapperID: '',
      xmlpath: '#document-TEI-text-body-msDesc-msIdentifier'
    }, 'medieval', 'head', undefined, false)

    const componentMatch = expect.stringMatching('{"data_origin":"head","region":"head","component":"head","copied":false,"id":".*","path":"#document-TEI-text-body-msDesc-head","level":1}')
    const childrenMatch = expect.stringMatching('\\[{"data_origin":"title","region":"head","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"___HANDSCHRIFTENTITEL__","region":"head",' +
        '"id":".*,"path":"#document-TEI-text-body-msDesc-head-title-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-title-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-title","level":1},' +
        '{"data_origin":"note","data_type":"headline","region":"head",' +
        '"children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__SCHLAGZEILE__","region":"head","id":".*","path":"#document-TEI-text-body-msDesc-head-note-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-note-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-note","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"title",' +
        '"children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__TITEL_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"material",' +
        '"children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__MATERIAL__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"material_type",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__MATERIAL_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"material_type",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"ggfs.__MATERIAL_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"measure","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__ANZAHL_BLÄTTER__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"measure_noOfLeaves",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__ANZAHL_BLÄTTER_NORMIERT","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"dimensions","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__GRÖSSE__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"height",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__HÖHE_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"width",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__BREITE_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"depth",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__TIEFE_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"dimensions_typeOfInformation",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__ABMESSUNGSART_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"origPlace","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__ENTSTEHUNGSORT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"origPlace_gnd-ID",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__GND_NUMMER__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"origPlace_gnd-ID",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__ggfs. andere_GND_NUMMER__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"origDate","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__ENTSTEHUNGSZEIT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"origDate_notBefore",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__ENTSTEHUNGSZEIT_NORMIERT__BEFORE","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"origDate_notAfter",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__ENTSTEHUNGSZEIT_NORMIERT__AFTER","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"origDate_type",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__DATIERUNGSART_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"textLang","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__GRUNDSPRACHE__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1},{"data_origin":"term","region":"head","data_type":"textLang-ID",' +
        '"children":\\[{"data_origin":"textelement","region":"head","children":\\[{"text":"__GRUNDSPRACHE_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"form","children":\\[{"text":"__FORMTYP_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"status","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__VERFÜGBARKEIT_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"decoration","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__ILLUMINIERT_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1},{"data_origin":"index","region":"head","data_indexName":"norm",' +
        '"children":\\[{"data_origin":"term","region":"head","data_type":"musicNotation","children":\\[{"data_origin":"textelement","region":"head",' +
        '"children":\\[{"text":"__MUSIKNOTATION_NORMIERT__","region":"head",' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement-undefined","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term-textelement","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index-term","level":1}\\],' +
        '"id":".*","path":"#document-TEI-text-body-msDesc-head-index","level":1}\\]')
    expect(JSON.stringify(component)).toEqual(componentMatch)
    expect(JSON.stringify(children)).toEqual(childrenMatch)

  })

  it('Create Components with Children and Wrapper Check for physDesc', () => {

    const { component, children } = createBeschreibungsComponents({
      children: [],
      copied: false,
      id: '3765bd63-4d9e-4fa2-ab4f-5bebce3faf0e',
      label: 'head',
      level: 1,
      parent: 'root',
      path: [0, 2, 0, 0, 0],
      teiElement: 'head',
      wrapperID: '',
      xmlpath: '#document-TEI-text-body-msDesc-head'
    }, 'medieval', 'physDesc', undefined, false)

    const componentMatch = expect.stringMatching('{"data_origin":"physDesc","region":"physDesc","component":"physDesc","copied":false,"id":".*","path":"#document-TEI-text-body-msDesc-physDesc","level":1}')
    // const childrenMatch = expect.stringMatching('\\[{"data_origin":"p","region":"physDesc","children":\\[{"data_origin":"textelement","text":"__ÄUßERES__","region":"physDesc","id":"c638b110-22c2-4f8d-adab-7b72da36aaad","path":"#document-TEI-text-body-msDesc-physDesc-p-textelement","level":1}\\],"id":"6c6f65df-0bf7-4c93-80a0-cf21d8e107f7","path":"#document-TEI-text-body-msDesc-physDesc-p","level":1}\\]')

    console.log(JSON.stringify(children))

    expect(JSON.stringify(component)).toEqual(componentMatch)
    // expect(JSON.stringify(component)).toEqual(childrenMatch)
  })

  it('Find position for component in sidebar', () => {

    const sidebar: Array<BeschreibungsKomponente> = JSON.parse('[{"id":"d47df4c4-3f17-4b63-bc0c-d9d16305ef47","label":"Identifikation","teiElement":"msIdentifier","children":[],"path":[0,1,0,0,0],"xmlpath":"#document-TEI-text-body-msDesc-msIdentifier","level":1,"parent":"root","wrapperID":""},{"id":"f3e105e1-8bb1-460c-8342-fdf6da954ff0","label":"Kopf","teiElement":"head","children":[],"path":[0,1,0,0,1],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-head","level":1,"parent":"root","wrapperID":""},{"id":"2f07625e-d43c-4bba-a81d-3012394e161a","label":"Inhalt","teiElement":"msContents","children":[{"id":"3e875415-7663-4614-a99e-ca83136c4671","label":"Abschnitt","teiElement":"msItem","children":[],"path":[0,1,0,0,2,0],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msContents-msItem","level":1,"parent":"2f07625e-d43c-4bba-a81d-3012394e161a","wrapperID":""},{"id":"72c9f069-d8f7-4dcd-8062-93310df037d6","label":"Abschnitt","teiElement":"msItem","children":[],"path":[0,1,0,0,2,1],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msContents-msItem","level":1,"parent":"2f07625e-d43c-4bba-a81d-3012394e161a","wrapperID":""},{"id":"a8a7350e-9fec-4318-a766-3fe704f3cd8e","label":"Abschnitt","teiElement":"msItem","children":[],"path":[0,1,0,0,2,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msContents-msItem","level":1,"parent":"2f07625e-d43c-4bba-a81d-3012394e161a","wrapperID":""}],"path":[0,1,0,0,2],"copied":false,"xmlpath":"#document-TEI-text-body-msDesc-msContents","level":1,"parent":"root","wrapperID":""}]')

    const position = findComponentPosition(sidebar, sidebar[2].children[2], TEI_ELEMENT_ITEM)

    expect(position).toEqual(3)
  })

  it('Check msContents is in allowedPredecessor for msPartbinding', () => {
    const beschreibung: BeschreibungsKomponente =
        {
          'id': '92d63071-49f8-43f7-92f3-2c554e020d45',
          'label': 'Identifikation',
          'teiElement': 'msIdentifier',
          'copied': false,
          'children': [],
          'path': [
            0,
            1,
            0,
            0,
            0
          ],
          'xmlpath': '#document-TEI-text-body-msDesc-msIdentifier',
          'level': 1,
          'parent': 'root',
          'wrapperID': ''
        }

    const existingComponets =
        [
          'msIdentifier',
          'msPartbinding'
        ]

    const forChilds = false

    const parent = undefined

    const beschreibungstyp = 'medieval'

    const beschreibungsKomponenteOptions = findAllowedComponentsForComponent(beschreibungstyp, beschreibung, existingComponets, forChilds, parent)

    expect(beschreibungsKomponenteOptions[1].element).toBe('msContents')

  })

})
