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
import { XML_ATTRIBUTE_PREFIX, XML_TAG_ORIGIN } from '../../infrastructure/Constants'

function readXMLAttributes(element: HTMLElement) {
  return Object.entries(element).filter(function ([attributeName]: any) {
    return attributeName.startsWith(XML_ATTRIBUTE_PREFIX)
  })
    .map(function ([attributeName, attributeValue]: any) {
      if (attributeName === XML_TAG_ORIGIN) {
        return attributeValue
      } else {
        return attributeName.replace(XML_ATTRIBUTE_PREFIX, '') + '=' + attributeValue
      }
    }).join(' ')
}

export function TEIXMLElement(props: any, cls: Record<any, any>) {
  return (<span {...props.attributes}>
          <span contentEditable={false} className={props.element.showtei ? cls.teiEnabled : cls.teiDisabled}
                data-testid={props.test ? 'tei' : undefined}>
            <span className={cls.xmlTag} contentEditable={false}>
              &lt;{readXMLAttributes(props.element)}&gt;
            </span>
          </span>
    {props.children}
    <span contentEditable={false} className={props.element.showtei ? cls.teiEnabled : cls.teiDisabled}>
                <span className={cls.xmlTag} contentEditable={false}>&lt;/{props.element.data_origin}&gt;</span>
            </span>
    </span>)
}
