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
import { NormdatenTEIElement } from './NormdatenTEIElement'
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { erfassungNormdatenTEIElement } from '../../erfassung/ErfassungNormdatenTEIElement'
import { createUUID } from '../../../infrastructure/XMLConverter'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { GNDEntity } from '../../../infrastructure/normdaten/GNDEntity'
import { useFindGNDEntitiesByNode } from './useNormdaten'
import InputAdornment from '@material-ui/core/InputAdornment'

export const DNB_INFO_GND_URL = 'http://d-nb.info/gnd/'
const numberOfCharactersBeforeSearch = 1

interface NormdatenFormProps {
  normdatenurl: string,
  gndEntity: GNDEntity,
  normdatenTEIElement: NormdatenTEIElement

  setNormdatenTEIElement(normdatenTEIElement: NormdatenTEIElement): void
  setGndEntity(gndEntity: GNDEntity): void
}

export const NormdatenForm = React.memo((props : NormdatenFormProps) => {

  const { t } = useTranslation()

  function normdatenTextField() {

    const handleNormdatenTextChange = (event: any) => {
      const normdatenTEIElementShallowCopy = { ...props.normdatenTEIElement }
      normdatenTEIElementShallowCopy.normdatenText = event.target.value
      props.setNormdatenTEIElement(normdatenTEIElementShallowCopy)
    }

    return <TextField id={'normdatenTextField'}
                      autoFocus={true}
                      style={{
                        margin: 20,
                        width: '65vw'
                      }} label={t('normdatenDialog.normdaten_text')}
                      onChange={handleNormdatenTextChange}
                      defaultValue={props.normdatenTEIElement.normdatenText}/>
  }

  function roleSelection() {

    const handleRoleSelectionChange = (event: any) => {
      const normdatenTEIElementShallowCopy = { ...props.normdatenTEIElement }
      normdatenTEIElementShallowCopy.role = event.target.value
      props.setNormdatenTEIElement(normdatenTEIElementShallowCopy)
    }

    function getSelectRoleElement() {
      return <><InputLabel id="BeziehungLabel"
                           style={{
                             marginLeft: '20px',
                             marginTop: '20px',
                             fontSize: '0.8em'
                           }}>{t('normdatenDialog.rolle')}</InputLabel>
        <Select id={'SelectRole'}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left'
                  },
                  getContentAnchorEl: null
                }} onChange={handleRoleSelectionChange} style={{
                  margin: 20,
                  marginTop: 5,
                  width: '65vw'
                }} labelId="BeziehungLabel" value={props.normdatenTEIElement.role}>
          {
            props.normdatenTEIElement.dataOrigin === 'placeName' &&
            erfassungNormdatenTEIElement.placeNameValues.map((valueStr) => <MenuItem key={createUUID()}
                                                                                     value={valueStr}>{t('normdatenRole.' + valueStr)}</MenuItem>)
          }
          {
            props.normdatenTEIElement.dataOrigin === 'persName' &&
            erfassungNormdatenTEIElement.persNameValues.map((valueStr) => <MenuItem key={createUUID()}
                                                                                    value={valueStr}>{t('normdatenRole.' + valueStr)}</MenuItem>)
          }
          {
            props.normdatenTEIElement.dataOrigin === 'orgName' &&
            erfassungNormdatenTEIElement.orgNameValues.map((valueStr) => <MenuItem key={createUUID()}
                                                                                   value={valueStr}>{t('normdatenRole.' + valueStr)}</MenuItem>)
          }
        </Select></>
    }

    return getSelectRoleElement()
  }

  const concatenatedVariantName = React.useCallback((variantName: any) => {
    return (variantName)
      ? variantName.map(function (variantNameParam: any) {
        return variantNameParam.name
      })
      : ''
  }, [])

  function normDatenAutocompleteSearch() {

    const [gndEntities, setGndEntities] = React.useState<GNDEntity[]>([])

    return <Autocomplete
        id="editNormdaten"
        disabled={false}
        options={gndEntities.sort((entity1, entity2) => {
          return entity1.preferredName.localeCompare(entity2.preferredName)
        })}
        value={props.gndEntity}
        getOptionSelected={() => true}
        clearOnEscape={false}
        clearOnBlur={false}
        getOptionLabel={(option: GNDEntity) => (option) ? option.preferredName : ''}
        onInputChange={(event, value: string) => {
          if (value && value.length > numberOfCharactersBeforeSearch) {
            useFindGNDEntitiesByNode(props.normdatenurl, props.normdatenTEIElement.dataOrigin, setGndEntities, value)
          }
        }
        }
        onChange={(event, value) => {
          event.preventDefault()
          props.setGndEntity((value) || {
            preferredName: '',
            gndIdentifier: ''
          } as GNDEntity)
          const normdatenTEIElementShallowCopy = { ...props.normdatenTEIElement }
          normdatenTEIElementShallowCopy.gndIdentifierOption = (value) ? value.gndIdentifier : ''
          props.setNormdatenTEIElement(normdatenTEIElementShallowCopy)
        }}

        filterOptions={createFilterOptions({
          matchFrom: 'any',
          stringify: (option: GNDEntity) => {
            return option.preferredName + concatenatedVariantName(option.variantName)
          }
        })}
        renderOption={(option) => (
            <React.Fragment>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <div>{option.preferredName}</div>
                <div>
                  <a onClick={(event) => {
                    event.stopPropagation()
                    window.open(DNB_INFO_GND_URL + option.gndIdentifier, '_blank')
                  }}>{option.gndIdentifier}</a>
                </div>
              </div>
            </React.Fragment>
        )}
        renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <TextField
                  {...params}
                  style={{
                    margin: 20,
                    width: '65vw'
                  }}
                  label={t('normdatenDialog.normdaten_verknüfpung')}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                          {((props.normdatenTEIElement.gndIdentifierOption !== '') && props.normdatenTEIElement.gndIdentifierOption !== 'null') &&
                          <InputAdornment position="end">
                              <span><a target="_blank"
                                       href={DNB_INFO_GND_URL + props.normdatenTEIElement.gndIdentifierOption}>{props.normdatenTEIElement.gndIdentifierOption}</a></span>
                          </InputAdornment>}
                        </>
                    )
                  }}
              />
            </div>
        )}
    />
  }

  return (<>
    {normdatenTextField()}
    {normDatenAutocompleteSearch()}
    {roleSelection()}
  </>)

})
