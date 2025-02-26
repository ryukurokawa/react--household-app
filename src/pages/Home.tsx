import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from "../types"
import { format } from 'date-fns'



interface HomeProps{
  monthlyTransactions: Transaction[],
  setCurrentMounth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({monthlyTransactions,setCurrentMounth}:HomeProps) => {
  const today = format( new Date(),"yyyy-MM-dd")
  const [currentDay,setCurrentDay] = useState(today)
  const [isEntryDrawerOpen,setIsEntryDrawerOpen] = useState(false)

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay
  })

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }

  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }

  return (
    <Box sx={{display:'flex'}}>
      {/*左側コンテンツ*/}
      <Box sx={{flexGrow:1,}}>
         <MonthlySummary monthlyTransactions={monthlyTransactions} />
         <Calender monthlyTransactions={monthlyTransactions} setCurrentMounth={setCurrentMounth} setCurrentDay={setCurrentDay} currentDay={currentDay} today={today} />
        </Box>

      {/*右側コンテンツ*/}
       <Box>
         <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay} onAddTransactionForm={handleAddTransactionForm}/>
         <TransactionForm onCloseForm={closeForm} isEntryDrawerOpen={isEntryDrawerOpen} currentDay={currentDay} />
         </Box>
      </Box>
  )
}



export default Home