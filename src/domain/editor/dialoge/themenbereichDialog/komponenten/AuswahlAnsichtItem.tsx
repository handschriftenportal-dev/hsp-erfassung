import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import type { Dispatch, FC } from 'react'
import { memo, useCallback } from 'react'
import { AuswahlItem } from 'src/domain/editor/dialoge/themenbereichDialog/AuswahlItem'
import type { ThemenbereichDialogAction } from 'src/domain/editor/dialoge/themenbereichDialog/ThemenbereichDialogReducer'
import type { ThemenbereicheAPI } from 'src/domain/erfassung/ThemenbereicheAPI'

import { EinzelAuswahl } from './EinzelAuswahlMenge'
import { MehrfachAuswahl } from './MehrfachAuswahlMenge'
import { NotationChip } from './NotationChip'
import { NotwendigeBegriffe } from './NotwendigeBegriffe'
import { OptionaleBegriffe } from './OptionaleBegriffe'
import { UnbekannteAusgewaehlteNotationItem } from './UnbekannteAusgewaehlteNotationItem'

interface Props {
  dispatch: Dispatch<ThemenbereichDialogAction>
  api: ThemenbereicheAPI
  item: AuswahlItem
  readOnly?: boolean
  disabled?: boolean
  checked?: boolean
  onClick?: (id: string) => void
}

export const AuswahlAnsichtItem: FC<Props> = memo(
  ({
    dispatch,
    api,
    item,
    onClick,
    readOnly = false,
    disabled = false,
    checked = true,
  }) => {
    const begriff = api.begriff(item)

    const clickHandler = useCallback(() => {
      if (disabled) {
        return
      }
      const { id } = item
      if (onClick) {
        onClick(id)
      } else {
        dispatch({
          type: 'removeBegriff',
          payload: id,
        })
      }
    }, [dispatch, disabled, item, onClick])

    if (begriff == undefined) {
      return (
        <UnbekannteAusgewaehlteNotationItem
          readOnly={readOnly}
          notation={item.id}
          key={item.id}
          onClick={clickHandler}
        />
      )
    }
    const {
      identifier: { notation, uri },
      label,
    } = begriff
    return (
      <>
        <ListItem>
          {!readOnly && (
            <ListItemIcon className={'narrow-list-item'}>
              <Checkbox
                edge="end"
                checked={checked}
                disabled={disabled}
                onClick={clickHandler}
              />
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <>
                <NotationChip notation={notation} uri={uri} />
                {label}
              </>
            }
          />
        </ListItem>
        {AuswahlItem.isFachbegriffItem(item) && (
          <>
            <NotwendigeBegriffe api={api} dispatch={dispatch} item={item} />
            <OptionaleBegriffe api={api} dispatch={dispatch} item={item} />
            {item.beziehungen.einzelAuswahlMengen.map((menge) => (
              <EinzelAuswahl
                key={menge.id}
                api={api}
                dispatch={dispatch}
                item={item}
                begriffsMenge={menge}
              />
            ))}
            {item.beziehungen.mehrfachAuswahlMengen.map((menge) => (
              <MehrfachAuswahl
                key={menge.id}
                api={api}
                dispatch={dispatch}
                item={item}
                begriffsMenge={menge}
              />
            ))}
          </>
        )}
      </>
    )
  }
)
