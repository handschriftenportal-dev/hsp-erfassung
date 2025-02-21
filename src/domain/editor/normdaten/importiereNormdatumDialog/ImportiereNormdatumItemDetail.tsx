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

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { LobidEntity } from '../../../../infrastructure/normdaten/LobidEntity'

interface Props {
  item: LobidEntity
}

export const ImportiereNormdatumItemDetail: FC<Props> = ({ item }) => {
  const { t } = useTranslation()
  const { preferredName, depiction, details } = item
  const leftWidth = depiction !== undefined ? 8 : 12

  return (
    <Grid container spacing={2}>
      <Grid item xs={leftWidth}>
        <Typography variant="h5" component={'div'} gutterBottom>
          {preferredName}
        </Typography>
      </Grid>
      {depiction && (
        <Grid item xs={4}>
          <img
            src={depiction}
            alt={t(`import_normdata_dialog.depiction`, { preferredName })}
            style={{ maxWidth: '100%' }}
          />
        </Grid>
      )}

      {details && (
        <Grid item xs={12}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {details.map(([key, values], index) => (
                  <Fragment key={key}>
                    <TableRow>
                      <TableCell
                        scope="row"
                        rowSpan={values.length + 1}
                        component="td"
                        variant="head"
                      >
                        {t(`import_normdata_dialog.details.${key}`, key)}
                      </TableCell>
                    </TableRow>
                    {values.map((value, vIndex) => (
                      <TableRow key={`${key}-${index}-${vIndex}`}>
                        <TableCell align="left">{value}</TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  )
}
