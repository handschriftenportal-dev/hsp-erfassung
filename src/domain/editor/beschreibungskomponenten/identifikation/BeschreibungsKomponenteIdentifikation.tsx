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

import i18next from 'i18next'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectReadOnly } from '../../../erfassung/ErfassungsState'
import { AddElementButtonForIdentification } from './AddElementButtonForIdentification'
import { Grid } from '@material-ui/core'
import { SimpleAccordion } from '../../SimpleAccordion'
import { MsIdentifikationSimpleWithBaseElements } from './MsIdentifikationSimpleWithBaseElements'
import { isNodeInComponent } from '../../../../infrastructure/slate/SlateBoundary'
import { useSlateStatic } from 'slate-react'
import { TEI_ELEMENT_PART_OTHER } from '../BeschreibungsKomponenteSonstiges'
import { HiddenElement } from '../../HiddenElement'

export const TEI_ELEMENT_IDENTIFICATION = 'msIdentifier'
export const TEI_ELEMENT_MSDESC_IDENTIFICATION = 'msDesc-msIdentifier'
export const TEI_ELEMENT_MSPART_IDENTIFICATION = 'msPart-msIdentifier'
export const TEI_ELEMENT_SETTLEMENT = 'settlement'
export const TEI_ELEMENT_REPOSITORY = 'repository'
export const TEI_ELEMENT_COLLECTION = 'collection'
export const TEI_ELEMENT_ALT_IDENTIFIER = 'altIdentifier'
export const TEI_ELEMENT_IDNO = 'idno'
export const VORBESITZER_DATA_TYPE = 'former'
export const SAMMLUNG_DATA_TYPE = 'corpus'
export const HSP_ID_DATA_TYPE = 'hsp-ID'
export const MXML_ID_DATA_TYPE = 'mxml-ID'

interface BeschreibungsKomponenteIdentifikationProps {
  element: any
  children: Array<any>
  attributes: Array<any>
  cls: any
}

export const BeschreibungsKomponenteIdentifikation = React.memo(({
  element,
  children,
  attributes,
  cls
}: BeschreibungsKomponenteIdentifikationProps) => {

  const readOnly = useSelector(selectReadOnly)
  const editor = useSlateStatic()

  if (element && element.path && (element.path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) || element.path.includes(TEI_ELEMENT_MSPART_IDENTIFICATION))) {

    if (isNodeInComponent(editor, element, TEI_ELEMENT_PART_OTHER)) {
      return <HiddenElement></HiddenElement>
    }

    let formerReactElements
    let coprusReactElements
    let allOtherReactElements

    try {
      formerReactElements = (children.filter((child) => child.props.children.props.element.data_type === VORBESITZER_DATA_TYPE))
    } catch (e) {
      formerReactElements = null
    }

    try {
      coprusReactElements = (children.filter((child) => child.props.children.props.element.data_type === SAMMLUNG_DATA_TYPE))
    } catch (e) {
      coprusReactElements = null
    }

    try {
      allOtherReactElements = (children.filter((child) => child.props.children.props.element.data_type !== SAMMLUNG_DATA_TYPE && child.props.children.props.element.data_type !== VORBESITZER_DATA_TYPE))
    } catch (e) {
      allOtherReactElements = null
    }

    const header = <div>
      <h3 className={element && element.istop ? cls.istop : ''}>{i18next.t('sidebar.identification')}</h3>
    </div>

    const content = <div style={{ display: 'block' }}>
      <div className={'small-bottom-gab'}>{allOtherReactElements}</div>
      {children.filter((child) => child.props.children.props.element.data_origin === TEI_ELEMENT_SETTLEMENT).length === 0 &&
        <Grid style={{ marginBottom: '12px', justifyContent: 'end' }} item xs={10} container contentEditable={false}>
          <Grid className={'small-bottom-gab'} item xs={3}>
            <AddElementButtonForIdentification dataOrigin={TEI_ELEMENT_SETTLEMENT}
                                               msIdentifierChildren={element.children}
                                               dataTypeToAdd={''}
                                               path={element.path}
                                               buttonLabel={i18next.t('editor.add_settlement')}
                                               buttonClass={'override-grey-bottom-color'}/>
          </Grid>
        </Grid>
      }
      {children.filter((child) => child.props.children.props.element.data_origin === TEI_ELEMENT_REPOSITORY).length === 0 &&
        <Grid style={{ marginBottom: '12px', justifyContent: 'end' }} item xs={10} container contentEditable={false}>
          <Grid className={'small-bottom-gab'} item xs={3}>
            <AddElementButtonForIdentification dataOrigin={TEI_ELEMENT_REPOSITORY}
                                               msIdentifierChildren={element.children}
                                               dataTypeToAdd={''}
                                               path={element.path}
                                               buttonLabel={i18next.t('editor.add_repository')}
                                               buttonClass={'override-grey-bottom-color'}/>
          </Grid>
        </Grid>
      }
      {element.path.includes(TEI_ELEMENT_MSDESC_IDENTIFICATION) && <>
        <span>{coprusReactElements}</span>
        <Grid style={{ marginBottom: '12px', justifyContent: 'end' }} item xs={10} container contentEditable={false}>
          <Grid className={'mid-bottom-gab'} item xs={3}>
            <AddElementButtonForIdentification dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
                                               msIdentifierChildren={element.children}
                                               dataTypeToAdd={SAMMLUNG_DATA_TYPE}
                                               path={element.path}
                                               buttonLabel={i18next.t('editor.add_corpus')}
                                               buttonClass={'override-bottom-color align-button-right-fit-content-color-white'}/>
          </Grid>
        </Grid>
      </>
      }
      <span>{formerReactElements}</span>
      <Grid style={{ marginBottom: '12px', justifyContent: 'end' }} item xs={10} container contentEditable={false}>
        <Grid className={'mid-bottom-gab'} item xs={3}>
          <AddElementButtonForIdentification msIdentifierChildren={element.children}
                                             dataOrigin={TEI_ELEMENT_ALT_IDENTIFIER}
                                             dataTypeToAdd={VORBESITZER_DATA_TYPE}
                                             path={element.path}
                                             buttonLabel={i18next.t('editor.add_vorbesitzer_signatur')}
                                             buttonClass={'override-bottom-color align-button-right-fit-content-color-white'}/>
        </Grid>
      </Grid>
    </div>

    return (
        <section id={element.id}>
          <div contentEditable={false}>
            <hr/>
          </div>
          {!readOnly
            ? <>
                <SimpleAccordion node={element} summaryContent={header} detailsContent={content}/>
              </>
            : <>
                <div contentEditable={false}>
                  <h3 className={element && element.istop ? cls.istop : ''}>{i18next.t('sidebar.identification')}</h3>
                </div>
                <span>{allOtherReactElements}</span>
                <span>{coprusReactElements}</span>
                <span>{formerReactElements}</span>
              </>}
        </section>
    )
  }

  return <MsIdentifikationSimpleWithBaseElements element={element} attributes={attributes} children={children}
                                                 cls={cls}></MsIdentifikationSimpleWithBaseElements>
})
