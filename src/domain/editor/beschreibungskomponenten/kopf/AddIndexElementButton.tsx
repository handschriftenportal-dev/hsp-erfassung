import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { last } from 'lodash'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { selectComponentChangedHistory } from 'src/domain/erfassung/ErfassungsState'
import { HSPElement } from 'src/infrastructure/slate/HSPElement'
import { getSiblingNodes } from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  insertNewErfassungsElementNode: () => void
  buttonLabel: string
  element: Element
}

export const AddIndexElementButton: FC<Props> = memo(
  ({ insertNewErfassungsElementNode, buttonLabel, element }) => {
    const [showAddButton, setShowAddButton] = useState(false)
    const editor = useSlateStatic()
    const componentChangedHistory = useSelector(selectComponentChangedHistory)
    const { data_indexName, id } = element

    const showAddButtonForIndexName = useCallback(() => {
      const indexNameChilds = getSiblingNodes(editor, element).filter(
        (child) =>
          HSPElement.isElement(child) &&
          HSPElement.checkAttributes(
            {
              origin: 'index',
              indexName: data_indexName,
            },
            child
          )
      )
      const { id: last_id = '' } = (last(indexNameChilds) as Element) ?? {}
      return last_id === id
    }, [editor, element])

    useEffect(() => {
      if (showAddButtonForIndexName() !== showAddButton) {
        setShowAddButton(showAddButtonForIndexName)
      }
    }, [showAddButton, componentChangedHistory, showAddButtonForIndexName])

    const handleOnClick = useCallback(() => {
      setShowAddButton(false)
      insertNewErfassungsElementNode()
    }, [insertNewErfassungsElementNode])

    return (
      <>
        {showAddButton && (
          <Grid
            className={'small-bottom-gab'}
            style={{ float: 'right' }}
            item
            xs={4}
          >
            <Button
              data-testid="addIndexElementButton"
              startIcon={<Add />}
              onClick={handleOnClick}
              className={'black-add-button-style'}
              size="small"
              variant="text"
            >
              {buttonLabel}
            </Button>
          </Grid>
        )}
        {!showAddButton && null}
      </>
    )
  }
)
