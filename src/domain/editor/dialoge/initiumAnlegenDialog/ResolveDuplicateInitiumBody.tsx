import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import { parseInt } from 'lodash'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { PropsOf } from 'src/domain/editor/dialoge/initiumAnlegenDialog/InitiumAnlegenDialogBody.types'
import { NotationChip } from 'src/domain/editor/dialoge/themenbereichDialog/komponenten/NotationChip'
import { TranslatedText } from 'src/domain/erfassung/TranslatedText'

export const ResolveDuplicateInitiumBody: FC<
  PropsOf<'resolving_duplicates'>
> = ({ dispatch, state }) => {
  const { i18n, t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const duplicates = state.duplicates
  return (
    <>
      <DialogContent>
        <Typography variant="body1" color="textPrimary">
          {t('initium_anlegen_dialog.resolve_duplicates_text', {
            count: duplicates.length,
          })}
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="create_new"
            onChange={(event) =>
              setSelectedIndex(parseInt(event.target.value, 10))
            }
          >
            <FormLabel id="create_new" focused={false}>
              <strong>
                {t(
                  'initium_anlegen_dialog.resolve_duplicates_create_new_initium_text'
                )}
              </strong>
            </FormLabel>
            <FormControlLabel
              checked={selectedIndex === 0}
              value={0}
              control={<Radio />}
              labelPlacement="end"
              label={
                <ListItemText
                  primary={state.text}
                  slotProps={{ secondary: { component: 'span' } }}
                  secondary={
                    <>
                      {state.languages.map((language) => (
                        <Chip
                          key={language.id}
                          size="small"
                          label={language.preferredName}
                        />
                      ))}
                    </>
                  }
                />
              }
            />
            <FormLabel id="use_existing" focused={false}>
              <strong>
                {t(
                  'initium_anlegen_dialog.resolve_duplicates_use_existing_initium_text'
                )}
              </strong>
            </FormLabel>
            <Stack direction="column" spacing={1}>
              {duplicates.map((initium, index) => (
                <FormControlLabel
                  key={initium.id}
                  checked={selectedIndex === index + 1}
                  value={index + 1}
                  control={<Radio />}
                  labelPlacement="end"
                  label={
                    <ListItemText
                      primary={initium.text}
                      slotProps={{ secondary: { component: 'span' } }}
                      secondary={
                        <>
                          <NotationChip
                            noFloat
                            notation={initium.id}
                            uri={initium.uri}
                          />
                          {initium.languages.map((language) => (
                            <Chip
                              key={language.id}
                              size="small"
                              label={TranslatedText.forLanguage(
                                language.variantName,
                                i18n.language
                              )}
                            />
                          ))}
                        </>
                      }
                    />
                  }
                />
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch({ type: 'cancel' })}>
          {t('initium_anlegen_dialog.cancel_action')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'enter_initium' })}
        >
          {t('initium_anlegen_dialog.back_action')}
        </Button>
        {selectedIndex === 0 ? (
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'submit' })}
          >
            {t('initium_anlegen_dialog.create_action')}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() =>
              dispatch({
                type: 'use_initium',
                initium: duplicates[selectedIndex - 1],
              })
            }
          >
            {t('initium_anlegen_dialog.reuse_action')}
          </Button>
        )}
      </DialogActions>
    </>
  )
}
