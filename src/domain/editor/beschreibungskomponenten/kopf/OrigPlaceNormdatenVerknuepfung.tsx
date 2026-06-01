import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSlateStatic } from 'slate-react'
import { DeleteSlateNodeButton } from 'src/domain/editor/DeleteSlateNodeButton'
import { NormdatenAutocomplete } from 'src/domain/editor/normdaten/NormdatenAutocomplete'
import { NormdatenUtilities } from 'src/domain/editor/normdaten/NormdatenUtilities'
import { useNormdatenFindById } from 'src/domain/editor/normdaten/useNormdaten'
import { GNDEntityFact } from 'src/domain/erfassung/GNDEntityFact'
import { NormdatenService } from 'src/domain/erfassung/NormdatenService'
import type { OrigPlaceNormTermElement } from 'src/infrastructure/slate/HSPElement'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

interface Props {
  element: OrigPlaceNormTermElement
}

export const OrigPlaceNormdatenVerknuepfung: FC<Props> = memo(({ element }) => {
  const { t } = useTranslation()
  const editor = useSlateStatic()
  const { data_ref = '', data_key = '' } = element
  const gndId = NormdatenUtilities.urlToId(data_ref)

  const [places, setPlaces] = useState<GNDEntityFact[]>([])
  const [autoCompleteGndEntity, setAutoCompleteGndEntity] =
    useState<GNDEntityFact>(() =>
      GNDEntityFact.new({
        preferredName: HSPNode.extractFirstText(element),
        gndIdentifier: gndId,
        id: data_key,
      })
    )

  useNormdatenFindById(gndId, setAutoCompleteGndEntity)

  return (
    <Grid className={'small-bottom-gab'} container>
      <Grid item xs={3} style={{ display: 'table', paddingLeft: '24px' }}>
        <span className={'align-display-table-cell-vertical-align'}>
          {t('editor.linked_normdata')}:{' '}
        </span>
      </Grid>
      <Grid item xs={8}>
        <NormdatenAutocomplete
          gndOptions={places}
          gndOptionsSetter={setPlaces}
          origin={NormdatenService.nodeLabel.ort}
          termElement={element}
          editor={editor}
          autoCompleteGndEntity={autoCompleteGndEntity}
          setAutoCompleteGndEntity={setAutoCompleteGndEntity}
        />
      </Grid>
      <Grid item xs={1}>
        <DeleteSlateNodeButton element={element} />
      </Grid>
    </Grid>
  )
})
