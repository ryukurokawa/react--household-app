import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React, { CSSProperties, FC } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from 'react-router-dom';

interface SideBarProps{
  drawerWidth:number,
  mobileOpen:boolean,
  handleDrawerToggle:()=> void,
}

interface menuItem{
  text:string, 
  path:string,
  icon:React.ComponentType;
}


const SideBar = ({drawerWidth,mobileOpen,handleDrawerToggle}:SideBarProps) => {

  const MenuItems:menuItem[] =[
    {text: "Home",path:"/",icon:HomeIcon},
    {text: "Report",path:"/report",icon:EqualizerIcon}
  ]

  const baseLinkStyle :CSSProperties={
    textDecoration:"none",
    color:"inherit",
    display:"block"
  }

   const activeLinkStyle:CSSProperties ={
    backgroundColor:"rgba(0,0,0,0.08)"
   }
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItems.map((item, index) => (
          <NavLink key={item.text} to={item.path} style={({isActive})=>{
            console.log("選択されたメニューは",item.text,isActive)
            return{
              ...baseLinkStyle,
              ...(isActive ? activeLinkStyle:{})
            }
          }}>
            <ListItem key={index} disablePadding>
            <ListItemButton>
               <ListItemIcon>
                {/*index % 2 === 0 ? <InboxIcon /> : <MailIcon />*/}
                {React.createElement(item.icon)} {/* React.createElement を使用してアイコンコンポーネントをレンダリング */}
               </ListItemIcon>
               <ListItemText primary={item.text} />
             </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      
    </div>
  )
  console.log(MenuItems)
  return (
    
    <Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    aria-label="mailbox folders"
  >
    {/*モバイル用*/}
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>

     {/*PC用*/}
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>
  )
}

export default SideBar