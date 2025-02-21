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

import { Grid } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RenderElementProps } from 'slate-react'

import { selectReadOnly } from '../../erfassung/ErfassungsState'
import { TEI_ELEMENT_TEXT_LANG_ELEMENT } from '../../erfassung/TEIConstants'
import { AddTextLangButton } from '../beschreibungselemente/AddTextLangButton'

interface Props extends Pick<RenderElementProps, 'children' | 'element'> {}

export const WithTextLangButtonIfNeeded: FC<Props> = ({
  children,
  element,
}) => {
  const { t } = useTranslation()

  const readOnly = useSelector(selectReadOnly)
  const isTextLangWithin = children.some(
    (child: any) =>
      child?.props?.children?.props?.element?.data_origin ===
      TEI_ELEMENT_TEXT_LANG_ELEMENT
  )

  return !readOnly && !isTextLangWithin ? (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid style={{ float: 'left', marginBottom: '32px' }}>
            <AddTextLangButton
              element={element}
              text={t('editor.create_language')}
            />
          </Grid>
        </Grid>
      </Grid>
      {children}
    </>
  ) : (
    <>{children}</>
  )
}
