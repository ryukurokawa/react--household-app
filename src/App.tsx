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
import { getDocs, collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';
import { Transaction } from './types';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';
import { AppContext, AppContextProvider, useAppContext } from './context/AppContext';
import { isFirestoreError } from './utils/errorHandling';
function App() {

   //Firestoreエラーかどうかを判定する型ガード
  //  function isFirestoreError(
  //   err:unknown
  // ):err is {code:string; message:string}{
  //   return typeof err === "object" && err!==null && "code" in err;
  // }

  //  const [transactions,setTransactions] = useState<Transaction[]>([])
  //  const [currentMounth,setCurrentMounth] = useState(new Date());
  //  const [isLoading,setIsLoading] = useState(true);
  
  //const a = format(currentMounth,"yyyy-MM")
  
  


//一月分のデータのみ取得
//  const monthlyTransactions = transactions.filter((transaction) =>{
//     return transaction.date.startsWith(formatMonth(currentMounth))
  
//   
 
  // //取引を保存する処理
  // const handleSaveTransaction = async(transaction:Schema) =>{
  //   try{
  //   // firestoreにデータを保存
  //   // Add a new document with a generated id.
  //        const docRef = await addDoc(collection(db, "Transactions"),transaction);
  //        console.log("Document written with ID: ", docRef.id);

  //        const newTransaction = {
  //         id:docRef.id,
  //         ...transaction,
  //        } as Transaction;

  //        setTransactions(prevTransaction =>[
  //         ...prevTransaction,
  //         newTransaction,])
  //   }catch(err){
  //     if(isFirestoreError(err)) {
  //       //console.err(JSON.stringfy(err,null,2));
  //       console.error("firestoreのエラーは:",err);
  //     } else {
  //       console.error("一般的なエラーは:",err);
  //     }
  //   }
  // }


  //  //削除処理
  // const handleDeleteTransaction =  async(transactionIds:string | readonly string[]) => {
  //   try {
  //     const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds]
  //      //firestoreのデータ削除
  //      for(const id of idsToDelete){
  //       await deleteDoc(doc(db,"Transactions", id))
  //      }
  //      const  filterdTransactions = transactions.filter((transaction) => !idsToDelete.includes(transaction.id))
  //      setTransactions(filterdTransactions)
  //   }catch(err){
  //     if(isFirestoreError(err)){
  //       console.error("firestoreのエラーは:",err);
  //     }else{
  //       console.error("一般的なエラーは:",err);
  //     }
  //   }
  // }


  // const handleUpdateTransaction = async(transaction:Schema,transactionId:string) =>{
  //   try{
  //     //firestore更新処理
  //     const docRef = doc(db,"Transactions",transactionId);

  //     //Set the "capital" field of the city 'DC'
  //     await updateDoc(docRef,transaction);

  //     //フロントを更新
  //     const updateTransactions = transactions.map((t) => t.id === transactionId  ? {...t, ...transaction} : t) as Transaction[]
  //     setTransactions(updateTransactions)

  //   }catch(err){
  //     if(isFirestoreError(err)){
  //       console.error("firestoreのエラーは:",err)
  //     }else{
  //       console.error("一般的なエラーは:",err);
  //     }
  //   }
  // }



  return (
    <ThemeProvider theme={theme}>
        <AppContextProvider>
         <CssBaseline />
         <Router>
         <Routes>
         <Route path="/" element={<AppLayout />}>
         <Route index element=
         {<Home 
        //   monthlyTransactions={monthlyTransactions} 
        //  setCurrentMounth={setCurrentMounth} 
        //  onSaveTransaction = {handleSaveTransaction}
        //  onDeleteTransaction={handleDeleteTransaction}
        //  onUpdateTransaction={handleUpdateTransaction}
         />} />
         <Route path="/report" 
         element={
         <Report 
        //  currentMonth={currentMounth} 
        //  setCurrentMounth={setCurrentMounth}
        //  monthlyTransactions={monthlyTransactions}
        //  isLoading={isLoading}
        //  onDeleteTransaction={handleDeleteTransaction}
         />
         } 
         />
         <Route path="/*" element={<NoMatch />} />
         </Route>
         </Routes>
         </Router>
         </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;