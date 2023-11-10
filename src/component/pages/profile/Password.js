import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { api } from "../../Axios";
import Owncompanydetail from "./Owncompanydetail";
import Password from "./Password";
import ProfileStyle from "./ProfileStyle";

const ForgotPassword = () => {
  const [currentpass, setCurrentpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [error, setError] = useState([]);
  const [dbAdderr, setDbAdderr] = useState('');
  const [addRecord, setAddRecord] = useState(false);
  const classes = ProfileStyle();
  let token = localStorage.getItem('ssAdmin')

  const handlecurrentpass = (e) => {
    setCurrentpass(e.target.value)
  }
  const handlenewpass = (e) => {
    setNewpass(e.target.value)
  }
  const handleconfirmpass = (e) => {
    setConfirmpass(e.target.value)
  }
  const senddata = (e) => {
    if (newpass !== confirmpass || !currentpass || !newpass || !confirmpass) {
      if (newpass !== confirmpass) {
        error.passmiss = 'New Password And Confirm Password Missmatch'
      } else {
        error.passmiss = ''
      }
      if (!currentpass) {
        error.currentpasss = 'Required'
      } else {
        error.currentpasss = ''
      }
      if (!newpass) {
        error.newpass = 'Required'
      } else {
        error.newpass = ''
      }
      if (!confirmpass) {
        error.confirmpass = 'Required'
      } else {
        error.confirmpass = ''
      }
      setError({ ...error, [e.target.name]: e.target.value });
      setTimeout(() => {
        setError([])
      }, 3000);
    } else {

      const data = {
        current_password: currentpass,
        new_password: newpass
      };
      api
        .post(`/forget/forgetpass`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setAddRecord(true)
          setConfirmpass('')
          setNewpass('')
          setCurrentpass('')
          setTimeout(() => {
            setAddRecord(false)
          }, 3000);
        })
        .catch((err) => {
          setDbAdderr(err.response.data.error);
          setTimeout(() => {
            setDbAdderr("");
          }, 3000);
        });
    }
  }

  return <>
    <Paper className={classes.setProductpaper} elevation={5}>

      <Typography variant="h5" gutterBottom className={classes.setInnerheading}>
      Forget Password
      </Typography>
      {dbAdderr && (
        <Typography className={classes.setErrorLabel} style={{ marginBottom: '15px' }}>
          {dbAdderr}{" "}
        </Typography>
      )}
      {addRecord && (
        <Typography className={classes.setErrorLabel} style={{ marginBottom: '15px' }}>
          {"Record Added Successfully"}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
          <div>
            <Typography className={classes.setlabel}>Currunt Password : </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              variant="outlined"
              placeholder="current password *"
              value={currentpass}
              onChange={handlecurrentpass}
              className={classes.settextfield}
            />
          </div>
          {error.currentpasss && (
            <Typography className={classes.setErrorLabel}>
              {error.currentpasss}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
          <div>
            <Typography className={classes.setlabel}>New Password :</Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              type='password'
              variant="outlined"
              placeholder="new password *"
              value={newpass}
              onChange={handlenewpass}
              className={classes.settextfield}
            />
          </div>
          {error.newpass && (
            <Typography className={classes.setErrorLabel}>
              {error.newpass}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
          <div>
            <Typography className={classes.setlabel}>Confirm Password  : </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              variant="outlined"
              type='password'
              placeholder="confirm password  *"
              value={confirmpass}
              onChange={handleconfirmpass}
              className={classes.settextfield}
            />
          </div>
          {error.confirmpass && (
            <Typography className={classes.setErrorLabel}>
              {error.confirmpass}{" "}
            </Typography>
          )}
          {error.passmiss && (
            <Typography className={classes.setErrorLabel}>
              {error.passmiss}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout} style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'flex-end'
        }}>
          <div className={classes.setsendbutton}>

            
              <Button
                variant="contained"
                size="medium"
                className={classes.setsendbtninside}
                onClick={senddata}
              >
                update
              </Button>
            
          </div>
        </Grid>

      </Grid>

    </Paper>
  </>;
};

export default ForgotPassword;
