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
import { Grid, Link } from '@material-ui/core'
import { NoneEditableTwoColumnElementJSX } from '../../NoneEditableTwoColumnElementJSX'
import { useSelector } from 'react-redux'
import { selectReadOnly, selectStandalone } from '../../../erfassung/ErfassungsState'

interface IndoSimpleWithLinkProps {
  props: any
  title: string
  link: string
}

export const IndoSimpleWithLink = React.memo(({ props, title, link }: IndoSimpleWithLinkProps) => {

  const readOnly = useSelector(selectReadOnly)
  const standalone = useSelector(selectStandalone)

  const hspId = React.useMemo(() => {

    return (
      standalone
        ? props.element.children[0].children[0].text
        : <Link style={{ color: '#006FE3' }} href={link}
                    target={'blank'}>{props.element.children[0].children[0].text}</Link>)
  }, [])

  return <Grid container contentEditable={false}>
    {readOnly
      ? <NoneEditableTwoColumnElementJSX title={title}
                                           children={hspId}/>
      : <>
          {standalone
            ? <NoneEditableTwoColumnElementJSX title={title}
                                                 children={hspId}/>
            : <Grid className={'small-bottom-gab'} container>
                <Grid contentEditable={false} item xs={3} style={{ display: 'table' }}>
                      <span
                          style={{ display: 'table-cell', verticalAlign: 'middle' }}>{title}: </span>
                </Grid>
                <Grid item xs={7} contentEditable={false}>
                  <Link style={{
                    color: '#006FE3',
                    display: 'flex',
                    width: 'inherit',
                    padding: '27px 12px 10px',
                    backgroundColor: 'rgba(79, 77, 75, 0.04)'
                  }} href={link} role={'link'}
                        target={'blank'}>{props.element.children[0].children[0].text}</Link>
                </Grid>
              </Grid>
          }
        </>
    }
  </Grid>
})
