import {Grid} from '@mui/material'
import IncomeCard from './Components/Cards/IncomeCard';
import ExpenseCard from './Components/Cards/ExpenseCard';
import React from 'react';
import Main from './Components/Main/Main';
import { PushToTalkButton, PushToTalkButtonContainer , ErrorPanel } from '@speechly/react-ui';
import './app.css';

function App() {

  return (
    <div className='app__container'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3.5} lg={4} className='desktop-only'>
           <IncomeCard title={'Income'}/>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Main/>
        </Grid>
        <Grid item xs={12} md={3.5} lg={4} className='mobile-only'>
           <IncomeCard title={'Income'}/>
        </Grid>
        <Grid item xs={12} md={3.5} lg={4}>
          <ExpenseCard title={'Expense'}/>
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton/>
        <ErrorPanel/>
      </PushToTalkButtonContainer>
    </div>
  );
}

export default App;
