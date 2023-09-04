import React, {useState} from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from "@material-ui/core";
 


const Form = () => {
    // let preAssessment = 20;

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const [postData, setPostData] = useState({
        name: '', accountProvider: '', amount: ''});
        const [preAssessment, setpreAssessment] = useState(20);
    const classes = useStyles();
    async function createPost(data) {
    const response = await fetch(`http://localhost:5000/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
      const a = await response.json();
      setpreAssessment(a.preAssessment);
    return a.preAssessment;
}
    // const newfunc = () => {
    //     const preAssessment = useSelector(preAssessment);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(postData);
        // clear();
    }
    const clear = () => {
        setPostData({name: '', accountProvider: '', amount: ''});
        setpreAssessment(20);
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={` ${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6"> Account Information </Typography>
                <TextField name="name" variant="outlined" label="Business Name" fullWidth value={postData.name} onChange={ (e) => setPostData({ ...postData, name: e.target.value })} />
                <TextField name="accountProvider" variant="outlined" label="Account Provider(Xero/MYOB)" fullWidth value={postData.accountProvider} onChange={ (e) => setPostData({ ...postData, accountProvider: e.target.value })} />
                <TextField name="Amount" variant="outlined" label="Loan Amount" fullWidth value={postData.amount} onChange={ (e) => setPostData({ ...postData, amount: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth> Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth> Clear</Button> 
                <Button variant="contained" color="primary" size="large"  fullWidth> Decision Engine</Button> 
            </form>
            <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {`preAssessment is: ${preAssessment} `}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Loan?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is preAssessment value
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        </Paper>
    );
}

export default Form;