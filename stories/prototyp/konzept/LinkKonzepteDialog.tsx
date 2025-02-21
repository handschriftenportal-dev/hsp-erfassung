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

import { ExpandLess, ExpandMore, Info, OpenInNew } from '@mui/icons-material'
import {
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material'
import { FC } from 'react'

interface Props {
  layout?: 'external_link' | 'tooltip' | 'description_view'
}

const scrollStyle = { maxHeight: 300, overflow: 'auto' }
const definition = `Der spätbyzantinischen Notation liegt das gleiche System
zugrunde wie der mittelbyzantinischen, doch unterscheidet sie
sich von dieser durch eine größere Anzahl an Notenzeichen. Ein
weiteres Merkmal der spätbyzantinischen Notation sind rote
Hypostasen, die erstmals Ende des 13. Jh. auftreten und seit
dem 14. Jh so zahlreich werden, dass man aufgrund dieses
Kennzeichens eine eigene Bezeichnung für die Notationsform
prägt. Parallel etablierte sich ein neues Repertoire
(kalophonischer Stil). Das Notationssystem hat bis zur Reform
der Drei Lehrer im ersten Viertel des 19. Jh. Gültigkeit
(Haas) // \nAbweichende Definition in Grove music online:
  ,Late- Byzantine‘ and ,Post-Byzantine‘ notation refers to the
continued use of Middle Byzantine notation between the 15th
and 19th centuries and distinguishes those musical manuscripts
copied mainly after the fall of Constantinople into Turkish
hands (29 May 1453) from those written in preceding centuries.`

const ExampleTree: FC<Props> = ({ layout }) => {
  return (
    <List style={scrollStyle}>
      <ListItemButton>
        <ListItemText primary="Farben" />
      </ListItemButton>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Primärfarben" />
          <ListItemIcon>
            <ExpandLess />
          </ListItemIcon>
        </ListItemButton>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Blau" />
            <ListItemIcon>
              <ExpandLess />
            </ListItemIcon>
          </ListItemButton>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 12 }} selected>
              <ListItemText primary="Muschelblau" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 12 }}>
              <ListItemText primary="Zink" />
              {layout === 'tooltip' && (
                <Tooltip title={definition}>
                  <IconButton>
                    <Info />
                  </IconButton>
                </Tooltip>
              )}
            </ListItemButton>
          </List>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Rot" />
            <ListItemIcon>
              <ExpandMore />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Grün" />
            {layout === 'external_link' && (
              <IconButton
                target="_blank"
                href="http://b-dev1047.pk.de:9299/vocabulary/musicNotation/Sp%C3%A4tbyzantinische%20Notation"
              >
                <OpenInNew />
              </IconButton>
            )}
            <ListItemIcon>
              <ExpandMore />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </List>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Sekundärfarben" />
          <ListItemIcon>
            <ExpandMore />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </List>
  )
}

export const LinkKonzepteDialog: FC<Props> = ({
  layout = 'description_view',
}) => {
  return (
    <Dialog open={true} maxWidth={'lg'}>
      <DialogTitle>Musiknotation</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            variant="standard"
            autoFocus={true}
            fullWidth
            label="Verknüpfter Text"
            defaultValue="5-linien Notation in Blau"
          />

          <Breadcrumbs aria-label="breadcrumb" separator="›" maxItems={2}>
            <Chip
              color="primary"
              label="Farben"
              size="small"
              component="a"
              icon={<ExpandMore />}
            />
            <Chip label="Primärfarben" size="small" />
            <Chip label="Blau" size="small" />
            <Chip label="Muschelblau" size="small" />
          </Breadcrumbs>
          <Breadcrumbs aria-label="breadcrumb" separator="›" maxItems={2}>
            <Chip
              color="primary"
              component="a"
              icon={<ExpandMore />}
              label="Liniensystem"
              size="small"
              variant="outlined"
            />
            <Chip label="5-Liniensystem" size="small" />
            <Chip label="Altgotisch" size="small" />
          </Breadcrumbs>
          <Breadcrumbs aria-label="breadcrumb" separator="›" maxItems={2}>
            <Chip
              color="primary"
              component="a"
              icon={<ExpandMore />}
              label="Notation"
              size="small"
              variant="outlined"
            />
            <Chip label="Foe" size="small" />
            <Chip label="Bax" size="small" />
            <Chip label="Fox" size="small" />
          </Breadcrumbs>

          <div>
            <Chip
              color="primary"
              component="a"
              icon={<ExpandMore />}
              label="+"
              size="small"
              variant="outlined"
            />
          </div>

          <Divider />

          {layout === 'description_view' ? (
            <Grid container spacing={2}>
              <Grid xs={6}>
                <ExampleTree layout={layout} />
              </Grid>
              <Grid xs={6} style={scrollStyle}>
                <Card variant="outlined">{definition}</Card>
              </Grid>
            </Grid>
          ) : (
            <ExampleTree layout={layout} />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button>Abbrechen</Button>
        <Button variant="contained">Verknüpfen</Button>
      </DialogActions>
    </Dialog>
  )
}
