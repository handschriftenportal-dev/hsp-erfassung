import type { BaseEditor, BaseElement, BaseText } from 'slate'
import type { HistoryEditor } from 'slate-history'
import type { ReactEditor } from 'slate-react'
import type {
  DataAttributes,
  ErfassungsEditor,
  ErfassungsElement,
  ErfassungsText,
} from 'src/domain/erfassung/ErfassungsEditor'

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & ErfassungsEditor
    Element: BaseElement & ErfassungsElement & DataAttributes
    Text: BaseText & ErfassungsText
  }
}
