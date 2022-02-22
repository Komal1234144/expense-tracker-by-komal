import { configureStore } from '@reduxjs/toolkit'
import TransactionSlice from './TransactionSlice'

export const store = configureStore({
  reducer: {
      transaction : TransactionSlice
  },
})