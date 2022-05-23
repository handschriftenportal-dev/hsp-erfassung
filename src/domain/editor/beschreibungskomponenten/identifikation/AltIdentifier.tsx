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

import React from 'react'
import {
  SAMMLUNG_DATA_TYPE,
  TEI_ELEMENT_COLLECTION,
  TEI_ELEMENT_IDNO,
  TEI_ELEMENT_MSDESC_IDENTIFICATION,
  TEI_ELEMENT_MSPART_IDENTIFICATION,
  TEI_ELEMENT_REPOSITORY,
  TEI_ELEMENT_SETTLEMENT,
  VORBESITZER_DATA_TYPE
} from './BeschreibungsKomponenteIdentifikation'
import { Grid } from '@material-ui/core'
import i18next from 'i18next'
import { useSelector } from 'react-redux'
import { selectReadOnly } from '../../../erfassung/ErfassungsState'
import { BaseElement } from '../../BaseElement'
import { TitleTwoColumnElement } from '../../TitleTwoColumnElement'
import { AddErfassungElementChildrenNodeButton } from '../AddErfassungElementChildrenNodeButton'
import { useInsertNewTEINodeForAltIdentifier } from '../identifikation/IdentificationCustomHooks'

/**
 * Author: Christoph Marten on 28.12.2021 at 08:11
 */

export const AltIdentifier = React.memo((props: any) => {

  if (props.element && props.element.path && (props.element.path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) ||
      props.element.path.includes(TEI_ELEMENT_MSPART_IDENTIFICATION))) {

    const readOnly = useSelector(selectReadOnly)

    if (props.element.data_type === SAMMLUNG_DATA_TYPE) {

      let showAddCorpusName
      let insertNewCorpusName
      try {
        const collectionReactElement = (props.children.filter((child: any) => child.props.children.props.element.data_origin === TEI_ELEMENT_COLLECTION))
        const idnoReactElement = (props.children.filter((child: any) => child.props.children.props.element.data_origin === TEI_ELEMENT_IDNO))
        const idnoElement = idnoReactElement[0].props.children.props.element
        insertNewCorpusName = useInsertNewTEINodeForAltIdentifier(props.element.data_type, idnoElement, 0, 0)
        showAddCorpusName = collectionReactElement.length === 0
      } catch (e) {
        showAddCorpusName = false
      }

      return <Grid className={'small-bottom-gab'} container>
        <TitleTwoColumnElement element={props.element} title={i18next.t('editor.corpus')} showDelete={!readOnly}
                               margin={true} bold={!readOnly}/>
        {!readOnly
          ? <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
              <span>{props.children}</span>
              {showAddCorpusName && <Grid item xs={10}>
                <AddErfassungElementChildrenNodeButton insertNewErfassungElementChildrenNode={insertNewCorpusName}
                                                       buttonLabel={i18next.t('editor.corpus_name')}/>
              </Grid>}
            </Grid>
          : <Grid item xs={12}>
              <span>{props.children}</span>
            </Grid>
        }
      </Grid>
    }

    if (props.element.data_type === VORBESITZER_DATA_TYPE) {

      let showAddPlace
      let showAddInstitution
      let insertNewSettlement
      let insertNewRepository

      try {
        const settlementReactElement = (props.children.filter((child: any) => child.props.children.props.element.data_origin === TEI_ELEMENT_SETTLEMENT))
        const repositoryReactElement = (props.children.filter((child: any) => child.props.children.props.element.data_origin === TEI_ELEMENT_REPOSITORY))

        const idnoReactElement = (props.children.filter((child: any) => child.props.children.props.element.data_origin === TEI_ELEMENT_IDNO))
        const idnoElement = idnoReactElement[0].props.children.props.element
        showAddPlace = settlementReactElement.length === 0
        showAddInstitution = repositoryReactElement.length === 0
        insertNewSettlement = useInsertNewTEINodeForAltIdentifier(props.element.data_type, idnoElement, 0, 0)

        if (!showAddPlace) {
          insertNewRepository = useInsertNewTEINodeForAltIdentifier(props.element.data_type, idnoElement, 1, 1)
        } else {
          insertNewRepository = useInsertNewTEINodeForAltIdentifier(props.element.data_type, idnoElement, 0, 1)
        }

      } catch (e) {
        showAddPlace = false
        showAddInstitution = false
      }

      return <Grid className={'small-bottom-gab'} container>
        <TitleTwoColumnElement element={props.element} title={i18next.t('editor.former_signature')}
                               showDelete={!readOnly}
                               margin={true} bold={!readOnly}/>
        {!readOnly
          ? <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
              <span>{props.children}</span>
              {showAddPlace &&
                <Grid className={'small-bottom-gab'} container>
                  <Grid item xs={10}>
                    <AddErfassungElementChildrenNodeButton insertNewErfassungElementChildrenNode={insertNewSettlement}
                                                           buttonLabel={i18next.t('editor.place')}/>
                  </Grid>
                </Grid>}
              {showAddInstitution &&
                <Grid className={'small-bottom-gab'} container>
                  <Grid item xs={10}>
                    <AddErfassungElementChildrenNodeButton insertNewErfassungElementChildrenNode={insertNewRepository}
                                                           buttonLabel={i18next.t('editor.institution')}/>
                  </Grid>
                </Grid>}
            </Grid>
          : <Grid item xs={12}>
              <span>{props.children}</span>
            </Grid>
        }
      </Grid>
    }

    return <Grid item xs={12}>
      <span>{props.children}</span>
    </Grid>
  }

  return <BaseElement children={props.children} attributes={props.attributes}/>
})
