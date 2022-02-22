import { createSlice } from '@reduxjs/toolkit'
import uniqid from 'uniqid';

const initialState = localStorage.getItem('transactions')? JSON.parse(localStorage.getItem('transactions')) : []

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (state , action) =>{
      const id = uniqid()
      localStorage.setItem('transactions' , JSON.stringify([...state , {...action.payload , id:id}]))
      return  state = [...state , {...action.payload , id : id}]  
       
    },
    deleteTransaction: (state , action) => {
     
       const res =  state.filter((t)=>{
           return t.id !== action.payload.id  
       })
       localStorage.setItem('transactions' , JSON.stringify(res))
       return res;
    },
  }
})

export const { addTransaction , deleteTransaction } = TransactionSlice.actions
export default TransactionSlice.reducer