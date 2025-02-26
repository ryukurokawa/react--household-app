import React, { useEffect, useState } from 'react';
import './App.css';
import {Route, BrowserRouter as Router,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { getDocs, collection, doc, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';
import { Transaction } from './types';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';
function App() {

   //Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(err:unknown):err is {code:string,message:string}{
    return typeof err === "object" && err !==null && "code" in err

  }

  const [transactions,setTransactions] = useState<Transaction[]>([])
  const [currentMounth,setCurrentMounth] = useState(new Date());
  const a = format(currentMounth,"yyyy-MM")
  
  useEffect(()=>{
    const fecheTransactions = async ()=>{
      try{
        const  querySnapshot = await getDocs(collection(db,"Transactions"))

         const transactionsData = querySnapshot.docs.map((doc)=>{
          //doc.data() is never undefind for query snapshots
          // consolelog(doc.id, "=>",doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as unknown as Transaction
        }) ;
           
        setTransactions(transactionsData)
      }catch(err){
        if(isFireStoreError(err)){
          console.error(err)
          console.error(err.message)
          console.error(err.code)
        }else{
          console.error("一般的なエラーは:",err)
        }
        //error
     
      }
    }
    fecheTransactions()
  },[])

console.log(transactions)
//一月分のデータのみ取得
 const monthlyTransactions = transactions.filter((transaction) =>{
    return transaction.date.startsWith(formatMonth(currentMounth))
  
  })
 
  //取引を保存する処理
  const handleSaveTransaction = async(transaction:Schema) =>{
    try{
    // firestoreにデータを保存
    // Add a new document with a generated id.
         const docRef = await addDoc(collection(db, "Transactions"),transaction);
         console.log("Document written with ID: ", docRef.id);

         const newTransaction = {
          id:docRef.id,
          ...transaction,
         } as Transaction;

         setTransactions(prevTransaction =>[
          ...prevTransaction,
          newTransaction,])
    }catch(err){
      if(isFireStoreError(err)) {
        //console.err(JSON.stringfy(err,null,2));
        console.error("firestoreのエラーは:",err);
      } else {
        console.error("一般的なエラーは:",err);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
         <Route index element=
         {<Home monthlyTransactions={monthlyTransactions} 
         setCurrentMounth={setCurrentMounth} 
         onSaveTransaction = {handleSaveTransaction}
         />} />
         <Route path="/report" element={<Report />} />
         <Route path="/*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;