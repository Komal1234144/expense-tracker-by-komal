import React from 'react'

const InfoCard = () => {

  const isIncome = Math.round(Math.random());
  return (
    <div align='center'>
      Try saying: <br/>
      Add {isIncome ? 'Income ' : 'Expense '} 
      for {isIncome ? 28000 : 5000} rs.
      in category {isIncome ? 'Investments ' : 'Shopping '}
      for {isIncome ? 'next Monday ' : 'March 25th, 2022 '}
    </div>
  )
}

export default InfoCard