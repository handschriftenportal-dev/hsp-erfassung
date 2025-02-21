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
import { FC } from 'react'

interface Props {
  color?: 'white' | 'black'
}

export const TextDecorationIcon: FC<Props> = ({ color = 'black' }) => {
  return (
    <SvgIcon fill={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5803 4C13.0253 4 13.4545 4.16566 13.7841 4.46474C13.9425 4.61407 14.0686 4.79417 14.1548 4.99401C14.2411 5.19385 14.2855 5.40921 14.2855 5.62686C14.2855 5.8445 14.2411 6.05985 14.1548 6.25969C14.0686 6.45953 13.9425 6.63964 13.7841 6.78896C13.4569 7.0903 13.0287 7.25801 12.5839 7.25897C12.1391 7.25992 11.7101 7.09406 11.3816 6.79413C11.2237 6.6442 11.0978 6.46378 11.0116 6.26377C10.9254 6.06377 10.8807 5.84834 10.8803 5.63056C10.8798 5.41277 10.9235 5.19716 11.0088 4.99677C11.094 4.79638 11.2191 4.61538 11.3764 4.46474C11.706 4.16566 12.1352 4 12.5803 4ZM9.26117 11.3225L9.69972 9.22248H13.7421L12.0467 18.3028H13.4809L13.0878 20.41L11.6545 20.4064L11.6536 20.41H9L9.00089 20.4028H9L9.01337 20.3405L10.6918 11.3225H9.26117Z"
      />
    </SvgIcon>
  )
}
