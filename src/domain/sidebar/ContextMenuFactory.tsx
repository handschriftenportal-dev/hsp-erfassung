import { AddCircleOutlined, DeleteOutline, MoreVert } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Menu, Tooltip } from '@mui/material'
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { Descendant, Editor } from 'slate'
import { HSP_EDITOR_ID } from 'src/domain/editor/HSPEditor'
import { sendValidateTEIEvent } from 'src/domain/editor/HSPEditorDomainEvents'
import { AddChildIcon } from 'src/domain/editor/icons/AddChildIcon'
import { DuplicateBlackIcon } from 'src/domain/editor/icons/DuplicateBlackIcon'
import {
  allowedChildComponentOptions,
  allowedFollowerComponentOptions,
  createBeschreibungsComponents,
  firstValidPosition,
  isDeletableComponent,
} from 'src/domain/erfassung/ErfassungsGuideline'
import {
  selectReadOnly,
  selectSidebarState,
  updateContentChanged,
  updateSlate,
} from 'src/domain/erfassung/ErfassungsState'
import { useGlobalModalContext } from 'src/infrastructure/modal/GlobalModal'
import type { Komponente } from 'src/infrastructure/slate/ErfassungsRegeln'
import { ErfassungsRegeln } from 'src/infrastructure/slate/ErfassungsRegeln'
import {
  findSlateTargetPath,
  findWrapper,
  insertSlateNode,
} from 'src/infrastructure/slate/SlateBoundary'

import { DuplicateDialog } from './DuplicateDialog'
import { KomponenteLoeschenDialog } from './KomponenteLoeschenDialog'
import { KomponentenAuswahlDialog } from './KomponentenAuswahlDialog'
import type { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  beschreibung: SidebarEintragModel
  editor: Editor
}

export const ContextMenuFactory: FC<Props> = memo(
  ({ beschreibung, editor }) => {
    const { showModal } = useGlobalModalContext()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const readOnly = useSelector(selectReadOnly)
    const sidebar = useSelector(selectSidebarState)
    const hspEditorContainer = document.getElementById(HSP_EDITOR_ID)
    const popupState = usePopupState({
      variant: 'popover',
      popupId: 'sidebarcontextmenu',
    })

    const childKomponentOptions = allowedChildComponentOptions(
      sidebar,
      beschreibung
    )
    const addKomponentOptions = allowedFollowerComponentOptions(
      sidebar,
      beschreibung
    )
    const isDuplicable = ErfassungsRegeln.komponentenRegel(
      beschreibung.teiElement
    ).duplicate

    const updateSidebarAndValidate = useCallback(
      (newEditorContent: Descendant[]) => {
        dispatch(updateSlate(newEditorContent))
        popupState.close()
        sendValidateTEIEvent()
        dispatch(updateContentChanged(true))
      },
      [dispatch, popupState]
    )

    const insertChildComponent = useCallback(
      (beschreibung: SidebarEintragModel, komponente: Komponente) => {
        const existingWrapper =
          ErfassungsRegeln.komponentenRegel(komponente)?.wrapperElement &&
          findWrapper(editor, komponente, beschreibung, sidebar, true)
        const element = createBeschreibungsComponents(
          beschreibung,
          komponente as Komponente,
          existingWrapper !== undefined,
          true,
          sidebar
        )

        const firstValidChildPosition = firstValidPosition(
          beschreibung.children,
          komponente
        )
        const path = existingWrapper?.[1] || beschreibung.path
        const targetPath = [...path, firstValidChildPosition]

        insertSlateNode(editor, element, targetPath, dispatch, beschreibung.id)
        updateSidebarAndValidate(editor.children)
      },
      [dispatch, editor, sidebar, updateSidebarAndValidate]
    )

    const insertComponent = useCallback(
      (beschreibung: SidebarEintragModel, komponente: Komponente) => {
        const existingWrapper =
          ErfassungsRegeln.komponentenRegel(komponente as Komponente)
            ?.wrapperElement &&
          findWrapper(editor, komponente, beschreibung, sidebar, false)
        const element = createBeschreibungsComponents(
          beschreibung,
          komponente as Komponente,
          !!existingWrapper,
          false,
          sidebar
        )
        const targetPath = findSlateTargetPath(
          editor,
          komponente,
          beschreibung,
          existingWrapper,
          sidebar
        )
        insertSlateNode(editor, element, targetPath, dispatch, beschreibung.id)
        updateSidebarAndValidate(editor.children)
      },
      [dispatch, editor, sidebar, updateSidebarAndValidate]
    )

    const showDuplicateDialog = () => {
      popupState.close()
      showModal(<DuplicateDialog beschreibung={beschreibung} editor={editor} />)
    }
    const showComponentKomponentenAuswahlDialog = () => {
      popupState.close()
      showModal(
        <KomponentenAuswahlDialog
          type="component"
          beschreibung={beschreibung}
          komponentOptions={addKomponentOptions}
          insert={insertComponent}
        />
      )
    }
    const showChildKomponentenAuswahlDialog = () => {
      popupState.close()
      showModal(
        <KomponentenAuswahlDialog
          type="child"
          beschreibung={beschreibung}
          komponentOptions={childKomponentOptions}
          insert={insertChildComponent}
        />
      )
    }
    const showKomponenteLoeschenDialog = () => {
      popupState.close()
      showModal(
        <KomponenteLoeschenDialog
          editor={editor}
          beschreibung={beschreibung}
          callback={updateSidebarAndValidate}
        />
      )
    }

    return readOnly ? (
      <></>
    ) : (
      <div role="menu">
        <Tooltip title={t('sidebar.add_and_delete')} arrow>
          <IconButton
            role="openContextMenuButton"
            {...bindTrigger(popupState)}
            size="large"
            disableRipple
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Menu {...bindMenu(popupState)} container={hspEditorContainer}>
          <Tooltip title={t('sidebar.close')} arrow>
            <IconButton
              role="closeContextMenuButton"
              onClick={popupState.close}
              size="large"
            >
              <CloseIcon fontSize={'small'} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('sidebar.add_component')} arrow>
            <>
              {/* Fragment necessary: disabled button cannot have tooltip */}
              <IconButton
                onClick={showComponentKomponentenAuswahlDialog}
                id="addComponentButton"
                disableTouchRipple
                disabled={addKomponentOptions.length === 0}
                size="large"
              >
                <AddCircleOutlined fontSize={'small'} />
              </IconButton>
            </>
          </Tooltip>
          <Tooltip title={t('sidebar.add_child_component')} arrow>
            <>
              {/* Fragment necessary: disabled button cannot have tooltip */}
              <IconButton
                onClick={showChildKomponentenAuswahlDialog}
                id="addChildInComponentButton"
                disableTouchRipple
                disabled={childKomponentOptions.length === 0}
                size="large"
              >
                <AddChildIcon />
              </IconButton>
            </>
          </Tooltip>
          {isDuplicable && (
            <Tooltip title={t('sidebar.duplicate')} arrow>
              <IconButton
                onClick={showDuplicateDialog}
                id="duplicateElementButton"
                disableTouchRipple
                className={'override-duplicate-svgicon-color'}
                size="large"
              >
                <DuplicateBlackIcon />
              </IconButton>
            </Tooltip>
          )}
          {isDeletableComponent(beschreibung) && (
            <Tooltip title={t('sidebar.delete_component')} arrow>
              <IconButton
                onClick={showKomponenteLoeschenDialog}
                disableTouchRipple
                size="large"
              >
                <DeleteOutline fontSize={'small'} />
              </IconButton>
            </Tooltip>
          )}
        </Menu>
      </div>
    )
  }
)
