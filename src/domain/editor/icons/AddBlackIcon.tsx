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

import { SvgIcon } from '@mui/material'
import { memo } from 'react'

export const AddBlackIcon = memo(() => {
  return (
    <SvgIcon className={'svg-expand-icon'} viewBox="0 0 17 17" fill={'white'}>
      <path
        d="M13.4584 9.20832H9.20835V13.4583H7.79169V9.20832H3.54169V7.79166H7.79169V3.54166H9.20835V7.79166H13.4584V9.20832Z"
        fill="black"
      />
      <path
        d="M0 0V-1H-1V0H0ZM17 0H18V-1H17V0ZM17 17V18H18V17H17ZM0 17H-1V18H0V17ZM0 1H17V-1H0V1ZM16 0V17H18V0H16ZM17 16H0V18H17V16ZM1 17V0H-1V17H1Z"
        fill="#DEDAD5"
      />
    </SvgIcon>
  )
})
