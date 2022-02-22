import React from 'react'
import {MoneyOff, Delete, Money} from '@mui/icons-material';
import './List.css';
import { Typography } from '@mui/material';
import { deleteTransaction } from '../../redux/TransactionSlice';
import { useDispatch } from 'react-redux';

const List = ({transaction}) => {

const dispatch = useDispatch();

  return (
    <div className= 'list__container'>
      <div className='money' id={transaction.type ==='Income' ? 'income' : 'expense'}>
        <MoneyOff/>
      </div>
      <div className='detail'>
       <Typography className='detail__name' variant='body1'>{transaction.category}</Typography>
        <div>{`Rs. ${transaction.amount} - ${transaction.date}`}</div>
      </div>
       <Delete className='delete' onClick={()=>dispatch(deleteTransaction(transaction))}/>
    </div>
  )
}

export default List