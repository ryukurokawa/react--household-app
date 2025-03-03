
import React, {  createContext, ReactNode, useContext, useState } from "react";
import { Transaction } from "../types";
import { useMediaQuery, useTheme } from "@mui/material";
import { Schema } from "../validations/schema";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { isFirestoreError } from "../utils/errorHandling";

interface AppContextType{
  transactions:Transaction[],
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  currentMonth:Date,
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isLoading:boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile:boolean;
  onSaveTransaction: (transaction:Schema) => Promise<void>
  onDeleteTransaction: (transactionIds:string | readonly string[]) => Promise<void>
  onUpdateTransaction: (transaction:Schema,transactionId:string) => Promise<void>
}

export  const AppContext =  createContext< AppContextType | undefined>(undefined);

export const AppContextProvider =({children}:{children:ReactNode}) => {
  const [transactions,setTransactions] =useState<Transaction[]>([])
  const [currentMonth,setCurrentMonth] = useState(new Date());
  const [isLoading,setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const onSaveTransaction = async(transaction:Schema) =>{
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
      if(isFirestoreError(err)) {
        //console.err(JSON.stringfy(err,null,2));
        console.error("firestoreのエラーは:",err);
      } else {
        console.error("一般的なエラーは:",err);
      }
    }
  }
   //削除処理
   const onDeleteTransaction =  async(transactionIds:string | readonly string[]) => {
    try {
      const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds]
       //firestoreのデータ削除
       for(const id of idsToDelete){
        await deleteDoc(doc(db,"Transactions", id))
       }
       const  filterdTransactions = transactions.filter((transaction) => !idsToDelete.includes(transaction.id))
       setTransactions(filterdTransactions)
    }catch(err){
      if(isFirestoreError(err)){
        console.error("firestoreのエラーは:",err);
      }else{
        console.error("一般的なエラーは:",err);
      }
    }
  }

  const onUpdateTransaction = async(transaction:Schema,transactionId:string) =>{
    try{
      //firestore更新処理
      const docRef = doc(db,"Transactions",transactionId);

      //Set the "capital" field of the city 'DC'
      await updateDoc(docRef,transaction);

      //フロントを更新
      const updateTransactions = transactions.map((t) => t.id === transactionId  ? {...t, ...transaction} : t) as Transaction[]
      setTransactions(updateTransactions)

    }catch(err){
      if(isFirestoreError(err)){
        console.error("firestoreのエラーは:",err)
      }else{
        console.error("一般的なエラーは:",err);
      }
    }
  }

  return(
    <AppContext.Provider value={{
      transactions,
      setTransactions,
      currentMonth,
      setCurrentMonth,
      isLoading,
      setIsLoading,
      isMobile,
      onSaveTransaction,
      onDeleteTransaction,
      onUpdateTransaction
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context){
    //contextがundefinedの場合の処理
    throw new Error("グローバルなデータはプロバイダーの中で取得してください")
  }
  return context
};