import { Grid } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { AddErfassungElementChildrenNodeButton } from 'src/domain/editor/beschreibungskomponenten/AddErfassungElementChildrenNodeButton'
import { useInsertNewTEINodeForIndexNormData } from 'src/domain/editor/beschreibungskomponenten/kopf/HeadCustomHooks'
import { OrigPlaceNormdatenVerknuepfung } from 'src/domain/editor/beschreibungskomponenten/kopf/OrigPlaceNormdatenVerknuepfung'
import { LabelledTextField } from 'src/domain/editor/LabelledTextField'
import { TitleTwoColumnElement } from 'src/domain/editor/TitleTwoColumnElement'
import { ENTSTEHUNGSORT_NORMDATUM } from 'src/domain/erfassung/TEIConstants'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'

interface Props {
  element: Element
}

export const OrigPlace: FC<Props> = memo(({ element }) => {
  const editor = useSlateStatic()
  const { t } = useTranslation()

  const { data_indexName = '' } = element
  const termElements = element.children as Element[]
  const [firstTermElement] = termElements
  const insertNewOrigPlaceGndID = useInsertNewTEINodeForIndexNormData(
    data_indexName,
    editor,
    firstTermElement,
    ENTSTEHUNGSORT_NORMDATUM,
    1
  )
  const { repeatable } = ErfassungsRegeln.termRegel(
    data_indexName,
    ENTSTEHUNGSORT_NORMDATUM
  )

  return (
    <Grid className={'big-top-gab'} container>
      <Grid item xs={12} className={'small-bottom-gab'}>
        <TitleTwoColumnElement
          element={element}
          title={t('editor.orig_place')}
          helpText={t('editor.help_text.orig_place')}
        />
      </Grid>

      <Grid className={'group-beschreibungs-element-with-line'} item xs={12}>
        <Grid className={'small-bottom-gab'} container>
          <LabelledTextField
            label={t('editor.free_text')}
            element={firstTermElement}
            paddingLeft={'24px'}
          />
        </Grid>

        {termElements
          .filter(HSPNode.isOrigPlaceNormElement)
          .map((element, index) => (
            <OrigPlaceNormdatenVerknuepfung key={index} element={element} />
          ))}
        {repeatable && (
          <Grid item xs={11}>
            <AddErfassungElementChildrenNodeButton
              insertNewErfassungElementChildrenNode={insertNewOrigPlaceGndID}
              buttonLabel={t('editor.linked_normdata')}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
})
