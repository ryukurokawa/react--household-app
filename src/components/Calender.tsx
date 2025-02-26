import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calender.css"
import { Calendar, DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalulations'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'


interface CalendarProps{
  monthlyTransactions:Transaction[],
  setCurrentMounth: React.Dispatch<React.SetStateAction<Date>>
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
  currentDay: string
  today:string
}
const Calender = ({monthlyTransactions,setCurrentMounth,setCurrentDay,currentDay,today}: CalendarProps) => {
  // const events =[
  //   {title:'Meeting',start:new Date()},
  // ]

  const theme = useTheme()

  const backgroundEvent = {
    start:currentDay,
    display:"background",
    backgroundColor:theme.palette.incomeColor.light
  }

  //月の取引データ
 // const monthlyTransactions =[
   // {
     // id:"a",
   //   type:"income",
     // category:"お小遣い",
 //     amount:700,
   //   content:"母から",
     // date:"2025-02-10"
  //  },
   // {
    //  id:"b",
    //  type:"expense",
    //  category:"食費",
    //  amount:200,
     /// content:"玉ねぎ",
    //  date:"2025-02-10"
    //},
  //  {
 //     id:"c",
 //     type:"expense",
  //    catergory:"日用品",
  //    amount:500,
   //   count:"時計",
   //   date:"2025-02-10"
    //}
  // ]

  const  renderEventContent =(eventInfo:EventContentArg)=>{
    return(
      <div>
           <div className='money' id="event-income">
            {eventInfo.event.extendedProps.income}
           </div>

           <div className='money' id="event-expense">
            {eventInfo.event.extendedProps.expense}
           </div>

           <div className='money' id="event-balance">
            {eventInfo.event.extendedProps.balance}
           </div>

      </div>
      
       
    )
  }

  const dailyBalances = calculateDailyBalances(monthlyTransactions)

// //1.日付ごとの収支を計算する関数
// const dailyBalances=
// {
//   "2025-02-10":{income:700,expense:200,balanace:500},
//   "2025-02-15":{income:0,expense:500,balanace:-500}
// }

//2FullCalendar用のイベント生成関数
const createCalendrEvents = (dailyBalances:Record<string, Balance>):CalendarContent[] => {
   return Object.keys(dailyBalances).map((date) => {
    const {income, expense, balance} = dailyBalances[date]
    return {
      start:date,
      income:formatCurrency(income),
      expense:formatCurrency(expense),
      balance:formatCurrency(balance),
    }
  })
}

const handleDateSet = (datesetInfo:DatesSetArg) => {
  const currentMonth = datesetInfo.view.currentStart
  setCurrentMounth(currentMonth)
  const todayDate = new Date()
  if(isSameMonth(todayDate, currentMonth)){
    setCurrentDay(today)
  }
}

const handleDateClick = (dateInfo:DateClickArg) => {
  setCurrentDay(dateInfo.dateStr)
}

const calendarEvents = createCalendrEvents(dailyBalances)

  return (
    <FullCalendar 
    locale={jaLocale}
    plugins={[dayGridPlugin, interactionPlugin]}
    initialView='dayGridMonth'
    events={[...calendarEvents, backgroundEvent]}
    eventContent ={renderEventContent}
    datesSet={handleDateSet}
    dateClick={handleDateClick}
    />
  )
}
export default Calender