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

import { createBeschreibung, deserialize } from '../XMLConverter'
import { LoremIpsum } from 'lorem-ipsum'
import { updateBeschreibung, updateComponentChangedHistory, updateSlate } from '../../domain/erfassung/ErfassungsState'
import axios, { AxiosResponse } from 'axios'
import { TEXT_XML } from '../MimeTypes'
import i18n from 'i18next'
import { ChangedComponent, INITIAL_LOAD } from '../../domain/erfassung/ChangedComponent'


export const BeschreibungBearbeitenEvent = 'BeschreibungBearbeitenEvent'
export const BeschreibungLesenEvent = 'BeschreibungLesenEvent'
export const BeschreibungSpeichernEvent = 'BeschreibungSpeichernEvent'
export const BeschreibungAktualisierenEvent = 'BeschreibungAktualisierenEvent'

export interface NachweisSperren {
  id: string
  bearbeiter: {
    id: string
    rolle: string
  }
}

export type NachweisSperrenCallback = (sperren: Array<NachweisSperren> | null) => void

export const sendNachweisEventToDocument = (eventType: string, paylod: any) => {

  const beschreibungSchreibenEvent = new CustomEvent(eventType, {
    detail: paylod,
    bubbles: true,
    cancelable: false,
    composed: false,
  })

  console.log('Dispatch Event to Nachweis ' + eventType)
  document.dispatchEvent(beschreibungSchreibenEvent)
}

export const speichern = (url: any, data: any, nachweisCallback: any) => {
  console.log('Speichern vom XML')
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/xml;charset=UTF-8',
      'Accept-Language': i18n.language
    }
  }

  axios.post(url, data, axiosConfig).then(function (response) {
    console.log('Response after Update')
    nachweisCallback(response.data)
  }).catch(function (error) {
    console.log(error)
    nachweisCallback({
      success: false,
      message: error,
      level: 'error'
    })
  })
}

export const findKODSignaturen: any = (url: string, dispatch: any) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }

  axios.get(url + '/signaturen', axiosConfig).then(function (response) {
    return response.data
  }).then(function (signaturen) {
    console.log('Found KOD Signaturen')
    console.log(signaturen)
    if (signaturen) {
      dispatch(updateBeschreibung({ kodsignaturen: signaturen }))
    }

  }).catch(function (error) {
    console.warn('Something went wrong.', error)
  })
}

export const findBeschreibungSperren: any = (url: string, callback: NachweisSperrenCallback) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }

  axios.get(url + '/sperren', axiosConfig).then(function (response: AxiosResponse<Array<NachweisSperren>>) {
    return response.data
  }).then(function (sperren) {
    console.log('Found Sperren')
    if (sperren) {
      callback(sperren)
    }

  }).catch(function (error) {
    console.warn('Something went wrong.', error)
    callback(null)
  })
}

export const fetchDataFromNachweis: any = (url: string, dispatch: any, setLoadSidebar: any, loadSidebar: boolean) => {

  axios.get(url).then(function (response) {
    return response.data
  }).then(function (xml) {
    console.log('Getting Data from Backend')
    xml = xml.replace(/>[\n\r\s]+</g, '><')

    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, TEXT_XML)
    const fragment = deserialize(doc, 'TEI', '', 'medieval')

    if (fragment) {
      dispatch(updateSlate(fragment))
      dispatch(updateComponentChangedHistory({ dataOrigin: INITIAL_LOAD, method: INITIAL_LOAD, id: 'Initial fragment load' }as ChangedComponent))
      setLoadSidebar(!loadSidebar)
      createBeschreibung(fragment, dispatch)
    }

  }).catch(function (error) {
    console.warn('Something went wrong.', error)
    const errorMessage: Array<any> = [{
      data_origin: 'error',
      children: [{ text: 'Error during loading document ' + error }]
    }]
    dispatch(updateSlate(errorMessage))
    dispatch(updateComponentChangedHistory({ dataOrigin: INITIAL_LOAD, method: INITIAL_LOAD, id: 'Initial fragment load error' }as ChangedComponent))
  })
}

export const validateTEI: any = (validationUrl: string, data: any, dispatch: any, nachweisCallback: any, withODD: boolean) => {

  const axiosConfig: any = {
    headers: {
      'Content-Type': 'application/xml;charset=UTF-8',
      'Accept-Language': i18n.language
    } as any
  }

  if (withODD) {
    axiosConfig.headers['de.staatsbibliothek.berlin.hsp.schema'] = 'ODD'
  }

  axios.post(validationUrl, data, axiosConfig).then(function (response) {
    console.log('Response after validation')
    console.log(response.data)
    nachweisCallback(response.data)
  }).catch(function (error) {
    console.log(error)
    nachweisCallback({
      success: false,
      message: error.message,
      level: 'error'
    })
  })
}

export const testText = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 5
  },
  wordsPerSentence: {
    max: 20,
    min: 20
  }
})
