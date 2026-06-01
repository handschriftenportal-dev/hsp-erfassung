import { configureStore } from '@reduxjs/toolkit'
import ErfassungsReducer from 'src/domain/erfassung/ErfassungsState'

export default configureStore({
  reducer: {
    erfassung: ErfassungsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }),
})
