import React, { useEffect } from 'react'
import { Grid , Typography} from '@mui/material';
import './form.css';
import { addTransaction } from '../../redux/TransactionSlice';
import { useDispatch , useSelector } from 'react-redux';
import { useState } from 'react';
import uniqid from 'uniqid';
import moment from 'moment';
import { incomeCategories , expenseCategories } from '../../constants/categories';
import { useSpeechContext } from "@speechly/react-client";
import AlertComponent from '../AlertComponent/AlertComponent';
const Form = () => {
  const initialState = {
    type : '',
   category : '',
   amount : '',
   date :moment().format('YYYY-MM-DD')
  }
 const [data , setData] = useState(initialState);
 const [open , setOpen] = useState(false)

 const selectedCategory = data.type==='Income'? incomeCategories : expenseCategories;

const dispatch = useDispatch();
const handleClick=()=>{
 let res;
 for(const d in data){
  if(!data[d]){
    return res= false
  }
 }

 if (Number.isNaN(Number(data.amount)) || !data.date.includes('-')) return;
  res!==false && dispatch(addTransaction(data))
  setOpen(true)
  const arr = document.getElementsByClassName('select')
  for(var i=0; i<arr.length; i++){
     arr[i].selectedIndex = 0
  }
 setData(initialState);
 }

const {segment} = useSpeechContext()

useEffect(()=>{
  if(segment){
    if(segment.intent.intent==='add_expense'){
      document.getElementById('type').value = 'Expense'
    }else if(segment.intent.intent==='add_income'){
      document.getElementById('type').value = 'Income'
    }else if(segment.isFinal && segment.intent.intent==='create_transaction'){
      dispatch(addTransaction(data))
    }else if(segment.isFinal && segment.intent.intent==='cancel_transaction'){
      setData(initialState)
    }

    segment.entities.forEach((e)=>{
      switch(e.type){
        case 'amount' :{ 
          return setData({...data , amount : e.value})
        }

        case 'category' :{
          const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
          if(incomeCategories.map((ic)=>ic.type).includes(category)){
            setData({...data , type : 'Income' , category})
           return document.getElementById('category').value = category
          }else if(expenseCategories.map((ec)=>ec.type).includes(category)){
           setData({...data , type : 'Expense' , category})
           return document.getElementById('category').value = category
          }
        }

        case 'date' : {
          console.log(e.value)
          return setData({...data , date : e.value})}

        default : return 
      }
    })
    if (Number.isNaN(Number(data.amount)) || !data.date.includes('-')) return;
    else if(segment.isFinal && data.type && data.category && data.amount && data.date ){
      dispatch(addTransaction(data))
      setOpen(true)
      const arr = document.getElementsByClassName('select')
      for(var i=0; i<arr.length; i++){
        arr[i].selectedIndex = 0
      }
      setData(initialState)
      setTimeout(()=>{
        segment = undefined;
      },1500)
    }else{
      return 
    }
    
  }
},[segment])

  return (
    <div>
    <AlertComponent open={open} setOpen={setOpen}/>
    <Typography variant="subtitle2" align="center" margin={'15px 0px'}>
          {segment && segment.words.map((w)=>w.value).join(" ")}
    </Typography>
    <Grid container spacing={2} className='form__grid'>
       <Grid item xs={6} >
           <select  className='select__grid select' 
           id='type'
           onChange={(e)=>setData({...data , type : e.target.value})}>
             <option disabled selected>Type</option>
             <option>Income</option>
             <option>Expense</option>
           </select>
       </Grid>

       <Grid item xs={6} >
           <select className='select__grid select'
           id='category'
            onChange={(e)=>setData({...data , category : e.target.value})}>
             <option disabled selected>Category</option>
             {selectedCategory.map((cat)=>{
               return <option>{cat.type}</option>
             })}
           </select>
       </Grid>

       <Grid item xs={6}>
         <input className='select__grid'
           type='number'
           placeholder='Amount'
           value = {data.amount}
           onChange={(e)=>setData({...data , amount : e.target.value})}/>
       </Grid>

       <Grid item xs={6}>
         <input className='select__grid' 
         type='date'
         value={data.date}
         onChange={(e)=>{
         // console.log(moment(e.target.value).format('YYYY-MM-DD'))
          setData({...data , date :moment(e.target.value).format('YYYY-MM-DD')})}}/>
       </Grid>

       <button 
       className='form__button'
       onClick={handleClick}>
       CREATE</button>
    </Grid>
    </div>
  )
}

export default Form;