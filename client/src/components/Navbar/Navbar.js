import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import {Link} from 'react-router-dom'; 
import demyst from "../../images/demyst.png";

const Navbar = () => {
  const classes = useStyles();
  const user = null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.appBar}>
        <img
          className={classes.image}
          src={demyst}
          alt="Demyst"
          height="50"
        />
      </div>
      <Toolbar className={classes.toolbar}>
       
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
