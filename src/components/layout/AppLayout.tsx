import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import SideBar from '../common/SideBar';
import { useAppContext } from '../../context/AppContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Transaction } from '../../types';
import { isFirestoreError } from '../../utils/errorHandling';

const drawerWidth = 240;

export default function AppLayout() {

  const {setTransactions,setIsLoading,transactions}  = useAppContext()

  //firestoreのデータを取得
  React.useEffect(()=>{
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
        setIsLoading(false)
      }catch(err){
        if(isFirestoreError(err)){
          console.error(err)
          console.error(err.message)
          console.error(err.code)
        }else{
          console.error("一般的なエラーは:",err)
        }
      }finally{
        setIsLoading(false);
      }
    }
    fecheTransactions()
  },[])
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

 
    
  
  return (
    <Box 
    sx={{ 
      display: {md:"flex"},
      bgcolor:(theme)  => theme.palette.grey[100],
      minHeight:"100vh"
      }}
      >
      <CssBaseline />
      {/*ヘッダー*/}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TypeScript x React 家計簿
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/*サイドバー*/}
      <SideBar
            drawerWidth={drawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
        />

      {/*メインコンテンツ*/}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />      
        </Box>
    </Box>
  );
}
