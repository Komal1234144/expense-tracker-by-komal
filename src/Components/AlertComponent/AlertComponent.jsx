import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import './alert.css'
const AlertComponent = ({open , setOpen}) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

  return (
    <div>
    <Snackbar 
     className='snackbar'
     open={open}
     autoHideDuration={3000}
     anchorOrigin={{vertical:'top' , horizontal:'right'}}
      onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" elevation={6} variant='filled'>
      Transaction created successfully!
    </Alert>
  </Snackbar>
    </div>
  )
}

export default AlertComponent