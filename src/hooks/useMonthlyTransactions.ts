import React, { useMemo } from 'react'
import { formatMonth } from '../utils/formatting'
import { useAppContext } from '../context/AppContext'
import { Transaction } from '../types'

const useMonthlyTransactions = (): Transaction[] => {

 const {transactions,currentMonth}= useAppContext()
  //月刊の取引データを取得
  const monthlyTransactions = useMemo(()=>{
   return transactions.filter((transaction)=>
       transaction.date.startsWith(formatMonth(currentMonth))
    )
  },[transactions,currentMonth]) 

  return monthlyTransactions;
}

export default useMonthlyTransactions