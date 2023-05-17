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
import ApartmentIcon from '@material-ui/icons/Apartment'
import PersonIcon from '@material-ui/icons/Person'
import PlaceIcon from '@material-ui/icons/Place'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import LanguageIcon from '@material-ui/icons/Language'
import NotesIcon from '@material-ui/icons/Notes'
import { SvgIcon } from '@material-ui/core'
import NoteIcon from '@material-ui/icons/Note'

interface NormdatenIconProps {
  style?: React.CSSProperties
}

const iconColor = '#00838B'

export const NormdatenIconPerson = React.memo(({ style }: NormdatenIconProps) => {
  return (<PersonIcon style={style} htmlColor={iconColor}/>)
})

export const NormdatenIconKoerperschaft = React.memo(({ style }: NormdatenIconProps) => {
  return (<ApartmentIcon style={style} htmlColor={iconColor}/>)
})

export const NormdatenIconOrt = React.memo(({ style }: NormdatenIconProps) => {
  return (<PlaceIcon style={style} htmlColor={iconColor}/>)
})

export const NormdatenIconWerk = React.memo(({ style }: NormdatenIconProps) => {
  return (<MenuBookIcon style={style} color={'disabled'}/>)
})

export const NormdatenIconMaterial = React.memo(({ style }: NormdatenIconProps) => {
  return (<NoteIcon style={style} color={'disabled'}/>)
})

export const NormdatenIconSprache = React.memo(({ style }: NormdatenIconProps) => {
  return (<LanguageIcon style={style} color={'disabled'}/>)
})

export const NormdatenIconSchrift = React.memo(({ style }: NormdatenIconProps) => {
  return (
      <SvgIcon style={style} color={'disabled'}>
        <path
            d="M3.4089 11.4926C5.0045 13.2992 7.7142 13.9014 9.8221 13.9014C10.4804 13.8717 11.1033 13.5948 11.5663 13.1259C12.0294 12.6571 12.2985 12.0308 12.32 11.3722C12.32 9.59558 10.6643 9.38468 8.9782 9.20428L5.0042 8.81298C2.7156 8.57208 1.33 7.54808 1.33 5.68158C1.33 1.82748 7.2016 0.833984 9.7913 0.833984C11.0862 0.833984 15.2105 1.04398 15.2105 2.48968C15.2105 2.97138 14.7898 3.21228 13.7053 3.90498L11.929 5.04888C12.0931 4.68892 12.1852 4.30031 12.2 3.90498C12.2 2.52018 10.9956 1.73698 8.8582 1.73698C7.79242 1.76631 6.74104 1.99075 5.7562 2.39918C5.42414 2.66736 5.1569 3.00703 4.97441 3.39287C4.79191 3.77871 4.69886 4.20077 4.7022 4.62758C4.7022 5.74148 5.2744 6.22328 7.6832 6.49408L11.7182 6.91588C14.0365 7.15679 15.6628 7.63858 15.6922 9.68588C15.7071 10.3815 15.533 11.0682 15.1884 11.6727C14.8439 12.2772 14.3418 12.777 13.7357 13.1187C10.3035 14.7443 9.1896 15.1656 7.2919 15.1656C3.7093 15.1656 2.3839 14.7743 0.306396 13.6304L3.4089 11.4926Z"
            fill="#BABABA"/>
      </SvgIcon>
  )
})

export const NormdatenIconInitium = React.memo(({ style }: NormdatenIconProps) => {
  return (<NotesIcon style={style} color={'disabled'}/>)
})

interface NormdatenIconFactoryProps {
  type: 'person' | 'corporatebody' | 'place' | 'work' | 'language' | 'materialtype' | 'font' | 'initium'
  style?: React.CSSProperties
}

export const NormdatenIconFactory = React.memo((props: NormdatenIconFactoryProps) => {
  switch (props.type) {
    case 'person':
      return <NormdatenIconPerson style={props.style}/>

    case 'corporatebody':
      return <NormdatenIconKoerperschaft style={props.style}/>

    case 'place':
      return <NormdatenIconOrt style={props.style}/>

    case 'work':
      return <NormdatenIconWerk style={props.style}/>

    case 'language':
      return <NormdatenIconSprache style={props.style}/>

    case 'materialtype':
      return <NormdatenIconMaterial style={props.style}/>

    case 'font':
      return <NormdatenIconSchrift style={props.style}/>

    case 'initium':
      return <NormdatenIconInitium style={props.style}/>

    default:
      return <></>
  }
})
