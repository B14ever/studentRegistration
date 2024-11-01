import React from 'react'
import {Backdrop, Box, CircularProgress} from '@mui/material'
import SideBar from '../ui/drawer'
import { Outlet } from 'react-router-dom'
import { useLoading } from '../../context/loadingContext'
const Layout = () => {
  const {isLoading} = useLoading()
  return (
    <Box sx={{ display:'flex'}}>
     <SideBar/>
      <Box  component="main" sx={{ flexGrow: 1, paddingX: {xs : 2 , md : 5} , pt : '78px',pb:'18px',backgroundColor:'#fbfcf8',
      minHeight:{xs:'100svh'}}}>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading}>
          <CircularProgress color="inherit" />
         </Backdrop>
         <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout
