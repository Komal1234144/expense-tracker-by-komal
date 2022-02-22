import {Card , CardHeader , CardContent , Typography} from '@mui/material';
import React from 'react';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2';
import { chartTransactions } from '../../chartTransactions';
import { useSelector } from 'react-redux';
import './cards.css'
const ExpenseCard = ({title}) => {
   
   const transactions = useSelector((state)=>state.transaction)
   const {chartData , total } = transactions.length>0 &&  chartTransactions(title , transactions )
   const isExpense = transactions.find((t)=>t.type=='Expense')

  return (
     <Card className={isExpense ? 'expand-expense' : 'expense'}>
       <CardHeader title={title}/>
       <CardContent >
         <Typography variant='h5'>{!total ? 'Rs.0' : `Rs. ${total}`}</Typography>
        {chartData && <Doughnut data={chartData} width='600px' height='600px' className='doughnut'/>}
       </CardContent>
     </Card> 
  )
}

export default ExpenseCard;