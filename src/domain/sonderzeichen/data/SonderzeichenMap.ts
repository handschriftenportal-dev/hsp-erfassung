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

import { Sonderzeichen } from '../Sonderzeichen'

export const SonderzeichenMap: Record<string, Sonderzeichen> = {
  'U+FFFD': {
    codepoint: 0xfffd,
    sign: '\u{FFFD}',
    description: 'REPLACEMENT CHARACTER',
  },
  'U+2022': {
    codepoint: 0x2022,
    sign: '\u{2022}',
    description: 'BULLET',
  },
  'U+00AB': {
    codepoint: 0x00ab,
    sign: '\u{00AB}',
    description: 'LEFT-POINTING DOUBLE ANGLE QUOTATION MARK',
  },
  'U+00BB': {
    codepoint: 0x00bb,
    sign: '\u{00BB}',
    description: 'RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK',
  },
  'U+2039': {
    codepoint: 0x2039,
    sign: '\u{2039}',
    description: 'SINGLE LEFT-POINTING ANGLE QUOTATION MARK',
  },
  'U+203A': {
    codepoint: 0x203a,
    sign: '\u{203A}',
    description: 'SINGLE RIGHT-POINTING ANGLE QUOTATION MARK',
  },
  'U+2026': {
    codepoint: 0x2026,
    sign: '\u{2026}',
    description: 'HORIZONTAL ELLIPSIS',
  },
  'U+00D7': {
    codepoint: 0x00d7,
    sign: '\u{00D7}',
    description: 'MULTIPLICATION SIGN',
  },
  'U+2013': {
    codepoint: 0x2013,
    sign: '\u{2013}',
    description: 'EN DASH',
  },
  'U+2018': {
    codepoint: 0x2018,
    sign: '\u{2018}',
    description: 'LEFT SINGLE QUOTATION MARK',
  },
  'U+2019': {
    codepoint: 0x2019,
    sign: '\u{2019}',
    description: 'RIGHT SINGLE QUOTATION MARK',
  },
  'U+201E': {
    codepoint: 0x201e,
    sign: '\u{201E}',
    description: 'DOUBLE LOW-9 QUOTATION MARK',
  },
  'U+201F': {
    codepoint: 0x201f,
    sign: '\u{201F}',
    description: 'DOUBLE HIGH-REVERSED-9 QUOTATION MARK',
  },
  'U+201A': {
    codepoint: 0x201a,
    sign: '\u{201A}',
    description: 'SINGLE LOW-9 QUOTATION MARK',
  },
  'U+201C': {
    codepoint: 0x201c,
    sign: '\u{201C}',
    description: 'LEFT DOUBLE QUOTATION MARK',
  },
  'U+2020': {
    codepoint: 0x2020,
    sign: '\u{2020}',
    description: 'DAGGER',
  },
  'U+2720': {
    codepoint: 0x2720,
    sign: '\u{2720}',
    description: 'MALTESE CROSS',
  },
  'U+0300': {
    codepoint: 0x0300,
    sign: '\u{25CC}\u{0300}',
    description: 'COMBINING GRAVE ACCENT',
  },
  'U+0301': {
    codepoint: 0x0301,
    sign: '\u{25CC}\u{0301}',
    description: 'COMBINING ACUTE ACCENT',
  },
  'U+0302': {
    codepoint: 0x0302,
    sign: '\u{25CC}\u{0302}',
    description: 'COMBINING CIRCUMFLEX ACCENT',
  },
  'U+0304': {
    codepoint: 0x0304,
    sign: '\u{25CC}\u{0304}',
    description: 'COMBINING MACRON',
  },
  'U+0306': {
    codepoint: 0x0306,
    sign: '\u{25CC}\u{0306}',
    description: 'COMBINING BREVE',
  },
  'U+0308': {
    codepoint: 0x0308,
    sign: '\u{25CC}\u{0308}',
    description: 'COMBINING DIAERESIS',
  },
  'U+030B': {
    codepoint: 0x030b,
    sign: '\u{25CC}\u{030B}',
    description: 'COMBINING DOUBLE ACUTE ACCENT',
  },
  'U+030C': {
    codepoint: 0x030c,
    sign: '\u{25CC}\u{030C}',
    description: 'COMBINING CARON',
  },
  'U+030E': {
    codepoint: 0x030e,
    sign: '\u{25CC}\u{030E}',
    description: 'COMBINING DOUBLE VERTICAL LINE ABOVE',
  },
  'U+0305': {
    codepoint: 0x0305,
    sign: '\u{25CC}\u{0305}',
    description: 'COMBINING OVERLINE',
  },
  'U+0307': {
    codepoint: 0x0307,
    sign: '\u{25CC}\u{0307}',
    description: 'COMBINING DOT ABOVE',
  },
  'U+0323': {
    codepoint: 0x0323,
    sign: '\u{25CC}\u{0323}',
    description: 'COMBINING DOT BELOW',
  },
  'U+0327': {
    codepoint: 0x0327,
    sign: '\u{25CC}\u{0327}',
    description: 'COMBINING CEDILLA',
  },
  'U+0328': {
    codepoint: 0x0328,
    sign: '\u{25CC}\u{0328}',
    description: 'COMBINING OGONEK',
  },
  'U+0363': {
    codepoint: 0x0363,
    sign: '\u{25CC}\u{0363}',
    description: 'COMBINING LATIN SMALL LETTER A',
  },
  'U+0364': {
    codepoint: 0x0364,
    sign: '\u{25CC}\u{0364}',
    description: 'COMBINING LATIN SMALL LETTER E',
  },
  'U+0365': {
    codepoint: 0x0365,
    sign: '\u{25CC}\u{0365}',
    description: 'COMBINING LATIN SMALL LETTER I',
  },
  'U+0366': {
    codepoint: 0x0366,
    sign: '\u{25CC}\u{0366}',
    description: 'COMBINING LATIN SMALL LETTER O',
  },
  'U+0367': {
    codepoint: 0x0367,
    sign: '\u{25CC}\u{0367}',
    description: 'COMBINING LATIN SMALL LETTER U',
  },
  'U+0368': {
    codepoint: 0x0368,
    sign: '\u{25CC}\u{0368}',
    description: 'COMBINING LATIN SMALL LETTER C',
  },
  'U+0369': {
    codepoint: 0x0369,
    sign: '\u{25CC}\u{0369}',
    description: 'COMBINING LATIN SMALL LETTER D',
  },
  'U+036A': {
    codepoint: 0x036a,
    sign: '\u{25CC}\u{036A}',
    description: 'COMBINING LATIN SMALL LETTER H',
  },
  'U+036B': {
    codepoint: 0x036b,
    sign: '\u{25CC}\u{036B}',
    description: 'COMBINING LATIN SMALL LETTER M',
  },
  'U+036C': {
    codepoint: 0x036c,
    sign: '\u{25CC}\u{036C}',
    description: 'COMBINING LATIN SMALL LETTER R',
  },
  'U+036D': {
    codepoint: 0x036d,
    sign: '\u{25CC}\u{036D}',
    description: 'COMBINING LATIN SMALL LETTER T',
  },
  'U+036E': {
    codepoint: 0x036e,
    sign: '\u{25CC}\u{036E}',
    description: 'COMBINING LATIN SMALL LETTER V',
  },
  'U+036F': {
    codepoint: 0x036f,
    sign: '\u{25CC}\u{036F}',
    description: 'COMBINING LATIN SMALL LETTER X',
  },
  'U+00E1': {
    codepoint: 0x00e1,
    sign: '\u{00E1}',
    description: 'LATIN SMALL LETTER A WITH ACUTE',
  },
  'U+00E0': {
    codepoint: 0x00e0,
    sign: '\u{00E0}',
    description: 'LATIN SMALL LETTER A WITH GRAVE',
  },
  'U+00E2': {
    codepoint: 0x00e2,
    sign: '\u{00E2}',
    description: 'LATIN SMALL LETTER A WITH CIRCUMFLEX',
  },
  'U+0101': {
    codepoint: 0x0101,
    sign: '\u{0101}',
    description: 'LATIN SMALL LETTER A WITH MACRON',
  },
  'U+00E5': {
    codepoint: 0x00e5,
    sign: '\u{00E5}',
    description: 'LATIN SMALL LETTER A WITH RING ABOVE',
  },
  'U+00E6': {
    codepoint: 0x00e6,
    sign: '\u{00E6}',
    description: 'LATIN SMALL LETTER AE',
  },
  'U+007E': {
    codepoint: 0x007e,
    sign: '\u{007E}',
    description: 'TILDE',
  },
  'U+010D': {
    codepoint: 0x010d,
    sign: '\u{010D}',
    description: 'LATIN SMALL LETTER C WITH CARON',
  },
  'U+0107': {
    codepoint: 0x0107,
    sign: '\u{0107}',
    description: 'LATIN SMALL LETTER C WITH ACUTE',
  },
  'U+00F0': {
    codepoint: 0x00f0,
    sign: '\u{00F0}',
    description: 'LATIN SMALL LETTER ETH',
  },
  'U+00E8': {
    codepoint: 0x00e8,
    sign: '\u{00E8}',
    description: 'LATIN SMALL LETTER E WITH GRAVE',
  },
  'U+00E9': {
    codepoint: 0x00e9,
    sign: '\u{00E9}',
    description: 'LATIN SMALL LETTER E WITH ACUTE',
  },
  'U+00EA': {
    codepoint: 0x00ea,
    sign: '\u{00EA}',
    description: 'LATIN SMALL LETTER E WITH CIRCUMFLEX',
  },
  'U+011B': {
    codepoint: 0x011b,
    sign: '\u{011B}',
    description: 'LATIN SMALL LETTER E WITH CARON',
  },
  'U+00EB': {
    codepoint: 0x00eb,
    sign: '\u{00EB}',
    description: 'LATIN SMALL LETTER E WITH DIAERESIS',
  },
  'U+0113': {
    codepoint: 0x0113,
    sign: '\u{0113}',
    description: 'LATIN SMALL LETTER E WITH MACRON',
  },
  'U+0119': {
    codepoint: 0x0119,
    sign: '\u{0119}',
    description: 'LATIN SMALL LETTER E WITH OGONEK',
  },
  'U+012B': {
    codepoint: 0x012b,
    sign: '\u{012B}',
    description: 'LATIN SMALL LETTER I WITH MACRON',
  },
  'U+0133': {
    codepoint: 0x0133,
    sign: '\u{0133}',
    description: 'LATIN SMALL LIGATURE IJ',
  },
  'U+0144': {
    codepoint: 0x0144,
    sign: '\u{0144}',
    description: 'LATIN SMALL LETTER N WITH ACUTE',
  },
  'U+00F1': {
    codepoint: 0x00f1,
    sign: '\u{00F1}',
    description: 'LATIN SMALL LETTER N WITH TILDE',
  },
  'U+0148': {
    codepoint: 0x0148,
    sign: '\u{0148}',
    description: 'LATIN SMALL LETTER N WITH CARON',
  },
  'U+00F2': {
    codepoint: 0x00f2,
    sign: '\u{00F2}',
    description: 'LATIN SMALL LETTER O WITH GRAVE',
  },
  'U+00F3': {
    codepoint: 0x00f3,
    sign: '\u{00F3}',
    description: 'LATIN SMALL LETTER O WITH ACUTE',
  },
  'U+014D': {
    codepoint: 0x014d,
    sign: '\u{014D}',
    description: 'LATIN SMALL LETTER O WITH MACRON',
  },
  'U+00F4': {
    codepoint: 0x00f4,
    sign: '\u{00F4}',
    description: 'LATIN SMALL LETTER O WITH CIRCUMFLEX',
  },
  'U+014F': {
    codepoint: 0x014f,
    sign: '\u{014F}',
    description: 'LATIN SMALL LETTER O WITH BREVE',
  },
  'U+00F8': {
    codepoint: 0x00f8,
    sign: '\u{00F8}',
    description: 'LATIN SMALL LETTER O WITH STROKE',
  },
  'U+0153': {
    codepoint: 0x0153,
    sign: '\u{0153}',
    description: 'LATIN SMALL LIGATURE OE',
  },
  'U+0155': {
    codepoint: 0x0155,
    sign: '\u{0155}',
    description: 'LATIN SMALL LETTER R WITH ACUTE',
  },
  'U+0159': {
    codepoint: 0x0159,
    sign: '\u{0159}',
    description: 'LATIN SMALL LETTER R WITH CARON',
  },
  'U+00FE': {
    codepoint: 0x00fe,
    sign: '\u{00FE}',
    description: 'LATIN SMALL LETTER THORN',
  },
  'U+015B': {
    codepoint: 0x015b,
    sign: '\u{015B}',
    description: 'LATIN SMALL LETTER S WITH ACUTE',
  },
  'U+0161': {
    codepoint: 0x0161,
    sign: '\u{0161}',
    description: 'LATIN SMALL LETTER S WITH CARON',
  },
  'U+00F9': {
    codepoint: 0x00f9,
    sign: '\u{00F9}',
    description: 'LATIN SMALL LETTER U WITH GRAVE',
  },
  'U+00FA': {
    codepoint: 0x00fa,
    sign: '\u{00FA}',
    description: 'LATIN SMALL LETTER U WITH ACUTE',
  },
  'U+00FB': {
    codepoint: 0x00fb,
    sign: '\u{00FB}',
    description: 'LATIN SMALL LETTER U WITH CIRCUMFLEX',
  },
  'U+016B': {
    codepoint: 0x016b,
    sign: '\u{016B}',
    description: 'LATIN SMALL LETTER U WITH MACRON',
  },
  'U+016F': {
    codepoint: 0x016f,
    sign: '\u{016F}',
    description: 'LATIN SMALL LETTER U WITH RING ABOVE',
  },
  'U+0175': {
    codepoint: 0x0175,
    sign: '\u{0175}',
    description: 'LATIN SMALL LETTER W WITH CIRCUMFLEX',
  },
  'U+1E85': {
    codepoint: 0x1e85,
    sign: '\u{1E85}',
    description: 'LATIN SMALL LETTER W WITH DIAERESIS',
  },
  'U+00FD': {
    codepoint: 0x00fd,
    sign: '\u{00FD}',
    description: 'LATIN SMALL LETTER Y WITH ACUTE',
  },
  'U+00FF': {
    codepoint: 0x00ff,
    sign: '\u{00FF}',
    description: 'LATIN SMALL LETTER Y WITH DIAERESIS',
  },
  'U+017A': {
    codepoint: 0x017a,
    sign: '\u{017A}',
    description: 'LATIN SMALL LETTER Z WITH ACUTE',
  },
  'U+017E': {
    codepoint: 0x017e,
    sign: '\u{017E}',
    description: 'LATIN SMALL LETTER Z WITH CARON',
  },
  'U+00C0': {
    codepoint: 0x00c0,
    sign: '\u{00C0}',
    description: 'LATIN CAPITAL LETTER A WITH GRAVE',
  },
  'U+00C1': {
    codepoint: 0x00c1,
    sign: '\u{00C1}',
    description: 'LATIN CAPITAL LETTER A WITH ACUTE',
  },
  'U+0100': {
    codepoint: 0x0100,
    sign: '\u{0100}',
    description: 'LATIN CAPITAL LETTER A WITH MACRON',
  },
  'U+00C2': {
    codepoint: 0x00c2,
    sign: '\u{00C2}',
    description: 'LATIN CAPITAL LETTER A WITH CIRCUMFLEX',
  },
  'U+00C6': {
    codepoint: 0x00c6,
    sign: '\u{00C6}',
    description: 'LATIN CAPITAL LETTER AE',
  },
  'U+00C7': {
    codepoint: 0x00c7,
    sign: '\u{00C7}',
    description: 'LATIN CAPITAL LETTER C WITH CEDILLA',
  },
  'U+010C': {
    codepoint: 0x010c,
    sign: '\u{010C}',
    description: 'LATIN CAPITAL LETTER C WITH CARON',
  },
  'U+0106': {
    codepoint: 0x0106,
    sign: '\u{0106}',
    description: 'LATIN CAPITAL LETTER C WITH ACUTE',
  },
  'U+00C8': {
    codepoint: 0x00c8,
    sign: '\u{00C8}',
    description: 'LATIN CAPITAL LETTER E WITH GRAVE',
  },
  'U+00C9': {
    codepoint: 0x00c9,
    sign: '\u{00C9}',
    description: 'LATIN CAPITAL LETTER E WITH ACUTE',
  },
  'U+0112': {
    codepoint: 0x0112,
    sign: '\u{0112}',
    description: 'LATIN CAPITAL LETTER E WITH MACRON',
  },
  'U+00CA': {
    codepoint: 0x00ca,
    sign: '\u{00CA}',
    description: 'LATIN CAPITAL LETTER E WITH CIRCUMFLEX',
  },
  'U+0118': {
    codepoint: 0x0118,
    sign: '\u{0118}',
    description: 'LATIN CAPITAL LETTER E WITH OGONEK',
  },
  'U+011A': {
    codepoint: 0x011a,
    sign: '\u{011A}',
    description: 'LATIN CAPITAL LETTER E WITH CARON',
  },
  'U+012A': {
    codepoint: 0x012a,
    sign: '\u{012A}',
    description: 'LATIN CAPITAL LETTER I WITH MACRON',
  },
  'U+0132': {
    codepoint: 0x0132,
    sign: '\u{0132}',
    description: 'LATIN CAPITAL LIGATURE IJ',
  },
  'U+0141': {
    codepoint: 0x0141,
    sign: '\u{0141}',
    description: 'LATIN CAPITAL LETTER L WITH STROKE',
  },
  'U+0143': {
    codepoint: 0x0143,
    sign: '\u{0143}',
    description: 'LATIN CAPITAL LETTER N WITH ACUTE',
  },
  'U+0147': {
    codepoint: 0x0147,
    sign: '\u{0147}',
    description: 'LATIN CAPITAL LETTER N WITH CARON',
  },
  'U+00D1': {
    codepoint: 0x00d1,
    sign: '\u{00D1}',
    description: 'LATIN CAPITAL LETTER N WITH TILDE',
  },
  'U+00D2': {
    codepoint: 0x00d2,
    sign: '\u{00D2}',
    description: 'LATIN CAPITAL LETTER O WITH GRAVE',
  },
  'U+00D3': {
    codepoint: 0x00d3,
    sign: '\u{00D3}',
    description: 'LATIN CAPITAL LETTER O WITH ACUTE',
  },
  'U+00D4': {
    codepoint: 0x00d4,
    sign: '\u{00D4}',
    description: 'LATIN CAPITAL LETTER O WITH CIRCUMFLEX',
  },
  'U+014C': {
    codepoint: 0x014c,
    sign: '\u{014C}',
    description: 'LATIN CAPITAL LETTER O WITH MACRON',
  },
  'U+00D8': {
    codepoint: 0x00d8,
    sign: '\u{00D8}',
    description: 'LATIN CAPITAL LETTER O WITH STROKE',
  },
  'U+0152': {
    codepoint: 0x0152,
    sign: '\u{0152}',
    description: 'LATIN CAPITAL LIGATURE OE',
  },
  'U+0154': {
    codepoint: 0x0154,
    sign: '\u{0154}',
    description: 'LATIN CAPITAL LETTER R WITH ACUTE',
  },
  'U+0158': {
    codepoint: 0x0158,
    sign: '\u{0158}',
    description: 'LATIN CAPITAL LETTER R WITH CARON',
  },
  'U+015A': {
    codepoint: 0x015a,
    sign: '\u{015A}',
    description: 'LATIN CAPITAL LETTER S WITH ACUTE',
  },
  'U+0160': {
    codepoint: 0x0160,
    sign: '\u{0160}',
    description: 'LATIN CAPITAL LETTER S WITH CARON',
  },
  'U+00DA': {
    codepoint: 0x00da,
    sign: '\u{00DA}',
    description: 'LATIN CAPITAL LETTER U WITH ACUTE',
  },
  'U+00D9': {
    codepoint: 0x00d9,
    sign: '\u{00D9}',
    description: 'LATIN CAPITAL LETTER U WITH GRAVE',
  },
  'U+00DB': {
    codepoint: 0x00db,
    sign: '\u{00DB}',
    description: 'LATIN CAPITAL LETTER U WITH CIRCUMFLEX',
  },
  'U+016A': {
    codepoint: 0x016a,
    sign: '\u{016A}',
    description: 'LATIN CAPITAL LETTER U WITH MACRON',
  },
  'U+016E': {
    codepoint: 0x016e,
    sign: '\u{016E}',
    description: 'LATIN CAPITAL LETTER U WITH RING ABOVE',
  },
  'U+0174': {
    codepoint: 0x0174,
    sign: '\u{0174}',
    description: 'LATIN CAPITAL LETTER W WITH CIRCUMFLEX',
  },
  'U+0178': {
    codepoint: 0x0178,
    sign: '\u{0178}',
    description: 'LATIN CAPITAL LETTER Y WITH DIAERESIS',
  },
  'U+00DD': {
    codepoint: 0x00dd,
    sign: '\u{00DD}',
    description: 'LATIN CAPITAL LETTER Y WITH ACUTE',
  },
  'U+0179': {
    codepoint: 0x0179,
    sign: '\u{0179}',
    description: 'LATIN CAPITAL LETTER Z WITH ACUTE',
  },
  'U+017D': {
    codepoint: 0x017d,
    sign: '\u{017D}',
    description: 'LATIN CAPITAL LETTER Z WITH CARON',
  },
  'U+1D43': {
    codepoint: 0x1d43,
    sign: '\u{1D43}',
    description: 'MODIFIER LETTER SMALL A',
  },
  'U+1D47': {
    codepoint: 0x1d47,
    sign: '\u{1D47}',
    description: 'MODIFIER LETTER SMALL B',
  },
  'U+1D49': {
    codepoint: 0x1d49,
    sign: '\u{1D49}',
    description: 'MODIFIER LETTER SMALL E',
  },
  'U+1D50': {
    codepoint: 0x1d50,
    sign: '\u{1D50}',
    description: 'MODIFIER LETTER SMALL M',
  },
  'U+1D52': {
    codepoint: 0x1d52,
    sign: '\u{1D52}',
    description: 'MODIFIER LETTER SMALL O',
  },
  'U+02B3': {
    codepoint: 0x02b3,
    sign: '\u{02B3}',
    description: 'MODIFIER LETTER SMALL R',
  },
  'U+02E2': {
    codepoint: 0x02e2,
    sign: '\u{02E2}',
    description: 'MODIFIER LETTER SMALL S',
  },
  'U+1D57': {
    codepoint: 0x1d57,
    sign: '\u{1D57}',
    description: 'MODIFIER LETTER SMALL T',
  },
  'U+1D58': {
    codepoint: 0x1d58,
    sign: '\u{1D58}',
    description: 'MODIFIER LETTER SMALL U',
  },
  'U+1D5B': {
    codepoint: 0x1d5b,
    sign: '\u{1D5B}',
    description: 'MODIFIER LETTER SMALL V',
  },
  'U+2071': {
    codepoint: 0x2071,
    sign: '\u{2071}',
    description: 'SUPERSCRIPT LATIN SMALL LETTER I',
  },
  'U+0342': {
    codepoint: 0x0342,
    sign: '\u{25CC}\u{0342}',
    description: 'COMBINING GREEK PERISPOMENI',
  },
  'U+0345': {
    codepoint: 0x0345,
    sign: '\u{25CC}\u{0345}',
    description: 'COMBINING GREEK YPOGEGRAMMENI',
  },
  'U+0343': {
    codepoint: 0x0343,
    sign: '\u{25CC}\u{0343}',
    description: 'COMBINING GREEK KORONIS',
  },
  'U+0344': {
    codepoint: 0x0344,
    sign: '\u{25CC}\u{0344}',
    description: 'COMBINING GREEK DIALYTIKA TONOS',
  },
  'U+FE24': {
    codepoint: 0xfe24,
    sign: '\u{25CC}\u{FE24}',
    description: 'COMBINING MACRON LEFT HALF',
  },
  'U+FE25': {
    codepoint: 0xfe25,
    sign: '\u{25CC}\u{FE25}',
    description: 'COMBINING MACRON RIGHT HALF',
  },
  'U+FE26': {
    codepoint: 0xfe26,
    sign: '\u{25CC}\u{FE26}',
    description: 'COMBINING CONJOINING MACRON',
  },
  'U+1FBE': {
    codepoint: 0x1fbe,
    sign: '\u{1FBE}',
    description: 'GREEK PROSGEGRAMMENI',
  },
  'U+1FBF': {
    codepoint: 0x1fbf,
    sign: '\u{1FBF}',
    description: 'GREEK PSILI',
  },
  'U+1FFE': {
    codepoint: 0x1ffe,
    sign: '\u{1FFE}',
    description: 'GREEK DASIA',
  },
  'U+1FC0': {
    codepoint: 0x1fc0,
    sign: '\u{1FC0}',
    description: 'GREEK PERISPOMENI',
  },
  'U+1FEF': {
    codepoint: 0x1fef,
    sign: '\u{1FEF}',
    description: 'GREEK VARIA',
  },
  'U+1FFD': {
    codepoint: 0x1ffd,
    sign: '\u{1FFD}',
    description: 'GREEK OXIA',
  },
  'U+1FCD': {
    codepoint: 0x1fcd,
    sign: '\u{1FCD}',
    description: 'GREEK PSILI AND VARIA',
  },
  'U+1FCE': {
    codepoint: 0x1fce,
    sign: '\u{1FCE}',
    description: 'GREEK PSILI AND OXIA',
  },
  'U+1FCF': {
    codepoint: 0x1fcf,
    sign: '\u{1FCF}',
    description: 'GREEK PSILI AND PERISPOMENI',
  },
  'U+1FDD': {
    codepoint: 0x1fdd,
    sign: '\u{1FDD}',
    description: 'GREEK DASIA AND VARIA',
  },
  'U+1FDE': {
    codepoint: 0x1fde,
    sign: '\u{1FDE}',
    description: 'GREEK DASIA AND OXIA',
  },
  'U+1FDF': {
    codepoint: 0x1fdf,
    sign: '\u{1FDF}',
    description: 'GREEK DASIA AND PERISPOMENI',
  },
  'U+037A': {
    codepoint: 0x037a,
    sign: '\u{037A}',
    description: 'GREEK YPOGEGRAMMENI',
  },
  'U+037E': {
    codepoint: 0x037e,
    sign: '\u{037E}',
    description: 'GREEK QUESTION MARK',
  },
  'U+0387': {
    codepoint: 0x0387,
    sign: '\u{0387}',
    description: 'GREEK ANO TELEIA',
  },
  'U+03DB': {
    codepoint: 0x03db,
    sign: '\u{03DB}',
    description: 'GREEK SMALL LETTER STIGMA',
  },
  'U+03DA': {
    codepoint: 0x03da,
    sign: '\u{03DA}',
    description: 'GREEK LETTER STIGMA',
  },
  'U+03F2': {
    codepoint: 0x03f2,
    sign: '\u{03F2}',
    description: 'GREEK LUNATE SIGMA SYMBOL',
  },
  'U+03F9': {
    codepoint: 0x03f9,
    sign: '\u{03F9}',
    description: 'GREEK CAPITAL LUNATE SIGMA SYMBOL',
  },
  'U+0375': {
    codepoint: 0x0375,
    sign: '\u{0375}',
    description: 'GREEK LOWER NUMERAL SIGN',
  },
  'U+03DF': {
    codepoint: 0x03df,
    sign: '\u{03DF}',
    description: 'GREEK SMALL LETTER KOPPA',
  },
  'U+03E1': {
    codepoint: 0x03e1,
    sign: '\u{03E1}',
    description: 'GREEK SMALL LETTER SAMPI',
  },
  'U+03D8': {
    codepoint: 0x03d8,
    sign: '\u{03D8}',
    description: 'GREEK LETTER ARCHAIC KOPPA',
  },
  'U+03D9': {
    codepoint: 0x03d9,
    sign: '\u{03D9}',
    description: 'GREEK SMALL LETTER ARCHAIC KOPPA',
  },
  'U+03DC': {
    codepoint: 0x03dc,
    sign: '\u{03DC}',
    description: 'GREEK LETTER DIGAMMA',
  },
  'U+03DD': {
    codepoint: 0x03dd,
    sign: '\u{03DD}',
    description: 'GREEK SMALL LETTER DIGAMMA',
  },
  'U+0298': {
    codepoint: 0x0298,
    sign: '\u{0298}',
    description: 'LATIN LETTER BILABIAL CLICK',
  },
  'U+03B1': {
    codepoint: 0x03b1,
    sign: '\u{03B1}',
    description: 'GREEK SMALL LETTER ALPHA',
  },
  'U+1F70': {
    codepoint: 0x1f70,
    sign: '\u{1F70}',
    description: 'GREEK SMALL LETTER ALPHA WITH VARIA',
  },
  'U+1F71': {
    codepoint: 0x1f71,
    sign: '\u{1F71}',
    description: 'GREEK SMALL LETTER ALPHA WITH OXIA',
  },
  'U+1FB6': {
    codepoint: 0x1fb6,
    sign: '\u{1FB6}',
    description: 'GREEK SMALL LETTER ALPHA WITH PERISPOMENI',
  },
  'U+1F00': {
    codepoint: 0x1f00,
    sign: '\u{1F00}',
    description: 'GREEK SMALL LETTER ALPHA WITH PSILI',
  },
  'U+1F01': {
    codepoint: 0x1f01,
    sign: '\u{1F01}',
    description: 'GREEK SMALL LETTER ALPHA WITH DASIA',
  },
  'U+1F02': {
    codepoint: 0x1f02,
    sign: '\u{1F02}',
    description: 'GREEK SMALL LETTER ALPHA WITH PSILI AND VARIA',
  },
  'U+1F03': {
    codepoint: 0x1f03,
    sign: '\u{1F03}',
    description: 'GREEK SMALL LETTER ALPHA WITH DASIA AND VARIA',
  },
  'U+1F04': {
    codepoint: 0x1f04,
    sign: '\u{1F04}',
    description: 'GREEK SMALL LETTER ALPHA WITH PSILI AND OXIA',
  },
  'U+1F05': {
    codepoint: 0x1f05,
    sign: '\u{1F05}',
    description: 'GREEK SMALL LETTER ALPHA WITH DASIA AND OXIA',
  },
  'U+1F06': {
    codepoint: 0x1f06,
    sign: '\u{1F06}',
    description: 'GREEK SMALL LETTER ALPHA WITH PSILI AND PERISPOMENI',
  },
  'U+1F07': {
    codepoint: 0x1f07,
    sign: '\u{1F07}',
    description: 'GREEK SMALL LETTER ALPHA WITH DASIA AND PERISPOMENI',
  },
  'U+1FB3': {
    codepoint: 0x1fb3,
    sign: '\u{1FB3}',
    description: 'GREEK SMALL LETTER ALPHA WITH YPOGEGRAMMENI',
  },
  'U+1FB2': {
    codepoint: 0x1fb2,
    sign: '\u{1FB2}',
    description: 'GREEK SMALL LETTER ALPHA WITH VARIA AND YPOGEGRAMMENI',
  },
  'U+1FB4': {
    codepoint: 0x1fb4,
    sign: '\u{1FB4}',
    description: 'GREEK SMALL LETTER ALPHA WITH OXIA AND YPOGEGRAMMENI',
  },
  'U+1FB7': {
    codepoint: 0x1fb7,
    sign: '\u{1FB7}',
    description: 'GREEK SMALL LETTER ALPHA WITH PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+1F80': {
    codepoint: 0x1f80,
    sign: '\u{1F80}',
    description: 'GREEK SMALL LETTER ALPHA WITH PSILI AND YPOGEGRAMMENI',
  },
  'U+1F81': {
    codepoint: 0x1f81,
    sign: '\u{1F81}',
    description: 'GREEK SMALL LETTER ALPHA WITH DASIA AND YPOGEGRAMMENI',
  },
  'U+1F82': {
    codepoint: 0x1f82,
    sign: '\u{1F82}',
    description:
      'GREEK SMALL LETTER ALPHA WITH PSILI AND VARIA AND YPOGEGRAMMENI',
  },
  'U+1F83': {
    codepoint: 0x1f83,
    sign: '\u{1F83}',
    description:
      'GREEK SMALL LETTER ALPHA WITH DASIA AND VARIA AND YPOGEGRAMMENI',
  },
  'U+1F84': {
    codepoint: 0x1f84,
    sign: '\u{1F84}',
    description:
      'GREEK SMALL LETTER ALPHA WITH PSILI AND OXIA AND YPOGEGRAMMENI',
  },
  'U+1F85': {
    codepoint: 0x1f85,
    sign: '\u{1F85}',
    description:
      'GREEK SMALL LETTER ALPHA WITH DASIA AND OXIA AND YPOGEGRAMMENI',
  },
  'U+1F86': {
    codepoint: 0x1f86,
    sign: '\u{1F86}',
    description:
      'GREEK SMALL LETTER ALPHA WITH PSILI AND PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+1F87': {
    codepoint: 0x1f87,
    sign: '\u{1F87}',
    description:
      'GREEK SMALL LETTER ALPHA WITH DASIA AND PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+03B2': {
    codepoint: 0x03b2,
    sign: '\u{03B2}',
    description: 'GREEK SMALL LETTER BETA',
  },
  'U+03B3': {
    codepoint: 0x03b3,
    sign: '\u{03B3}',
    description: 'GREEK SMALL LETTER GAMMA',
  },
  'U+03B4': {
    codepoint: 0x03b4,
    sign: '\u{03B4}',
    description: 'GREEK SMALL LETTER DELTA',
  },
  'U+03B5': {
    codepoint: 0x03b5,
    sign: '\u{03B5}',
    description: 'GREEK SMALL LETTER EPSILON',
  },
  'U+1F72': {
    codepoint: 0x1f72,
    sign: '\u{1F72}',
    description: 'GREEK SMALL LETTER EPSILON WITH VARIA',
  },
  'U+1F73': {
    codepoint: 0x1f73,
    sign: '\u{1F73}',
    description: 'GREEK SMALL LETTER EPSILON WITH OXIA',
  },
  'U+1F10': {
    codepoint: 0x1f10,
    sign: '\u{1F10}',
    description: 'GREEK SMALL LETTER EPSILON WITH PSILI',
  },
  'U+1F11': {
    codepoint: 0x1f11,
    sign: '\u{1F11}',
    description: 'GREEK SMALL LETTER EPSILON WITH DASIA',
  },
  'U+1F12': {
    codepoint: 0x1f12,
    sign: '\u{1F12}',
    description: 'GREEK SMALL LETTER EPSILON WITH PSILI AND VARIA',
  },
  'U+1F13': {
    codepoint: 0x1f13,
    sign: '\u{1F13}',
    description: 'GREEK SMALL LETTER EPSILON WITH DASIA AND VARIA',
  },
  'U+1F14': {
    codepoint: 0x1f14,
    sign: '\u{1F14}',
    description: 'GREEK SMALL LETTER EPSILON WITH PSILI AND OXIA',
  },
  'U+1F15': {
    codepoint: 0x1f15,
    sign: '\u{1F15}',
    description: 'GREEK SMALL LETTER EPSILON WITH DASIA AND OXIA',
  },
  'U+03B6': {
    codepoint: 0x03b6,
    sign: '\u{03B6}',
    description: 'GREEK SMALL LETTER ZETA',
  },
  'U+03B7': {
    codepoint: 0x03b7,
    sign: '\u{03B7}',
    description: 'GREEK SMALL LETTER ETA',
  },
  'U+1F74': {
    codepoint: 0x1f74,
    sign: '\u{1F74}',
    description: 'GREEK SMALL LETTER ETA WITH VARIA',
  },
  'U+1F75': {
    codepoint: 0x1f75,
    sign: '\u{1F75}',
    description: 'GREEK SMALL LETTER ETA WITH OXIA',
  },
  'U+1FC6': {
    codepoint: 0x1fc6,
    sign: '\u{1FC6}',
    description: 'GREEK SMALL LETTER ETA WITH PERISPOMENI',
  },
  'U+1F20': {
    codepoint: 0x1f20,
    sign: '\u{1F20}',
    description: 'GREEK SMALL LETTER ETA WITH PSILI',
  },
  'U+1F21': {
    codepoint: 0x1f21,
    sign: '\u{1F21}',
    description: 'GREEK SMALL LETTER ETA WITH DASIA',
  },
  'U+1F22': {
    codepoint: 0x1f22,
    sign: '\u{1F22}',
    description: 'GREEK SMALL LETTER ETA WITH PSILI AND VARIA',
  },
  'U+1F23': {
    codepoint: 0x1f23,
    sign: '\u{1F23}',
    description: 'GREEK SMALL LETTER ETA WITH DASIA AND VARIA',
  },
  'U+1F24': {
    codepoint: 0x1f24,
    sign: '\u{1F24}',
    description: 'GREEK SMALL LETTER ETA WITH PSILI AND OXIA',
  },
  'U+1F25': {
    codepoint: 0x1f25,
    sign: '\u{1F25}',
    description: 'GREEK SMALL LETTER ETA WITH DASIA AND OXIA',
  },
  'U+1F26': {
    codepoint: 0x1f26,
    sign: '\u{1F26}',
    description: 'GREEK SMALL LETTER ETA WITH PSILI AND PERISPOMENI',
  },
  'U+1F27': {
    codepoint: 0x1f27,
    sign: '\u{1F27}',
    description: 'GREEK SMALL LETTER ETA WITH DASIA AND PERISPOMENI',
  },
  'U+1FC3': {
    codepoint: 0x1fc3,
    sign: '\u{1FC3}',
    description: 'GREEK SMALL LETTER ETA WITH YPOGEGRAMMENI',
  },
  'U+1FC2': {
    codepoint: 0x1fc2,
    sign: '\u{1FC2}',
    description: 'GREEK SMALL LETTER ETA WITH VARIA AND YPOGEGRAMMENI',
  },
  'U+1FC4': {
    codepoint: 0x1fc4,
    sign: '\u{1FC4}',
    description: 'GREEK SMALL LETTER ETA WITH OXIA AND YPOGEGRAMMENI',
  },
  'U+1FC7': {
    codepoint: 0x1fc7,
    sign: '\u{1FC7}',
    description: 'GREEK SMALL LETTER ETA WITH PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+1F90': {
    codepoint: 0x1f90,
    sign: '\u{1F90}',
    description: 'GREEK SMALL LETTER ETA WITH PSILI AND YPOGEGRAMMENI',
  },
  'U+1F91': {
    codepoint: 0x1f91,
    sign: '\u{1F91}',
    description: 'GREEK SMALL LETTER ETA WITH DASIA AND YPOGEGRAMMENI',
  },
  'U+1F92': {
    codepoint: 0x1f92,
    sign: '\u{1F92}',
    description:
      'GREEK SMALL LETTER ETA WITH PSILI AND VARIA AND YPOGEGRAMMENI',
  },
  'U+1F93': {
    codepoint: 0x1f93,
    sign: '\u{1F93}',
    description:
      'GREEK SMALL LETTER ETA WITH DASIA AND VARIA AND YPOGEGRAMMENI',
  },
  'U+1F94': {
    codepoint: 0x1f94,
    sign: '\u{1F94}',
    description: 'GREEK SMALL LETTER ETA WITH PSILI AND OXIA AND YPOGEGRAMMENI',
  },
  'U+1F95': {
    codepoint: 0x1f95,
    sign: '\u{1F95}',
    description: 'GREEK SMALL LETTER ETA WITH DASIA AND OXIA AND YPOGEGRAMMENI',
  },
  'U+1F96': {
    codepoint: 0x1f96,
    sign: '\u{1F96}',
    description:
      'GREEK SMALL LETTER ETA WITH PSILI AND PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+1F97': {
    codepoint: 0x1f97,
    sign: '\u{1F97}',
    description:
      'GREEK SMALL LETTER ETA WITH DASIA AND PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+03B8': {
    codepoint: 0x03b8,
    sign: '\u{03B8}',
    description: 'GREEK SMALL LETTER THETA',
  },
  'U+03B9': {
    codepoint: 0x03b9,
    sign: '\u{03B9}',
    description: 'GREEK SMALL LETTER IOTA',
  },
  'U+1F76': {
    codepoint: 0x1f76,
    sign: '\u{1F76}',
    description: 'GREEK SMALL LETTER IOTA WITH VARIA',
  },
  'U+1F77': {
    codepoint: 0x1f77,
    sign: '\u{1F77}',
    description: 'GREEK SMALL LETTER IOTA WITH OXIA',
  },
  'U+1FD6': {
    codepoint: 0x1fd6,
    sign: '\u{1FD6}',
    description: 'GREEK SMALL LETTER IOTA WITH PERISPOMENI',
  },
  'U+1F30': {
    codepoint: 0x1f30,
    sign: '\u{1F30}',
    description: 'GREEK SMALL LETTER IOTA WITH PSILI',
  },
  'U+1F31': {
    codepoint: 0x1f31,
    sign: '\u{1F31}',
    description: 'GREEK SMALL LETTER IOTA WITH DASIA',
  },
  'U+1F32': {
    codepoint: 0x1f32,
    sign: '\u{1F32}',
    description: 'GREEK SMALL LETTER IOTA WITH PSILI AND VARIA',
  },
  'U+1F33': {
    codepoint: 0x1f33,
    sign: '\u{1F33}',
    description: 'GREEK SMALL LETTER IOTA WITH DASIA AND VARIA',
  },
  'U+1F34': {
    codepoint: 0x1f34,
    sign: '\u{1F34}',
    description: 'GREEK SMALL LETTER IOTA WITH PSILI AND OXIA',
  },
  'U+1F35': {
    codepoint: 0x1f35,
    sign: '\u{1F35}',
    description: 'GREEK SMALL LETTER IOTA WITH DASIA AND OXIA',
  },
  'U+1F36': {
    codepoint: 0x1f36,
    sign: '\u{1F36}',
    description: 'GREEK SMALL LETTER IOTA WITH PSILI AND PERISPOMENI',
  },
  'U+1F37': {
    codepoint: 0x1f37,
    sign: '\u{1F37}',
    description: 'GREEK SMALL LETTER IOTA WITH DASIA AND PERISPOMENI',
  },
  'U+03CA': {
    codepoint: 0x03ca,
    sign: '\u{03CA}',
    description: 'GREEK SMALL LETTER IOTA WITH DIALYTIKA',
  },
  'U+0390': {
    codepoint: 0x0390,
    sign: '\u{0390}',
    description: 'GREEK SMALL LETTER IOTA WITH DIALYTIKA AND TONOS',
  },
  'U+03BA': {
    codepoint: 0x03ba,
    sign: '\u{03BA}',
    description: 'GREEK SMALL LETTER KAPPA',
  },
  'U+03BB': {
    codepoint: 0x03bb,
    sign: '\u{03BB}',
    description: 'GREEK SMALL LETTER LAMDA',
  },
  'U+03BC': {
    codepoint: 0x03bc,
    sign: '\u{03BC}',
    description: 'GREEK SMALL LETTER MU',
  },
  'U+03BD': {
    codepoint: 0x03bd,
    sign: '\u{03BD}',
    description: 'GREEK SMALL LETTER NU',
  },
  'U+03BE': {
    codepoint: 0x03be,
    sign: '\u{03BE}',
    description: 'GREEK SMALL LETTER XI',
  },
  'U+03BF': {
    codepoint: 0x03bf,
    sign: '\u{03BF}',
    description: 'GREEK SMALL LETTER OMICRON',
  },
  'U+1F78': {
    codepoint: 0x1f78,
    sign: '\u{1F78}',
    description: 'GREEK SMALL LETTER OMICRON WITH VARIA',
  },
  'U+1F79': {
    codepoint: 0x1f79,
    sign: '\u{1F79}',
    description: 'GREEK SMALL LETTER OMICRON WITH OXIA',
  },
  'U+1F40': {
    codepoint: 0x1f40,
    sign: '\u{1F40}',
    description: 'GREEK SMALL LETTER OMICRON WITH PSILI',
  },
  'U+1F41': {
    codepoint: 0x1f41,
    sign: '\u{1F41}',
    description: 'GREEK SMALL LETTER OMICRON WITH DASIA',
  },
  'U+1F42': {
    codepoint: 0x1f42,
    sign: '\u{1F42}',
    description: 'GREEK SMALL LETTER OMICRON WITH PSILI AND VARIA',
  },
  'U+1F43': {
    codepoint: 0x1f43,
    sign: '\u{1F43}',
    description: 'GREEK SMALL LETTER OMICRON WITH DASIA AND VARIA',
  },
  'U+1F44': {
    codepoint: 0x1f44,
    sign: '\u{1F44}',
    description: 'GREEK SMALL LETTER OMICRON WITH PSILI AND OXIA',
  },
  'U+1F45': {
    codepoint: 0x1f45,
    sign: '\u{1F45}',
    description: 'GREEK SMALL LETTER OMICRON WITH DASIA AND OXIA',
  },
  'U+03C0': {
    codepoint: 0x03c0,
    sign: '\u{03C0}',
    description: 'GREEK SMALL LETTER PI',
  },
  'U+03C1': {
    codepoint: 0x03c1,
    sign: '\u{03C1}',
    description: 'GREEK SMALL LETTER RHO',
  },
  'U+1FE4': {
    codepoint: 0x1fe4,
    sign: '\u{1FE4}',
    description: 'GREEK SMALL LETTER RHO WITH PSILI',
  },
  'U+1FE5': {
    codepoint: 0x1fe5,
    sign: '\u{1FE5}',
    description: 'GREEK SMALL LETTER RHO WITH DASIA',
  },
  'U+03C2': {
    codepoint: 0x03c2,
    sign: '\u{03C2}',
    description: 'GREEK SMALL LETTER FINAL SIGMA',
  },
  'U+03C3': {
    codepoint: 0x03c3,
    sign: '\u{03C3}',
    description: 'GREEK SMALL LETTER SIGMA',
  },
  'U+03C4': {
    codepoint: 0x03c4,
    sign: '\u{03C4}',
    description: 'GREEK SMALL LETTER TAU',
  },
  'U+03C5': {
    codepoint: 0x03c5,
    sign: '\u{03C5}',
    description: 'GREEK SMALL LETTER UPSILON',
  },
  'U+1F7A': {
    codepoint: 0x1f7a,
    sign: '\u{1F7A}',
    description: 'GREEK SMALL LETTER UPSILON WITH VARIA',
  },
  'U+1F7B': {
    codepoint: 0x1f7b,
    sign: '\u{1F7B}',
    description: 'GREEK SMALL LETTER UPSILON WITH OXIA',
  },
  'U+1FE6': {
    codepoint: 0x1fe6,
    sign: '\u{1FE6}',
    description: 'GREEK SMALL LETTER UPSILON WITH PERISPOMENI',
  },
  'U+1F50': {
    codepoint: 0x1f50,
    sign: '\u{1F50}',
    description: 'GREEK SMALL LETTER UPSILON WITH PSILI',
  },
  'U+1F51': {
    codepoint: 0x1f51,
    sign: '\u{1F51}',
    description: 'GREEK SMALL LETTER UPSILON WITH DASIA',
  },
  'U+1F52': {
    codepoint: 0x1f52,
    sign: '\u{1F52}',
    description: 'GREEK SMALL LETTER UPSILON WITH PSILI AND VARIA',
  },
  'U+1F53': {
    codepoint: 0x1f53,
    sign: '\u{1F53}',
    description: 'GREEK SMALL LETTER UPSILON WITH DASIA AND VARIA',
  },
  'U+1F54': {
    codepoint: 0x1f54,
    sign: '\u{1F54}',
    description: 'GREEK SMALL LETTER UPSILON WITH PSILI AND OXIA',
  },
  'U+1F55': {
    codepoint: 0x1f55,
    sign: '\u{1F55}',
    description: 'GREEK SMALL LETTER UPSILON WITH DASIA AND OXIA',
  },
  'U+1F56': {
    codepoint: 0x1f56,
    sign: '\u{1F56}',
    description: 'GREEK SMALL LETTER UPSILON WITH PSILI AND PERISPOMENI',
  },
  'U+1F57': {
    codepoint: 0x1f57,
    sign: '\u{1F57}',
    description: 'GREEK SMALL LETTER UPSILON WITH DASIA AND PERISPOMENI',
  },
  'U+03CB': {
    codepoint: 0x03cb,
    sign: '\u{03CB}',
    description: 'GREEK SMALL LETTER UPSILON WITH DIALYTIKA',
  },
  'U+03B0': {
    codepoint: 0x03b0,
    sign: '\u{03B0}',
    description: 'GREEK SMALL LETTER UPSILON WITH DIALYTIKA AND TONOS',
  },
  'U+03C6': {
    codepoint: 0x03c6,
    sign: '\u{03C6}',
    description: 'GREEK SMALL LETTER PHI',
  },
  'U+03C7': {
    codepoint: 0x03c7,
    sign: '\u{03C7}',
    description: 'GREEK SMALL LETTER CHI',
  },
  'U+03C8': {
    codepoint: 0x03c8,
    sign: '\u{03C8}',
    description: 'GREEK SMALL LETTER PSI',
  },
  'U+03C9': {
    codepoint: 0x03c9,
    sign: '\u{03C9}',
    description: 'GREEK SMALL LETTER OMEGA',
  },
  'U+1F60': {
    codepoint: 0x1f60,
    sign: '\u{1F60}',
    description: 'GREEK SMALL LETTER OMEGA WITH PSILI',
  },
  'U+1F7C': {
    codepoint: 0x1f7c,
    sign: '\u{1F7C}',
    description: 'GREEK SMALL LETTER OMEGA WITH VARIA',
  },
  'U+1F7D': {
    codepoint: 0x1f7d,
    sign: '\u{1F7D}',
    description: 'GREEK SMALL LETTER OMEGA WITH OXIA',
  },
  'U+1FF6': {
    codepoint: 0x1ff6,
    sign: '\u{1FF6}',
    description: 'GREEK SMALL LETTER OMEGA WITH PERISPOMENI',
  },
  'U+1F61': {
    codepoint: 0x1f61,
    sign: '\u{1F61}',
    description: 'GREEK SMALL LETTER OMEGA WITH DASIA',
  },
  'U+1F62': {
    codepoint: 0x1f62,
    sign: '\u{1F62}',
    description: 'GREEK SMALL LETTER OMEGA WITH PSILI AND VARIA',
  },
  'U+1F63': {
    codepoint: 0x1f63,
    sign: '\u{1F63}',
    description: 'GREEK SMALL LETTER OMEGA WITH DASIA AND VARIA',
  },
  'U+1F64': {
    codepoint: 0x1f64,
    sign: '\u{1F64}',
    description: 'GREEK SMALL LETTER OMEGA WITH PSILI AND OXIA',
  },
  'U+1F65': {
    codepoint: 0x1f65,
    sign: '\u{1F65}',
    description: 'GREEK SMALL LETTER OMEGA WITH DASIA AND OXIA',
  },
  'U+1F66': {
    codepoint: 0x1f66,
    sign: '\u{1F66}',
    description: 'GREEK SMALL LETTER OMEGA WITH PSILI AND PERISPOMENI',
  },
  'U+1F67': {
    codepoint: 0x1f67,
    sign: '\u{1F67}',
    description: 'GREEK SMALL LETTER OMEGA WITH DASIA AND PERISPOMENI',
  },
  'U+1FF3': {
    codepoint: 0x1ff3,
    sign: '\u{1FF3}',
    description: 'GREEK SMALL LETTER OMEGA WITH YPOGEGRAMMENI',
  },
  'U+1FF2': {
    codepoint: 0x1ff2,
    sign: '\u{1FF2}',
    description: 'GREEK SMALL LETTER OMEGA WITH VARIA AND YPOGEGRAMMENI',
  },
  'U+1FF4': {
    codepoint: 0x1ff4,
    sign: '\u{1FF4}',
    description: 'GREEK SMALL LETTER OMEGA WITH OXIA AND YPOGEGRAMMENI',
  },
  'U+1FF7': {
    codepoint: 0x1ff7,
    sign: '\u{1FF7}',
    description: 'GREEK SMALL LETTER OMEGA WITH PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+1FA0': {
    codepoint: 0x1fa0,
    sign: '\u{1FA0}',
    description: 'GREEK SMALL LETTER OMEGA WITH PSILI AND YPOGEGRAMMENI',
  },
  'U+1FA1': {
    codepoint: 0x1fa1,
    sign: '\u{1FA1}',
    description: 'GREEK SMALL LETTER OMEGA WITH DASIA AND YPOGEGRAMMENI',
  },
  'U+1FA2': {
    codepoint: 0x1fa2,
    sign: '\u{1FA2}',
    description:
      'GREEK SMALL LETTER OMEGA WITH PSILI AND VARIA AND YPOGEGRAMMENI',
  },
  'U+1FA3': {
    codepoint: 0x1fa3,
    sign: '\u{1FA3}',
    description:
      'GREEK SMALL LETTER OMEGA WITH DASIA AND VARIA AND YPOGEGRAMMENI',
  },
  'U+1FA4': {
    codepoint: 0x1fa4,
    sign: '\u{1FA4}',
    description:
      'GREEK SMALL LETTER OMEGA WITH PSILI AND OXIA AND YPOGEGRAMMENI',
  },
  'U+1FA5': {
    codepoint: 0x1fa5,
    sign: '\u{1FA5}',
    description:
      'GREEK SMALL LETTER OMEGA WITH DASIA AND OXIA AND YPOGEGRAMMENI',
  },
  'U+1FA6': {
    codepoint: 0x1fa6,
    sign: '\u{1FA6}',
    description:
      'GREEK SMALL LETTER OMEGA WITH PSILI AND PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+1FA7': {
    codepoint: 0x1fa7,
    sign: '\u{1FA7}',
    description:
      'GREEK SMALL LETTER OMEGA WITH DASIA AND PERISPOMENI AND YPOGEGRAMMENI',
  },
  'U+0391': {
    codepoint: 0x0391,
    sign: '\u{0391}',
    description: 'GREEK CAPITAL LETTER ALPHA',
  },
  'U+1FBA': {
    codepoint: 0x1fba,
    sign: '\u{1FBA}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH VARIA',
  },
  'U+1FBB': {
    codepoint: 0x1fbb,
    sign: '\u{1FBB}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH OXIA',
  },
  'U+1F08': {
    codepoint: 0x1f08,
    sign: '\u{1F08}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH PSILI',
  },
  'U+1F09': {
    codepoint: 0x1f09,
    sign: '\u{1F09}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH DASIA',
  },
  'U+1F0A': {
    codepoint: 0x1f0a,
    sign: '\u{1F0A}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH PSILI AND VARIA',
  },
  'U+1F0B': {
    codepoint: 0x1f0b,
    sign: '\u{1F0B}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH DASIA AND VARIA',
  },
  'U+1F0C': {
    codepoint: 0x1f0c,
    sign: '\u{1F0C}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH PSILI AND OXIA',
  },
  'U+1F0D': {
    codepoint: 0x1f0d,
    sign: '\u{1F0D}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH DASIA AND OXIA',
  },
  'U+1F0E': {
    codepoint: 0x1f0e,
    sign: '\u{1F0E}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH PSILI AND PERISPOMENI',
  },
  'U+1F0F': {
    codepoint: 0x1f0f,
    sign: '\u{1F0F}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH DASIA AND PERISPOMENI',
  },
  'U+1FBC': {
    codepoint: 0x1fbc,
    sign: '\u{1FBC}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH PROSGEGRAMMENI',
  },
  'U+1F88': {
    codepoint: 0x1f88,
    sign: '\u{1F88}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH PSILI AND PROSGEGRAMMENI',
  },
  'U+1F89': {
    codepoint: 0x1f89,
    sign: '\u{1F89}',
    description: 'GREEK CAPITAL LETTER ALPHA WITH DASIA AND PROSGEGRAMMENI',
  },
  'U+1F8A': {
    codepoint: 0x1f8a,
    sign: '\u{1F8A}',
    description:
      'GREEK CAPITAL LETTER ALPHA WITH PSILI AND VARIA AND PROSGEGRAMMENI',
  },
  'U+1F8B': {
    codepoint: 0x1f8b,
    sign: '\u{1F8B}',
    description:
      'GREEK CAPITAL LETTER ALPHA WITH DASIA AND VARIA AND PROSGEGRAMMENI',
  },
  'U+1F8C': {
    codepoint: 0x1f8c,
    sign: '\u{1F8C}',
    description:
      'GREEK CAPITAL LETTER ALPHA WITH PSILI AND OXIA AND PROSGEGRAMMENI',
  },
  'U+1F8D': {
    codepoint: 0x1f8d,
    sign: '\u{1F8D}',
    description:
      'GREEK CAPITAL LETTER ALPHA WITH DASIA AND OXIA AND PROSGEGRAMMENI',
  },
  'U+1F8E': {
    codepoint: 0x1f8e,
    sign: '\u{1F8E}',
    description:
      'GREEK CAPITAL LETTER ALPHA WITH PSILI AND PERISPOMENI AND PROSGEGRAMMENI',
  },
  'U+1F8F': {
    codepoint: 0x1f8f,
    sign: '\u{1F8F}',
    description:
      'GREEK CAPITAL LETTER ALPHA WITH DASIA AND PERISPOMENI AND PROSGEGRAMMENI',
  },
  'U+0392': {
    codepoint: 0x0392,
    sign: '\u{0392}',
    description: 'GREEK CAPITAL LETTER BETA',
  },
  'U+0393': {
    codepoint: 0x0393,
    sign: '\u{0393}',
    description: 'GREEK CAPITAL LETTER GAMMA',
  },
  'U+0394': {
    codepoint: 0x0394,
    sign: '\u{0394}',
    description: 'GREEK CAPITAL LETTER DELTA',
  },
  'U+0395': {
    codepoint: 0x0395,
    sign: '\u{0395}',
    description: 'GREEK CAPITAL LETTER EPSILON',
  },
  'U+1FC8': {
    codepoint: 0x1fc8,
    sign: '\u{1FC8}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH VARIA',
  },
  'U+1FC9': {
    codepoint: 0x1fc9,
    sign: '\u{1FC9}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH OXIA',
  },
  'U+1F18': {
    codepoint: 0x1f18,
    sign: '\u{1F18}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH PSILI',
  },
  'U+1F19': {
    codepoint: 0x1f19,
    sign: '\u{1F19}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH DASIA',
  },
  'U+1F1A': {
    codepoint: 0x1f1a,
    sign: '\u{1F1A}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH PSILI AND VARIA',
  },
  'U+1F1B': {
    codepoint: 0x1f1b,
    sign: '\u{1F1B}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH DASIA AND VARIA',
  },
  'U+1F1C': {
    codepoint: 0x1f1c,
    sign: '\u{1F1C}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH PSILI AND OXIA',
  },
  'U+1F1D': {
    codepoint: 0x1f1d,
    sign: '\u{1F1D}',
    description: 'GREEK CAPITAL LETTER EPSILON WITH DASIA AND OXIA',
  },
  'U+0396': {
    codepoint: 0x0396,
    sign: '\u{0396}',
    description: 'GREEK CAPITAL LETTER ZETA',
  },
  'U+0397': {
    codepoint: 0x0397,
    sign: '\u{0397}',
    description: 'GREEK CAPITAL LETTER ETA',
  },
  'U+1FCA': {
    codepoint: 0x1fca,
    sign: '\u{1FCA}',
    description: 'GREEK CAPITAL LETTER ETA WITH VARIA',
  },
  'U+1FCB': {
    codepoint: 0x1fcb,
    sign: '\u{1FCB}',
    description: 'GREEK CAPITAL LETTER ETA WITH OXIA',
  },
  'U+1F28': {
    codepoint: 0x1f28,
    sign: '\u{1F28}',
    description: 'GREEK CAPITAL LETTER ETA WITH PSILI',
  },
  'U+1F29': {
    codepoint: 0x1f29,
    sign: '\u{1F29}',
    description: 'GREEK CAPITAL LETTER ETA WITH DASIA',
  },
  'U+1F2A': {
    codepoint: 0x1f2a,
    sign: '\u{1F2A}',
    description: 'GREEK CAPITAL LETTER ETA WITH PSILI AND VARIA',
  },
  'U+1F2B': {
    codepoint: 0x1f2b,
    sign: '\u{1F2B}',
    description: 'GREEK CAPITAL LETTER ETA WITH DASIA AND VARIA',
  },
  'U+1F2C': {
    codepoint: 0x1f2c,
    sign: '\u{1F2C}',
    description: 'GREEK CAPITAL LETTER ETA WITH PSILI AND OXIA',
  },
  'U+1F2D': {
    codepoint: 0x1f2d,
    sign: '\u{1F2D}',
    description: 'GREEK CAPITAL LETTER ETA WITH DASIA AND OXIA',
  },
  'U+1F2E': {
    codepoint: 0x1f2e,
    sign: '\u{1F2E}',
    description: 'GREEK CAPITAL LETTER ETA WITH PSILI AND PERISPOMENI',
  },
  'U+1F2F': {
    codepoint: 0x1f2f,
    sign: '\u{1F2F}',
    description: 'GREEK CAPITAL LETTER ETA WITH DASIA AND PERISPOMENI',
  },
  'U+1FCC': {
    codepoint: 0x1fcc,
    sign: '\u{1FCC}',
    description: 'GREEK CAPITAL LETTER ETA WITH PROSGEGRAMMENI',
  },
  'U+1F98': {
    codepoint: 0x1f98,
    sign: '\u{1F98}',
    description: 'GREEK CAPITAL LETTER ETA WITH PSILI AND PROSGEGRAMMENI',
  },
  'U+1F99': {
    codepoint: 0x1f99,
    sign: '\u{1F99}',
    description: 'GREEK CAPITAL LETTER ETA WITH DASIA AND PROSGEGRAMMENI',
  },
  'U+1F9A': {
    codepoint: 0x1f9a,
    sign: '\u{1F9A}',
    description:
      'GREEK CAPITAL LETTER ETA WITH PSILI AND VARIA AND PROSGEGRAMMENI',
  },
  'U+1F9B': {
    codepoint: 0x1f9b,
    sign: '\u{1F9B}',
    description:
      'GREEK CAPITAL LETTER ETA WITH DASIA AND VARIA AND PROSGEGRAMMENI',
  },
  'U+1F9C': {
    codepoint: 0x1f9c,
    sign: '\u{1F9C}',
    description:
      'GREEK CAPITAL LETTER ETA WITH PSILI AND OXIA AND PROSGEGRAMMENI',
  },
  'U+1F9D': {
    codepoint: 0x1f9d,
    sign: '\u{1F9D}',
    description:
      'GREEK CAPITAL LETTER ETA WITH DASIA AND OXIA AND PROSGEGRAMMENI',
  },
  'U+1F9E': {
    codepoint: 0x1f9e,
    sign: '\u{1F9E}',
    description:
      'GREEK CAPITAL LETTER ETA WITH PSILI AND PERISPOMENI AND PROSGEGRAMMENI',
  },
  'U+1F9F': {
    codepoint: 0x1f9f,
    sign: '\u{1F9F}',
    description:
      'GREEK CAPITAL LETTER ETA WITH DASIA AND PERISPOMENI AND PROSGEGRAMMENI',
  },
  'U+0398': {
    codepoint: 0x0398,
    sign: '\u{0398}',
    description: 'GREEK CAPITAL LETTER THETA',
  },
  'U+0399': {
    codepoint: 0x0399,
    sign: '\u{0399}',
    description: 'GREEK CAPITAL LETTER IOTA',
  },
  'U+1FDA': {
    codepoint: 0x1fda,
    sign: '\u{1FDA}',
    description: 'GREEK CAPITAL LETTER IOTA WITH VARIA',
  },
  'U+1FDB': {
    codepoint: 0x1fdb,
    sign: '\u{1FDB}',
    description: 'GREEK CAPITAL LETTER IOTA WITH OXIA',
  },
  'U+1F38': {
    codepoint: 0x1f38,
    sign: '\u{1F38}',
    description: 'GREEK CAPITAL LETTER IOTA WITH PSILI',
  },
  'U+1F39': {
    codepoint: 0x1f39,
    sign: '\u{1F39}',
    description: 'GREEK CAPITAL LETTER IOTA WITH DASIA',
  },
  'U+1F3A': {
    codepoint: 0x1f3a,
    sign: '\u{1F3A}',
    description: 'GREEK CAPITAL LETTER IOTA WITH PSILI AND VARIA',
  },
  'U+1F3B': {
    codepoint: 0x1f3b,
    sign: '\u{1F3B}',
    description: 'GREEK CAPITAL LETTER IOTA WITH DASIA AND VARIA',
  },
  'U+1F3C': {
    codepoint: 0x1f3c,
    sign: '\u{1F3C}',
    description: 'GREEK CAPITAL LETTER IOTA WITH PSILI AND OXIA',
  },
  'U+1F3D': {
    codepoint: 0x1f3d,
    sign: '\u{1F3D}',
    description: 'GREEK CAPITAL LETTER IOTA WITH DASIA AND OXIA',
  },
  'U+1F3E': {
    codepoint: 0x1f3e,
    sign: '\u{1F3E}',
    description: 'GREEK CAPITAL LETTER IOTA WITH PSILI AND PERISPOMENI',
  },
  'U+1F3F': {
    codepoint: 0x1f3f,
    sign: '\u{1F3F}',
    description: 'GREEK CAPITAL LETTER IOTA WITH DASIA AND PERISPOMENI',
  },
  'U+03AA': {
    codepoint: 0x03aa,
    sign: '\u{03AA}',
    description: 'GREEK CAPITAL LETTER IOTA WITH DIALYTIKA',
  },
  'U+039A': {
    codepoint: 0x039a,
    sign: '\u{039A}',
    description: 'GREEK CAPITAL LETTER KAPPA',
  },
  'U+039B': {
    codepoint: 0x039b,
    sign: '\u{039B}',
    description: 'GREEK CAPITAL LETTER LAMDA',
  },
  'U+039C': {
    codepoint: 0x039c,
    sign: '\u{039C}',
    description: 'GREEK CAPITAL LETTER MU',
  },
  'U+039D': {
    codepoint: 0x039d,
    sign: '\u{039D}',
    description: 'GREEK CAPITAL LETTER NU',
  },
  'U+039E': {
    codepoint: 0x039e,
    sign: '\u{039E}',
    description: 'GREEK CAPITAL LETTER XI',
  },
  'U+039F': {
    codepoint: 0x039f,
    sign: '\u{039F}',
    description: 'GREEK CAPITAL LETTER OMICRON',
  },
  'U+1FF8': {
    codepoint: 0x1ff8,
    sign: '\u{1FF8}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH VARIA',
  },
  'U+1FF9': {
    codepoint: 0x1ff9,
    sign: '\u{1FF9}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH OXIA',
  },
  'U+1F48': {
    codepoint: 0x1f48,
    sign: '\u{1F48}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH PSILI',
  },
  'U+1F49': {
    codepoint: 0x1f49,
    sign: '\u{1F49}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH DASIA',
  },
  'U+1F4A': {
    codepoint: 0x1f4a,
    sign: '\u{1F4A}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH PSILI AND VARIA',
  },
  'U+1F4B': {
    codepoint: 0x1f4b,
    sign: '\u{1F4B}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH DASIA AND VARIA',
  },
  'U+1F4C': {
    codepoint: 0x1f4c,
    sign: '\u{1F4C}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH PSILI AND OXIA',
  },
  'U+1F4D': {
    codepoint: 0x1f4d,
    sign: '\u{1F4D}',
    description: 'GREEK CAPITAL LETTER OMICRON WITH DASIA AND OXIA',
  },
  'U+03A0': {
    codepoint: 0x03a0,
    sign: '\u{03A0}',
    description: 'GREEK CAPITAL LETTER PI',
  },
  'U+03A1': {
    codepoint: 0x03a1,
    sign: '\u{03A1}',
    description: 'GREEK CAPITAL LETTER RHO',
  },
  'U+1FEC': {
    codepoint: 0x1fec,
    sign: '\u{1FEC}',
    description: 'GREEK CAPITAL LETTER RHO WITH DASIA',
  },
  'U+03A3': {
    codepoint: 0x03a3,
    sign: '\u{03A3}',
    description: 'GREEK CAPITAL LETTER SIGMA',
  },
  'U+03A4': {
    codepoint: 0x03a4,
    sign: '\u{03A4}',
    description: 'GREEK CAPITAL LETTER TAU',
  },
  'U+03A5': {
    codepoint: 0x03a5,
    sign: '\u{03A5}',
    description: 'GREEK CAPITAL LETTER UPSILON',
  },
  'U+1FEA': {
    codepoint: 0x1fea,
    sign: '\u{1FEA}',
    description: 'GREEK CAPITAL LETTER UPSILON WITH VARIA',
  },
  'U+1FEB': {
    codepoint: 0x1feb,
    sign: '\u{1FEB}',
    description: 'GREEK CAPITAL LETTER UPSILON WITH OXIA',
  },
  'U+1F58': {
    codepoint: 0x1f58,
    sign: '\u{1F58}',
    description: '<reserved-1F58>',
  },
  'U+1F59': {
    codepoint: 0x1f59,
    sign: '\u{1F59}',
    description: 'GREEK CAPITAL LETTER UPSILON WITH DASIA',
  },
  'U+1F5A': {
    codepoint: 0x1f5a,
    sign: '\u{1F5A}',
    description: '<reserved-1F5A>',
  },
  'U+1F5B': {
    codepoint: 0x1f5b,
    sign: '\u{1F5B}',
    description: 'GREEK CAPITAL LETTER UPSILON WITH DASIA AND VARIA',
  },
  'U+1F5C': {
    codepoint: 0x1f5c,
    sign: '\u{1F5C}',
    description: '<reserved-1F5C>',
  },
  'U+1F5D': {
    codepoint: 0x1f5d,
    sign: '\u{1F5D}',
    description: 'GREEK CAPITAL LETTER UPSILON WITH DASIA AND OXIA',
  },
  'U+1F5E': {
    codepoint: 0x1f5e,
    sign: '\u{1F5E}',
    description: '<reserved-1F5E>',
  },
  'U+1F5F': {
    codepoint: 0x1f5f,
    sign: '\u{1F5F}',
    description: 'GREEK CAPITAL LETTER UPSILON WITH DASIA AND PERISPOMENI',
  },
  'U+03AB': {
    codepoint: 0x03ab,
    sign: '\u{03AB}',
    description: 'GREEK CAPITAL LETTER UPSILON WITH DIALYTIKA',
  },
  'U+03A6': {
    codepoint: 0x03a6,
    sign: '\u{03A6}',
    description: 'GREEK CAPITAL LETTER PHI',
  },
  'U+03A7': {
    codepoint: 0x03a7,
    sign: '\u{03A7}',
    description: 'GREEK CAPITAL LETTER CHI',
  },
  'U+03A8': {
    codepoint: 0x03a8,
    sign: '\u{03A8}',
    description: 'GREEK CAPITAL LETTER PSI',
  },
  'U+03A9': {
    codepoint: 0x03a9,
    sign: '\u{03A9}',
    description: 'GREEK CAPITAL LETTER OMEGA',
  },
  'U+1FFA': {
    codepoint: 0x1ffa,
    sign: '\u{1FFA}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH VARIA',
  },
  'U+1FFB': {
    codepoint: 0x1ffb,
    sign: '\u{1FFB}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH OXIA',
  },
  'U+1F68': {
    codepoint: 0x1f68,
    sign: '\u{1F68}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH PSILI',
  },
  'U+1F69': {
    codepoint: 0x1f69,
    sign: '\u{1F69}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH DASIA',
  },
  'U+1F6A': {
    codepoint: 0x1f6a,
    sign: '\u{1F6A}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH PSILI AND VARIA',
  },
  'U+1F6B': {
    codepoint: 0x1f6b,
    sign: '\u{1F6B}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH DASIA AND VARIA',
  },
  'U+1F6C': {
    codepoint: 0x1f6c,
    sign: '\u{1F6C}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH PSILI AND OXIA',
  },
  'U+1F6D': {
    codepoint: 0x1f6d,
    sign: '\u{1F6D}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH DASIA AND OXIA',
  },
  'U+1F6E': {
    codepoint: 0x1f6e,
    sign: '\u{1F6E}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH PSILI AND PERISPOMENI',
  },
  'U+1F6F': {
    codepoint: 0x1f6f,
    sign: '\u{1F6F}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH DASIA AND PERISPOMENI',
  },
  'U+1FFC': {
    codepoint: 0x1ffc,
    sign: '\u{1FFC}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH PROSGEGRAMMENI',
  },
  'U+1FA8': {
    codepoint: 0x1fa8,
    sign: '\u{1FA8}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH PSILI AND PROSGEGRAMMENI',
  },
  'U+1FA9': {
    codepoint: 0x1fa9,
    sign: '\u{1FA9}',
    description: 'GREEK CAPITAL LETTER OMEGA WITH DASIA AND PROSGEGRAMMENI',
  },
  'U+1FAA': {
    codepoint: 0x1faa,
    sign: '\u{1FAA}',
    description:
      'GREEK CAPITAL LETTER OMEGA WITH PSILI AND VARIA AND PROSGEGRAMMENI',
  },
  'U+1FAB': {
    codepoint: 0x1fab,
    sign: '\u{1FAB}',
    description:
      'GREEK CAPITAL LETTER OMEGA WITH DASIA AND VARIA AND PROSGEGRAMMENI',
  },
  'U+1FAC': {
    codepoint: 0x1fac,
    sign: '\u{1FAC}',
    description:
      'GREEK CAPITAL LETTER OMEGA WITH PSILI AND OXIA AND PROSGEGRAMMENI',
  },
  'U+1FAD': {
    codepoint: 0x1fad,
    sign: '\u{1FAD}',
    description:
      'GREEK CAPITAL LETTER OMEGA WITH DASIA AND OXIA AND PROSGEGRAMMENI',
  },
  'U+1FAE': {
    codepoint: 0x1fae,
    sign: '\u{1FAE}',
    description:
      'GREEK CAPITAL LETTER OMEGA WITH PSILI AND PERISPOMENI AND PROSGEGRAMMENI',
  },
  'U+1FAF': {
    codepoint: 0x1faf,
    sign: '\u{1FAF}',
    description:
      'GREEK CAPITAL LETTER OMEGA WITH DASIA AND PERISPOMENI AND PROSGEGRAMMENI',
  },
  'U+2070': {
    codepoint: 0x2070,
    sign: '\u{2070}',
    description: 'SUPERSCRIPT ZERO',
  },
  'U+00B9': {
    codepoint: 0x00b9,
    sign: '\u{00B9}',
    description: 'SUPERSCRIPT ONE',
  },
  'U+00B2': {
    codepoint: 0x00b2,
    sign: '\u{00B2}',
    description: 'SUPERSCRIPT TWO',
  },
  'U+00B3': {
    codepoint: 0x00b3,
    sign: '\u{00B3}',
    description: 'SUPERSCRIPT THREE',
  },
  'U+2074': {
    codepoint: 0x2074,
    sign: '\u{2074}',
    description: 'SUPERSCRIPT FOUR',
  },
  'U+2075': {
    codepoint: 0x2075,
    sign: '\u{2075}',
    description: 'SUPERSCRIPT FIVE',
  },
  'U+2076': {
    codepoint: 0x2076,
    sign: '\u{2076}',
    description: 'SUPERSCRIPT SIX',
  },
  'U+2077': {
    codepoint: 0x2077,
    sign: '\u{2077}',
    description: 'SUPERSCRIPT SEVEN',
  },
  'U+2078': {
    codepoint: 0x2078,
    sign: '\u{2078}',
    description: 'SUPERSCRIPT EIGHT',
  },
  'U+2079': {
    codepoint: 0x2079,
    sign: '\u{2079}',
    description: 'SUPERSCRIPT NINE',
  },
  'U+207D': {
    codepoint: 0x207d,
    sign: '\u{207D}',
    description: 'SUPERSCRIPT LEFT PARENTHESIS',
  },
  'U+207E': {
    codepoint: 0x207e,
    sign: '\u{207E}',
    description: 'SUPERSCRIPT RIGHT PARENTHESIS',
  },
  'U+207A': {
    codepoint: 0x207a,
    sign: '\u{207A}',
    description: 'SUPERSCRIPT PLUS SIGN',
  },
  'U+207B': {
    codepoint: 0x207b,
    sign: '\u{207B}',
    description: 'SUPERSCRIPT MINUS',
  },
  'U+00BD': {
    codepoint: 0x00bd,
    sign: '\u{00BD}',
    description: 'VULGAR FRACTION ONE HALF',
  },
  'U+2153': {
    codepoint: 0x2153,
    sign: '\u{2153}',
    description: 'VULGAR FRACTION ONE THIRD',
  },
  'U+2154': {
    codepoint: 0x2154,
    sign: '\u{2154}',
    description: 'VULGAR FRACTION TWO THIRDS',
  },
  'U+00BC': {
    codepoint: 0x00bc,
    sign: '\u{00BC}',
    description: 'VULGAR FRACTION ONE QUARTER',
  },
  'U+00BE': {
    codepoint: 0x00be,
    sign: '\u{00BE}',
    description: 'VULGAR FRACTION THREE QUARTERS',
  },
  'U+2155': {
    codepoint: 0x2155,
    sign: '\u{2155}',
    description: 'VULGAR FRACTION ONE FIFTH',
  },
  'U+2156': {
    codepoint: 0x2156,
    sign: '\u{2156}',
    description: 'VULGAR FRACTION TWO FIFTHS',
  },
  'U+2157': {
    codepoint: 0x2157,
    sign: '\u{2157}',
    description: 'VULGAR FRACTION THREE FIFTHS',
  },
  'U+2158': {
    codepoint: 0x2158,
    sign: '\u{2158}',
    description: 'VULGAR FRACTION FOUR FIFTHS',
  },
  'U+2159': {
    codepoint: 0x2159,
    sign: '\u{2159}',
    description: 'VULGAR FRACTION ONE SIXTH',
  },
  'U+215A': {
    codepoint: 0x215a,
    sign: '\u{215A}',
    description: 'VULGAR FRACTION FIVE SIXTHS',
  },
  'U+2150': {
    codepoint: 0x2150,
    sign: '\u{2150}',
    description: 'VULGAR FRACTION ONE SEVENTH',
  },
  'U+215B': {
    codepoint: 0x215b,
    sign: '\u{215B}',
    description: 'VULGAR FRACTION ONE EIGHTH',
  },
  'U+215C': {
    codepoint: 0x215c,
    sign: '\u{215C}',
    description: 'VULGAR FRACTION THREE EIGHTHS',
  },
  'U+215D': {
    codepoint: 0x215d,
    sign: '\u{215D}',
    description: 'VULGAR FRACTION FIVE EIGHTHS',
  },
  'U+215E': {
    codepoint: 0x215e,
    sign: '\u{215E}',
    description: 'VULGAR FRACTION SEVEN EIGHTHS',
  },
  'U+00BA': {
    codepoint: 0x00ba,
    sign: '\u{00BA}',
    description: 'MASCULINE ORDINAL INDICATOR',
  },
  'U+00AA': {
    codepoint: 0x00aa,
    sign: '\u{00AA}',
    description: 'FEMININE ORDINAL INDICATOR',
  },
  'U+2160': {
    codepoint: 0x2160,
    sign: '\u{2160}',
    description: 'ROMAN NUMERAL ONE',
  },
  'U+2161': {
    codepoint: 0x2161,
    sign: '\u{2161}',
    description: 'ROMAN NUMERAL TWO',
  },
  'U+2162': {
    codepoint: 0x2162,
    sign: '\u{2162}',
    description: 'ROMAN NUMERAL THREE',
  },
  'U+2163': {
    codepoint: 0x2163,
    sign: '\u{2163}',
    description: 'ROMAN NUMERAL FOUR',
  },
  'U+2164': {
    codepoint: 0x2164,
    sign: '\u{2164}',
    description: 'ROMAN NUMERAL FIVE',
  },
  'U+2165': {
    codepoint: 0x2165,
    sign: '\u{2165}',
    description: 'ROMAN NUMERAL SIX',
  },
  'U+2166': {
    codepoint: 0x2166,
    sign: '\u{2166}',
    description: 'ROMAN NUMERAL SEVEN',
  },
  'U+2167': {
    codepoint: 0x2167,
    sign: '\u{2167}',
    description: 'ROMAN NUMERAL EIGHT',
  },
  'U+2168': {
    codepoint: 0x2168,
    sign: '\u{2168}',
    description: 'ROMAN NUMERAL NINE',
  },
  'U+2169': {
    codepoint: 0x2169,
    sign: '\u{2169}',
    description: 'ROMAN NUMERAL TEN',
  },
  'U+216A': {
    codepoint: 0x216a,
    sign: '\u{216A}',
    description: 'ROMAN NUMERAL ELEVEN',
  },
  'U+216B': {
    codepoint: 0x216b,
    sign: '\u{216B}',
    description: 'ROMAN NUMERAL TWELVE',
  },
  'U+216C': {
    codepoint: 0x216c,
    sign: '\u{216C}',
    description: 'ROMAN NUMERAL FIFTY',
  },
  'U+216D': {
    codepoint: 0x216d,
    sign: '\u{216D}',
    description: 'ROMAN NUMERAL ONE HUNDRED',
  },
  'U+216E': {
    codepoint: 0x216e,
    sign: '\u{216E}',
    description: 'ROMAN NUMERAL FIVE HUNDRED',
  },
  'U+216F': {
    codepoint: 0x216f,
    sign: '\u{216F}',
    description: 'ROMAN NUMERAL ONE THOUSAND',
  },
  'U+2170': {
    codepoint: 0x2170,
    sign: '\u{2170}',
    description: 'SMALL ROMAN NUMERAL ONE',
  },
  'U+2171': {
    codepoint: 0x2171,
    sign: '\u{2171}',
    description: 'SMALL ROMAN NUMERAL TWO',
  },
  'U+2172': {
    codepoint: 0x2172,
    sign: '\u{2172}',
    description: 'SMALL ROMAN NUMERAL THREE',
  },
  'U+2173': {
    codepoint: 0x2173,
    sign: '\u{2173}',
    description: 'SMALL ROMAN NUMERAL FOUR',
  },
  'U+2174': {
    codepoint: 0x2174,
    sign: '\u{2174}',
    description: 'SMALL ROMAN NUMERAL FIVE',
  },
  'U+2175': {
    codepoint: 0x2175,
    sign: '\u{2175}',
    description: 'SMALL ROMAN NUMERAL SIX',
  },
  'U+2176': {
    codepoint: 0x2176,
    sign: '\u{2176}',
    description: 'SMALL ROMAN NUMERAL SEVEN',
  },
  'U+2177': {
    codepoint: 0x2177,
    sign: '\u{2177}',
    description: 'SMALL ROMAN NUMERAL EIGHT',
  },
  'U+2178': {
    codepoint: 0x2178,
    sign: '\u{2178}',
    description: 'SMALL ROMAN NUMERAL NINE',
  },
  'U+2179': {
    codepoint: 0x2179,
    sign: '\u{2179}',
    description: 'SMALL ROMAN NUMERAL TEN',
  },
  'U+217A': {
    codepoint: 0x217a,
    sign: '\u{217A}',
    description: 'SMALL ROMAN NUMERAL ELEVEN',
  },
  'U+217B': {
    codepoint: 0x217b,
    sign: '\u{217B}',
    description: 'SMALL ROMAN NUMERAL TWELVE',
  },
  'U+217C': {
    codepoint: 0x217c,
    sign: '\u{217C}',
    description: 'SMALL ROMAN NUMERAL FIFTY',
  },
  'U+217D': {
    codepoint: 0x217d,
    sign: '\u{217D}',
    description: 'SMALL ROMAN NUMERAL ONE HUNDRED',
  },
  'U+217E': {
    codepoint: 0x217e,
    sign: '\u{217E}',
    description: 'SMALL ROMAN NUMERAL FIVE HUNDRED',
  },
  'U+2180': {
    codepoint: 0x2180,
    sign: '\u{2180}',
    description: 'ROMAN NUMERAL ONE THOUSAND C D',
  },
  'U+2108': {
    codepoint: 0x2108,
    sign: '\u{2108}',
    description: 'SCRUPLE',
  },
  'U+2114': {
    codepoint: 0x2114,
    sign: '\u{2114}',
    description: 'L B BAR SYMBOL',
  },
  'U+00A3': {
    codepoint: 0x00a3,
    sign: '\u{00A3}',
    description: 'POUND SIGN',
  },
  'U+20A4': {
    codepoint: 0x20a4,
    sign: '\u{20A4}',
    description: 'LIRA SIGN',
  },
  'U+20B0': {
    codepoint: 0x20b0,
    sign: '\u{20B0}',
    description: 'GERMAN PENNY SIGN',
  },
  'U+20B6': {
    codepoint: 0x20b6,
    sign: '\u{20B6}',
    description: 'LIVRE TOURNOIS SIGN',
  },
  'U+00B0': {
    codepoint: 0x00b0,
    sign: '\u{00B0}',
    description: 'DEGREE SIGN',
  },
  'U+2109': {
    codepoint: 0x2109,
    sign: '\u{2109}',
    description: 'DEGREE FAHRENHEIT',
  },
  'U+2033': {
    codepoint: 0x2033,
    sign: '\u{2033}',
    description: 'DOUBLE PRIME',
  },
  'U+2034': {
    codepoint: 0x2034,
    sign: '\u{2034}',
    description: 'TRIPLE PRIME',
  },
  'U+263D': {
    codepoint: 0x263d,
    sign: '\u{263D}',
    description: 'FIRST QUARTER MOON',
  },
  'U+263E': {
    codepoint: 0x263e,
    sign: '\u{263E}',
    description: 'LAST QUARTER MOON',
  },
  'U+263F': {
    codepoint: 0x263f,
    sign: '\u{263F}',
    description: 'MERCURY',
  },
  'U+2640': {
    codepoint: 0x2640,
    sign: '\u{2640}',
    description: 'FEMALE SIGN',
  },
  'U+2641': {
    codepoint: 0x2641,
    sign: '\u{2641}',
    description: 'EARTH',
  },
  'U+2642': {
    codepoint: 0x2642,
    sign: '\u{2642}',
    description: 'MALE SIGN',
  },
  'U+2643': {
    codepoint: 0x2643,
    sign: '\u{2643}',
    description: 'JUPITER',
  },
  'U+2644': {
    codepoint: 0x2644,
    sign: '\u{2644}',
    description: 'SATURN',
  },
  'U+2645': {
    codepoint: 0x2645,
    sign: '\u{2645}',
    description: 'URANUS',
  },
  'U+2646': {
    codepoint: 0x2646,
    sign: '\u{2646}',
    description: 'NEPTUNE',
  },
  'U+2647': {
    codepoint: 0x2647,
    sign: '\u{2647}',
    description: 'PLUTO',
  },
  'U+2648': {
    codepoint: 0x2648,
    sign: '\u{2648}',
    description: 'ARIES',
  },
  'U+2649': {
    codepoint: 0x2649,
    sign: '\u{2649}',
    description: 'TAURUS',
  },
  'U+264A': {
    codepoint: 0x264a,
    sign: '\u{264A}',
    description: 'GEMINI',
  },
  'U+264B': {
    codepoint: 0x264b,
    sign: '\u{264B}',
    description: 'CANCER',
  },
  'U+246C': {
    codepoint: 0x246c,
    sign: '\u{246C}',
    description: 'CIRCLED NUMBER THIRTEEN',
  },
  'U+264D': {
    codepoint: 0x264d,
    sign: '\u{264D}',
    description: 'VIRGO',
  },
  'U+264E': {
    codepoint: 0x264e,
    sign: '\u{264E}',
    description: 'LIBRA',
  },
  'U+264F': {
    codepoint: 0x264f,
    sign: '\u{264F}',
    description: 'SCORPIUS',
  },
  'U+2650': {
    codepoint: 0x2650,
    sign: '\u{2650}',
    description: 'SAGITTARIUS',
  },
  'U+2651': {
    codepoint: 0x2651,
    sign: '\u{2651}',
    description: 'CAPRICORN',
  },
  'U+2652': {
    codepoint: 0x2652,
    sign: '\u{2652}',
    description: 'AQUARIUS',
  },
  'U+2653': {
    codepoint: 0x2653,
    sign: '\u{2653}',
    description: 'PISCES',
  },
  'U+1F700': {
    codepoint: 0x1f700,
    sign: '\u{1F700}',
    description: 'ALCHEMICAL SYMBOL FOR QUINTESSENCE',
  },
  'U+1F701': {
    codepoint: 0x1f701,
    sign: '\u{1F701}',
    description: 'ALCHEMICAL SYMBOL FOR AIR',
  },
  'U+1F702': {
    codepoint: 0x1f702,
    sign: '\u{1F702}',
    description: 'ALCHEMICAL SYMBOL FOR FIRE',
  },
  'U+1F703': {
    codepoint: 0x1f703,
    sign: '\u{1F703}',
    description: 'ALCHEMICAL SYMBOL FOR EARTH',
  },
  'U+1F704': {
    codepoint: 0x1f704,
    sign: '\u{1F704}',
    description: 'ALCHEMICAL SYMBOL FOR WATER',
  },
  'U+1F705': {
    codepoint: 0x1f705,
    sign: '\u{1F705}',
    description: 'ALCHEMICAL SYMBOL FOR AQUAFORTIS',
  },
  'U+1F706': {
    codepoint: 0x1f706,
    sign: '\u{1F706}',
    description: 'ALCHEMICAL SYMBOL FOR AQUA REGIA',
  },
  'U+1F707': {
    codepoint: 0x1f707,
    sign: '\u{1F707}',
    description: 'ALCHEMICAL SYMBOL FOR AQUA REGIA-2',
  },
  'U+1F708': {
    codepoint: 0x1f708,
    sign: '\u{1F708}',
    description: 'ALCHEMICAL SYMBOL FOR AQUA VITAE',
  },
  'U+1F709': {
    codepoint: 0x1f709,
    sign: '\u{1F709}',
    description: 'ALCHEMICAL SYMBOL FOR AQUA VITAE-2',
  },
  'U+1F70A': {
    codepoint: 0x1f70a,
    sign: '\u{1F70A}',
    description: 'ALCHEMICAL SYMBOL FOR VINEGAR',
  },
  'U+1F70B': {
    codepoint: 0x1f70b,
    sign: '\u{1F70B}',
    description: 'ALCHEMICAL SYMBOL FOR VINEGAR-2',
  },
  'U+1F70C': {
    codepoint: 0x1f70c,
    sign: '\u{1F70C}',
    description: 'ALCHEMICAL SYMBOL FOR VINEGAR-3',
  },
  'U+1F70D': {
    codepoint: 0x1f70d,
    sign: '\u{1F70D}',
    description: 'ALCHEMICAL SYMBOL FOR SULFUR',
  },
  'U+1F70E': {
    codepoint: 0x1f70e,
    sign: '\u{1F70E}',
    description: 'ALCHEMICAL SYMBOL FOR PHILOSOPHERS SULFUR',
  },
  'U+1F70F': {
    codepoint: 0x1f70f,
    sign: '\u{1F70F}',
    description: 'ALCHEMICAL SYMBOL FOR BLACK SULFUR',
  },
  'U+1F710': {
    codepoint: 0x1f710,
    sign: '\u{1F710}',
    description: 'ALCHEMICAL SYMBOL FOR MERCURY SUBLIMATE',
  },
  'U+1F711': {
    codepoint: 0x1f711,
    sign: '\u{1F711}',
    description: 'ALCHEMICAL SYMBOL FOR MERCURY SUBLIMATE-2',
  },
  'U+1F712': {
    codepoint: 0x1f712,
    sign: '\u{1F712}',
    description: 'ALCHEMICAL SYMBOL FOR MERCURY SUBLIMATE-3',
  },
  'U+1F713': {
    codepoint: 0x1f713,
    sign: '\u{1F713}',
    description: 'ALCHEMICAL SYMBOL FOR CINNABAR',
  },
  'U+1F714': {
    codepoint: 0x1f714,
    sign: '\u{1F714}',
    description: 'ALCHEMICAL SYMBOL FOR SALT',
  },
  'U+1F715': {
    codepoint: 0x1f715,
    sign: '\u{1F715}',
    description: 'ALCHEMICAL SYMBOL FOR NITRE',
  },
  'U+1F716': {
    codepoint: 0x1f716,
    sign: '\u{1F716}',
    description: 'ALCHEMICAL SYMBOL FOR VITRIOL',
  },
  'U+1F717': {
    codepoint: 0x1f717,
    sign: '\u{1F717}',
    description: 'ALCHEMICAL SYMBOL FOR VITRIOL-2',
  },
  'U+1F718': {
    codepoint: 0x1f718,
    sign: '\u{1F718}',
    description: 'ALCHEMICAL SYMBOL FOR ROCK SALT',
  },
  'U+1F719': {
    codepoint: 0x1f719,
    sign: '\u{1F719}',
    description: 'ALCHEMICAL SYMBOL FOR ROCK SALT-2',
  },
  'U+1F71A': {
    codepoint: 0x1f71a,
    sign: '\u{1F71A}',
    description: 'ALCHEMICAL SYMBOL FOR GOLD',
  },
  'U+1F71B': {
    codepoint: 0x1f71b,
    sign: '\u{1F71B}',
    description: 'ALCHEMICAL SYMBOL FOR SILVER',
  },
  'U+1F71C': {
    codepoint: 0x1f71c,
    sign: '\u{1F71C}',
    description: 'ALCHEMICAL SYMBOL FOR IRON ORE',
  },
  'U+1F71D': {
    codepoint: 0x1f71d,
    sign: '\u{1F71D}',
    description: 'ALCHEMICAL SYMBOL FOR IRON ORE-2',
  },
  'U+1F71E': {
    codepoint: 0x1f71e,
    sign: '\u{1F71E}',
    description: 'ALCHEMICAL SYMBOL FOR CROCUS OF IRON',
  },
  'U+1F71F': {
    codepoint: 0x1f71f,
    sign: '\u{1F71F}',
    description: 'ALCHEMICAL SYMBOL FOR REGULUS OF IRON',
  },
  'U+1F720': {
    codepoint: 0x1f720,
    sign: '\u{1F720}',
    description: 'ALCHEMICAL SYMBOL FOR COPPER ORE',
  },
  'U+1F721': {
    codepoint: 0x1f721,
    sign: '\u{1F721}',
    description: 'ALCHEMICAL SYMBOL FOR IRON-COPPER ORE',
  },
  'U+1F722': {
    codepoint: 0x1f722,
    sign: '\u{1F722}',
    description: 'ALCHEMICAL SYMBOL FOR SUBLIMATE OF COPPER',
  },
  'U+1F723': {
    codepoint: 0x1f723,
    sign: '\u{1F723}',
    description: 'ALCHEMICAL SYMBOL FOR CROCUS OF COPPER',
  },
  'U+1F724': {
    codepoint: 0x1f724,
    sign: '\u{1F724}',
    description: 'ALCHEMICAL SYMBOL FOR CROCUS OF COPPER-2',
  },
  'U+1F725': {
    codepoint: 0x1f725,
    sign: '\u{1F725}',
    description: 'ALCHEMICAL SYMBOL FOR COPPER ANTIMONIATE',
  },
  'U+1F726': {
    codepoint: 0x1f726,
    sign: '\u{1F726}',
    description: 'ALCHEMICAL SYMBOL FOR SALT OF COPPER ANTIMONIATE',
  },
  'U+1F727': {
    codepoint: 0x1f727,
    sign: '\u{1F727}',
    description: 'ALCHEMICAL SYMBOL FOR SUBLIMATE OF SALT OF COPPER',
  },
  'U+1F728': {
    codepoint: 0x1f728,
    sign: '\u{1F728}',
    description: 'ALCHEMICAL SYMBOL FOR VERDIGRIS',
  },
  'U+1F729': {
    codepoint: 0x1f729,
    sign: '\u{1F729}',
    description: 'ALCHEMICAL SYMBOL FOR TIN ORE',
  },
  'U+1F72A': {
    codepoint: 0x1f72a,
    sign: '\u{1F72A}',
    description: 'ALCHEMICAL SYMBOL FOR LEAD ORE',
  },
  'U+1F72B': {
    codepoint: 0x1f72b,
    sign: '\u{1F72B}',
    description: 'ALCHEMICAL SYMBOL FOR ANTIMONY ORE',
  },
  'U+1F72C': {
    codepoint: 0x1f72c,
    sign: '\u{1F72C}',
    description: 'ALCHEMICAL SYMBOL FOR SUBLIMATE OF ANTIMONY',
  },
  'U+1F72D': {
    codepoint: 0x1f72d,
    sign: '\u{1F72D}',
    description: 'ALCHEMICAL SYMBOL FOR SALT OF ANTIMONY',
  },
  'U+1F72E': {
    codepoint: 0x1f72e,
    sign: '\u{1F72E}',
    description: 'ALCHEMICAL SYMBOL FOR SUBLIMATE OF SALT OF ANTIMONY',
  },
  'U+1F72F': {
    codepoint: 0x1f72f,
    sign: '\u{1F72F}',
    description: 'ALCHEMICAL SYMBOL FOR VINEGAR OF ANTIMONY',
  },
  'U+1F730': {
    codepoint: 0x1f730,
    sign: '\u{1F730}',
    description: 'ALCHEMICAL SYMBOL FOR REGULUS OF ANTIMONY',
  },
  'U+1F731': {
    codepoint: 0x1f731,
    sign: '\u{1F731}',
    description: 'ALCHEMICAL SYMBOL FOR REGULUS OF ANTIMONY-2',
  },
  'U+1F732': {
    codepoint: 0x1f732,
    sign: '\u{1F732}',
    description: 'ALCHEMICAL SYMBOL FOR REGULUS',
  },
  'U+1F733': {
    codepoint: 0x1f733,
    sign: '\u{1F733}',
    description: 'ALCHEMICAL SYMBOL FOR REGULUS-2',
  },
  'U+1F734': {
    codepoint: 0x1f734,
    sign: '\u{1F734}',
    description: 'ALCHEMICAL SYMBOL FOR REGULUS-3',
  },
  'U+1F735': {
    codepoint: 0x1f735,
    sign: '\u{1F735}',
    description: 'ALCHEMICAL SYMBOL FOR REGULUS-4',
  },
  'U+1F736': {
    codepoint: 0x1f736,
    sign: '\u{1F736}',
    description: 'ALCHEMICAL SYMBOL FOR ALKALI',
  },
  'U+1F737': {
    codepoint: 0x1f737,
    sign: '\u{1F737}',
    description: 'ALCHEMICAL SYMBOL FOR ALKALI-2',
  },
  'U+1F738': {
    codepoint: 0x1f738,
    sign: '\u{1F738}',
    description: 'ALCHEMICAL SYMBOL FOR MARCASITE',
  },
  'U+1F739': {
    codepoint: 0x1f739,
    sign: '\u{1F739}',
    description: 'ALCHEMICAL SYMBOL FOR SAL-AMMONIAC',
  },
  'U+1F73A': {
    codepoint: 0x1f73a,
    sign: '\u{1F73A}',
    description: 'ALCHEMICAL SYMBOL FOR ARSENIC',
  },
  'U+1F73B': {
    codepoint: 0x1f73b,
    sign: '\u{1F73B}',
    description: 'ALCHEMICAL SYMBOL FOR REALGAR',
  },
  'U+1F73C': {
    codepoint: 0x1f73c,
    sign: '\u{1F73C}',
    description: 'ALCHEMICAL SYMBOL FOR REALGAR-2',
  },
  'U+1F73D': {
    codepoint: 0x1f73d,
    sign: '\u{1F73D}',
    description: 'ALCHEMICAL SYMBOL FOR AURIPIGMENT',
  },
  'U+1F73E': {
    codepoint: 0x1f73e,
    sign: '\u{1F73E}',
    description: 'ALCHEMICAL SYMBOL FOR BISMUTH ORE',
  },
  'U+1F73F': {
    codepoint: 0x1f73f,
    sign: '\u{1F73F}',
    description: 'ALCHEMICAL SYMBOL FOR TARTAR',
  },
  'U+1F740': {
    codepoint: 0x1f740,
    sign: '\u{1F740}',
    description: 'ALCHEMICAL SYMBOL FOR TARTAR-2',
  },
  'U+1F741': {
    codepoint: 0x1f741,
    sign: '\u{1F741}',
    description: 'ALCHEMICAL SYMBOL FOR QUICK LIME',
  },
  'U+1F742': {
    codepoint: 0x1f742,
    sign: '\u{1F742}',
    description: 'ALCHEMICAL SYMBOL FOR BORAX',
  },
  'U+1F743': {
    codepoint: 0x1f743,
    sign: '\u{1F743}',
    description: 'ALCHEMICAL SYMBOL FOR BORAX-2',
  },
  'U+1F744': {
    codepoint: 0x1f744,
    sign: '\u{1F744}',
    description: 'ALCHEMICAL SYMBOL FOR BORAX-3',
  },
  'U+1F745': {
    codepoint: 0x1f745,
    sign: '\u{1F745}',
    description: 'ALCHEMICAL SYMBOL FOR ALUM',
  },
  'U+1F746': {
    codepoint: 0x1f746,
    sign: '\u{1F746}',
    description: 'ALCHEMICAL SYMBOL FOR OIL',
  },
  'U+1F747': {
    codepoint: 0x1f747,
    sign: '\u{1F747}',
    description: 'ALCHEMICAL SYMBOL FOR SPIRIT',
  },
  'U+1F748': {
    codepoint: 0x1f748,
    sign: '\u{1F748}',
    description: 'ALCHEMICAL SYMBOL FOR TINCTURE',
  },
  'U+1F749': {
    codepoint: 0x1f749,
    sign: '\u{1F749}',
    description: 'ALCHEMICAL SYMBOL FOR GUM',
  },
  'U+1F74A': {
    codepoint: 0x1f74a,
    sign: '\u{1F74A}',
    description: 'ALCHEMICAL SYMBOL FOR WAX',
  },
  'U+1F74B': {
    codepoint: 0x1f74b,
    sign: '\u{1F74B}',
    description: 'ALCHEMICAL SYMBOL FOR POWDER',
  },
  'U+1F74C': {
    codepoint: 0x1f74c,
    sign: '\u{1F74C}',
    description: 'ALCHEMICAL SYMBOL FOR CALX',
  },
  'U+1F74D': {
    codepoint: 0x1f74d,
    sign: '\u{1F74D}',
    description: 'ALCHEMICAL SYMBOL FOR TUTTY',
  },
  'U+1F74E': {
    codepoint: 0x1f74e,
    sign: '\u{1F74E}',
    description: 'ALCHEMICAL SYMBOL FOR CAPUT MORTUUM',
  },
  'U+1F74F': {
    codepoint: 0x1f74f,
    sign: '\u{1F74F}',
    description: 'ALCHEMICAL SYMBOL FOR SCEPTER OF JOVE',
  },
  'U+1F750': {
    codepoint: 0x1f750,
    sign: '\u{1F750}',
    description: 'ALCHEMICAL SYMBOL FOR CADUCEUS',
  },
  'U+1F751': {
    codepoint: 0x1f751,
    sign: '\u{1F751}',
    description: 'ALCHEMICAL SYMBOL FOR TRIDENT',
  },
  'U+1F752': {
    codepoint: 0x1f752,
    sign: '\u{1F752}',
    description: 'ALCHEMICAL SYMBOL FOR STARRED TRIDENT',
  },
  'U+1F753': {
    codepoint: 0x1f753,
    sign: '\u{1F753}',
    description: 'ALCHEMICAL SYMBOL FOR LODESTONE',
  },
  'U+1F754': {
    codepoint: 0x1f754,
    sign: '\u{1F754}',
    description: 'ALCHEMICAL SYMBOL FOR SOAP',
  },
  'U+1F755': {
    codepoint: 0x1f755,
    sign: '\u{1F755}',
    description: 'ALCHEMICAL SYMBOL FOR URINE',
  },
  'U+1F756': {
    codepoint: 0x1f756,
    sign: '\u{1F756}',
    description: 'ALCHEMICAL SYMBOL FOR HORSE DUNG',
  },
  'U+1F757': {
    codepoint: 0x1f757,
    sign: '\u{1F757}',
    description: 'ALCHEMICAL SYMBOL FOR ASHES',
  },
  'U+1F758': {
    codepoint: 0x1f758,
    sign: '\u{1F758}',
    description: 'ALCHEMICAL SYMBOL FOR POT ASHES',
  },
  'U+1F759': {
    codepoint: 0x1f759,
    sign: '\u{1F759}',
    description: 'ALCHEMICAL SYMBOL FOR BRICK',
  },
  'U+1F75A': {
    codepoint: 0x1f75a,
    sign: '\u{1F75A}',
    description: 'ALCHEMICAL SYMBOL FOR POWDERED BRICK',
  },
  'U+1F75B': {
    codepoint: 0x1f75b,
    sign: '\u{1F75B}',
    description: 'ALCHEMICAL SYMBOL FOR AMALGAM',
  },
  'U+1F75C': {
    codepoint: 0x1f75c,
    sign: '\u{1F75C}',
    description: 'ALCHEMICAL SYMBOL FOR STRATUM SUPER STRATUM',
  },
  'U+1F75D': {
    codepoint: 0x1f75d,
    sign: '\u{1F75D}',
    description: 'ALCHEMICAL SYMBOL FOR STRATUM SUPER STRATUM-2',
  },
  'U+1F75E': {
    codepoint: 0x1f75e,
    sign: '\u{1F75E}',
    description: 'ALCHEMICAL SYMBOL FOR SUBLIMATION',
  },
  'U+1F75F': {
    codepoint: 0x1f75f,
    sign: '\u{1F75F}',
    description: 'ALCHEMICAL SYMBOL FOR PRECIPITATE',
  },
  'U+1F760': {
    codepoint: 0x1f760,
    sign: '\u{1F760}',
    description: 'ALCHEMICAL SYMBOL FOR DISTILL',
  },
  'U+1F761': {
    codepoint: 0x1f761,
    sign: '\u{1F761}',
    description: 'ALCHEMICAL SYMBOL FOR DISSOLVE',
  },
  'U+1F762': {
    codepoint: 0x1f762,
    sign: '\u{1F762}',
    description: 'ALCHEMICAL SYMBOL FOR DISSOLVE-2',
  },
  'U+1F763': {
    codepoint: 0x1f763,
    sign: '\u{1F763}',
    description: 'ALCHEMICAL SYMBOL FOR PURIFY',
  },
  'U+1F764': {
    codepoint: 0x1f764,
    sign: '\u{1F764}',
    description: 'ALCHEMICAL SYMBOL FOR PUTREFACTION',
  },
  'U+1F765': {
    codepoint: 0x1f765,
    sign: '\u{1F765}',
    description: 'ALCHEMICAL SYMBOL FOR CRUCIBLE',
  },
  'U+1F766': {
    codepoint: 0x1f766,
    sign: '\u{1F766}',
    description: 'ALCHEMICAL SYMBOL FOR CRUCIBLE-2',
  },
  'U+1F767': {
    codepoint: 0x1f767,
    sign: '\u{1F767}',
    description: 'ALCHEMICAL SYMBOL FOR CRUCIBLE-3',
  },
  'U+1F768': {
    codepoint: 0x1f768,
    sign: '\u{1F768}',
    description: 'ALCHEMICAL SYMBOL FOR CRUCIBLE-4',
  },
  'U+1F769': {
    codepoint: 0x1f769,
    sign: '\u{1F769}',
    description: 'ALCHEMICAL SYMBOL FOR CRUCIBLE-5',
  },
  'U+1F76A': {
    codepoint: 0x1f76a,
    sign: '\u{1F76A}',
    description: 'ALCHEMICAL SYMBOL FOR ALEMBIC',
  },
  'U+1F76B': {
    codepoint: 0x1f76b,
    sign: '\u{1F76B}',
    description: 'ALCHEMICAL SYMBOL FOR BATH OF MARY',
  },
  'U+1F76C': {
    codepoint: 0x1f76c,
    sign: '\u{1F76C}',
    description: 'ALCHEMICAL SYMBOL FOR BATH OF VAPOURS',
  },
  'U+1F76D': {
    codepoint: 0x1f76d,
    sign: '\u{1F76D}',
    description: 'ALCHEMICAL SYMBOL FOR RETORT',
  },
  'U+1F76E': {
    codepoint: 0x1f76e,
    sign: '\u{1F76E}',
    description: 'ALCHEMICAL SYMBOL FOR HOUR',
  },
  'U+1F76F': {
    codepoint: 0x1f76f,
    sign: '\u{1F76F}',
    description: 'ALCHEMICAL SYMBOL FOR NIGHT',
  },
  'U+1F770': {
    codepoint: 0x1f770,
    sign: '\u{1F770}',
    description: 'ALCHEMICAL SYMBOL FOR DAY-NIGHT',
  },
  'U+1F771': {
    codepoint: 0x1f771,
    sign: '\u{1F771}',
    description: 'ALCHEMICAL SYMBOL FOR MONTH',
  },
  'U+1F772': {
    codepoint: 0x1f772,
    sign: '\u{1F772}',
    description: 'ALCHEMICAL SYMBOL FOR HALF DRAM',
  },
  'U+1F773': {
    codepoint: 0x1f773,
    sign: '\u{1F773}',
    description: 'ALCHEMICAL SYMBOL FOR HALF OUNCE',
  },
  'U+1F774': {
    codepoint: 0x1f774,
    sign: '\u{1F774}',
    description: 'LOT OF FORTUNE',
  },
  'U+1F775': {
    codepoint: 0x1f775,
    sign: '\u{1F775}',
    description: 'OCCULTATION',
  },
  'U+1F776': {
    codepoint: 0x1f776,
    sign: '\u{1F776}',
    description: 'LUNAR ECLIPSE',
  },
  'U+1F77B': {
    codepoint: 0x1f77b,
    sign: '\u{1F77B}',
    description: 'HAUMEA',
  },
  'U+1F77C': {
    codepoint: 0x1f77c,
    sign: '\u{1F77C}',
    description: 'MAKEMAKE',
  },
  'U+1F77D': {
    codepoint: 0x1f77d,
    sign: '\u{1F77D}',
    description: 'GONGGONG',
  },
  'U+1F77E': {
    codepoint: 0x1f77e,
    sign: '\u{1F77E}',
    description: 'QUAOAR',
  },
  'U+1F77F': {
    codepoint: 0x1f77f,
    sign: '\u{1F77F}',
    description: 'ORCUS',
  },
  'U+1CEE0': {
    codepoint: 0x1cee0,
    sign: '\u{1CEE0}',
    description: 'GEOMANTIC FIGURE POPULUS',
  },
  'U+1CEE1': {
    codepoint: 0x1cee1,
    sign: '\u{1CEE1}',
    description: 'GEOMANTIC FIGURE TRISTITIA',
  },
  'U+1CEE2': {
    codepoint: 0x1cee2,
    sign: '\u{1CEE2}',
    description: 'GEOMANTIC FIGURE ALBUS',
  },
  'U+1CEE3': {
    codepoint: 0x1cee3,
    sign: '\u{1CEE3}',
    description: 'GEOMANTIC FIGURE FORTUNA MAJOR',
  },
  'U+1CEE4': {
    codepoint: 0x1cee4,
    sign: '\u{1CEE4}',
    description: 'GEOMANTIC FIGURE RUBEUS',
  },
  'U+1CEE5': {
    codepoint: 0x1cee5,
    sign: '\u{1CEE5}',
    description: 'GEOMANTIC FIGURE ACQUISITIO',
  },
  'U+1CEE6': {
    codepoint: 0x1cee6,
    sign: '\u{1CEE6}',
    description: 'GEOMANTIC FIGURE CONJUNCTIO',
  },
  'U+1CEE7': {
    codepoint: 0x1cee7,
    sign: '\u{1CEE7}',
    description: 'GEOMANTIC FIGURE CAPUT DRACONIS',
  },
  'U+1CEE8': {
    codepoint: 0x1cee8,
    sign: '\u{1CEE8}',
    description: 'GEOMANTIC FIGURE LAETITIA',
  },
  'U+1CEE9': {
    codepoint: 0x1cee9,
    sign: '\u{1CEE9}',
    description: 'GEOMANTIC FIGURE CARCER',
  },
  'U+1CEEA': {
    codepoint: 0x1ceea,
    sign: '\u{1CEEA}',
    description: 'GEOMANTIC FIGURE AMISSIO',
  },
  'U+1CEEB': {
    codepoint: 0x1ceeb,
    sign: '\u{1CEEB}',
    description: 'GEOMANTIC FIGURE PUELLA',
  },
  'U+1CEEC': {
    codepoint: 0x1ceec,
    sign: '\u{1CEEC}',
    description: 'GEOMANTIC FIGURE FORTUNA MINOR',
  },
  'U+1CEED': {
    codepoint: 0x1ceed,
    sign: '\u{1CEED}',
    description: 'GEOMANTIC FIGURE PUER',
  },
  'U+1CEEE': {
    codepoint: 0x1ceee,
    sign: '\u{1CEEE}',
    description: 'GEOMANTIC FIGURE CAUDA DRACONIS',
  },
  'U+1CEEF': {
    codepoint: 0x1ceef,
    sign: '\u{1CEEF}',
    description: 'GEOMANTIC FIGURE VIA',
  },
}
