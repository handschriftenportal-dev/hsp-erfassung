import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import type { LobidEntity } from 'src/infrastructure/normdaten/LobidEntity'

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
