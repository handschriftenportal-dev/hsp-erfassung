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
import { CSSProperties, FC, memo } from 'react'

interface Props {
  style?: CSSProperties
}

export const SonderzeichenIcon: FC<Props> = memo((props) => {
  return (
    <SvgIcon {...props}>
      <path d="M7 10.8587C7 9.46688 7.34434 8.16686 8.03207 6.95661C8.71981 5.74636 9.60425 4.78521 10.6832 4.0708C11.763 3.3582 12.8475 3 13.9385 3C14.7291 3 15.124 3.30347 15.124 3.90678C16.1929 4.06899 16.9393 4.50486 17.3636 5.21566C17.7879 5.92645 18 6.82619 18 7.91632C18 9.05413 17.7916 10.1054 17.3747 11.0686C16.9578 12.0335 16.2599 12.9667 15.2829 13.8698C14.3059 14.773 12.9984 15.3445 11.3592 15.5844C11.3079 16.0696 11.271 16.9198 11.249 18.137C11.227 19.3524 11.2306 20.215 11.2601 20.7213C11.2748 20.9064 11.0369 21 10.5466 21C10.0563 21 9.80736 20.8978 9.80002 20.6931C9.79269 20.0246 9.78893 19.2377 9.78893 18.3293C9.78893 17.4225 9.8587 16.4753 9.9973 15.491C9.34624 15.2864 8.68332 14.7959 8.01026 14.0181C7.33719 13.2419 7 12.1887 7 10.8587ZM12.8511 5.61594C11.3368 5.45373 10.1276 5.92826 9.22306 7.03771C8.31943 8.14735 7.86771 9.26041 7.86771 10.3735C7.86771 11.3543 8.14961 12.0863 8.71247 12.5732C9.27628 13.0601 9.82165 13.3017 10.3488 13.3017C10.5829 12.215 10.784 11.3614 10.9521 10.7369C11.1202 10.1125 11.3543 9.32743 11.6545 8.38199C11.9548 7.43475 12.3535 6.51369 12.8511 5.61594ZM11.5783 13.3599C13.649 13.3599 15.0283 12.9453 15.717 12.1162C16.4047 11.2871 16.7481 10.1052 16.7481 8.56714C16.7481 7.90566 16.6315 7.32004 16.3974 6.81192C16.1632 6.30217 15.7711 6.04802 15.2229 6.04802C14.4617 6.04802 13.7886 6.60184 13.2028 7.70967C12.617 8.8175 12.222 9.78768 12.0173 10.6202C11.8125 11.4546 11.6656 12.3668 11.5783 13.3599Z" />
    </SvgIcon>
  )
})
