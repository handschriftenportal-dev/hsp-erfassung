import { TextField } from '@mui/material'
import type { FC, ReactNode } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { Element as ScrollAnchor } from 'react-scroll'
import type { Element } from 'slate'
import { useSlateStatic } from 'slate-react'
import { useGlobalerEinfuegeContext } from 'src/infrastructure/slate/einfuegeservice/GlobalerEinfuegeService'
import { HSPNode } from 'src/infrastructure/slate/HSPNode'
import { createInsertTextChangeEventHandler } from 'src/infrastructure/slate/SlateBoundary'

interface Props {
  element: Element
  label?: string | undefined
  labelledBy?: string | undefined
  maxRows?: number
  showError?: boolean | undefined
  helperText?: ReactNode
}

export const BeschreibungsTextField: FC<Props> = memo(
  ({ element, label, labelledBy, maxRows = 1, showError, helperText }) => {
    const editor = useSlateStatic()
    const ref = useRef<HTMLInputElement>(null)
    const [cursor, setCursor] = useState<number | null>(null)
    const { error, id = '' } = element
    const textContent = HSPNode.extractFirstText(element)
    const { setTargetToElement } = useGlobalerEinfuegeContext()

    useEffect(() => {
      if (ref.current) {
        ref.current.setSelectionRange(cursor, cursor)
      }
    }, [ref, cursor, textContent])

    return (
      <ScrollAnchor name={id}>
        <TextField
          fullWidth
          size="small"
          // role="input"
          variant="filled"
          aria-labelledby={labelledBy}
          error={showError ?? !!error}
          helperText={helperText ?? (error && 'Error')}
          inputRef={ref}
          label={label}
          multiline={maxRows > 1}
          maxRows={maxRows}
          value={textContent}
          onChange={(e) => {
            setCursor(e.target.selectionStart)
            createInsertTextChangeEventHandler(editor, element)(e)
          }}
          slotProps={{
            input: {
              className: 'text-field-input-style',
              onBlur: (event) => {
                setTargetToElement(
                  editor,
                  element,
                  event.target as HTMLInputElement
                )
              },
            },
          }}
        />
      </ScrollAnchor>
    )
  }
)
