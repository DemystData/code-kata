import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

export default function DenseAppBar({provider} : any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Link href={provider=="MYOB" ? "https://www.myob.com/au" : "https://www.xero.com/"}>
          <Typography variant="h4" color={'white'} align="center"  component="div">
            {provider}
          </Typography>
          </Link>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
