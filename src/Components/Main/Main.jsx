import { Card  ,Grid , Typography , Slide} from "@mui/material"
import React, { useEffect } from "react"
import List from '../List/List';
import Form from '../Form/Form';
import './main.css';
import uniqid from 'uniqid';
import { useSelector } from "react-redux";
import InfoCard from "../InfoCard";

const Main = () => {
const transactions = useSelector((state)=>state.transaction);

let total
  const balance = transactions.map((t)=>{
    return t.type==='Income' ? parseInt(t.amount): parseInt(-t.amount)
  })
  total = balance.reduce((acc , currVal)=> acc + currVal , 0)
  
  return (
    <Card className="main__card">
       <Typography variant='h6' style={{color:'orange' , fontWeight:'bold', textAlign:'center'}}>Expense Tracker</Typography>
       <p className="powered-by">Powered by Speechly</p>
       <div className="heading">
         <Typography variant="h5" style={{marginBottom : '15px'}}>{`Total Balance ${total} Rs.`}</Typography>
           <InfoCard/>
       </div>
       <hr/>
        
       <Form/>

       <Grid container>
         <Grid item xs={12} className='list__grid'>
       
         {transactions.length===0 && <p style={{textAlign:'center' , color:'orange'}}> Your transactions here !</p>}
         {transactions.map((transaction)=>{
              return <List key={uniqid()} transaction={transaction} length={transactions.length}/>   
         })}
        
         </Grid>
       </Grid>
    </Card>
  )
}

export default Main