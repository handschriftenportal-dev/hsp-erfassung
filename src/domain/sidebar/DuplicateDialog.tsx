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

import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material'
import { cloneDeep } from 'lodash'
import {
  ChangeEventHandler,
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Editor, Element, Node, Path } from 'slate'
import { v4 as uuid } from 'uuid'

import { useGlobalModalContext } from '../../infrastructure/modal/GlobalModal'
import {
  editorNode,
  insertSlateNodes,
} from '../../infrastructure/slate/SlateBoundary'
import { HSP_ERFASSUNGS_EDITOR_ID } from '../editor/HSPEditor'
import { SidebarEintragModel } from './SidebarEintragFactory'

interface Props {
  beschreibung: SidebarEintragModel
  editor: Editor
}

export const DuplicateDialog: FC<Props> = memo(({ beschreibung, editor }) => {
  const { hideModal } = useGlobalModalContext()
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const duplicateBeschreibungskomponente: (
    path: Path
  ) => MouseEventHandler<HTMLButtonElement> = (path) => (event) => {
    event.preventDefault()
    function copy(node: Node, amount: number): Node[] {
      function deepEnrichElementsWithId(node: Node): void {
        if (Element.isElement(node)) {
          ;(node as any).id = uuid()
          node.children.forEach(deepEnrichElementsWithId)
        }
      }
      function newCopy(): Node {
        const copy = cloneDeep(node)
        deepEnrichElementsWithId(copy)
        return copy
      }
      if (amount < 1 || !Number.isSafeInteger(amount)) {
        console.error(
          `Can't copy node. Amount needs to be an positive (safe) integer, but is '${amount}'`,
          node
        )
        return []
      }
      return Array.from({ length: amount }, newCopy)
    }

    const [node] = editorNode(editor, path)
    insertSlateNodes(editor, copy(node, amount), path, dispatch)
    hideModal()
  }

  const handleAmountChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault()
      setAmount(parseInt(event.target.value))
    },
    [setAmount]
  )

  return (
    <Dialog
      container={document.getElementById(HSP_ERFASSUNGS_EDITOR_ID)}
      open={true}
    >
      <DialogTitle style={{ width: '300px' }}>
        {t('sidebar.duplicate_dialog')}
        <IconButton
          style={{ float: 'right' }}
          onClick={hideModal}
          title={'Close'}
          size="large"
        >
          <CloseIcon fontSize={'small'} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ height: '150px' }}>
        <DialogContentText>{t(beschreibung.label)}</DialogContentText>
        <DialogContentText style={{ marginBottom: '25px' }}>
          {t('sidebar.duplicate_with_child_components')}
        </DialogContentText>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              type={'number'}
              value={amount}
              onChange={handleAmountChange}
              variant={'outlined'}
              style={{
                flexDirection: 'unset',
                height: '36.5px',
                width: '70px',
              }}
              slotProps={{
                htmlInput: { maxLength: 3 },
              }}
            />
            &times;
            <Button
              data-testid={'duplicate'}
              className={'override-duplicate-dialog-bottom-color'}
              style={{ width: '100px' }}
              autoFocus
              onClick={duplicateBeschreibungskomponente(beschreibung.path)}
              color="primary"
            >
              {t('sidebar.create')}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
})
