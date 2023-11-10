import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Paper, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link, useHistory } from "react-router-dom";
import useStyleAuth from "./AuthStyle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { api } from "../Axios";
const ariaLabel = { "aria-label": "description" };

const Signup = () => {
  const [passvisible, setPassvisible] = useState(false);
  const [conpassword, setConpassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const [dbFetcherr, setDbFetcherr] = useState('');


  const classes = useStyleAuth();
  const history = useHistory();

  const handlelogin = () => {
    if (password !== conpassword) {
      setPasswordError('New password & confirm password different')
    } else {
      api
        .post("/auth/signup", {
          email,
          password,
        })
        .then((result) => {
          history.push('/')
        })
        .catch((err) => {
          setDbFetcherr(err.response.data.error);
          setTimeout(() => {
            setDbFetcherr("");
          }, 3000);
        });
    }
  }

  return <>
    <Container
      component="main"
      maxWidth="xl"
      className={classes.setcontainer}
    >
      <div className={classes.setpageheading}>
        <Typography variant="h5" gutterBottom className={classes.setheading}>
        HKIEPL
        </Typography>
      </div>
      <Paper className={classes.setloginbackpaper} elevation={5}>
        <Typography
          variant="h6"
          gutterBottom
          className={classes.setloginheadset}
        >
          Sign up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.setinput}>
              <label className={classes.setlabel}>Email :</label>
              <TextField
                id="outlined-basic"
                size="small"
                type="email"
                placeholder="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.setinput}>
              <label className={classes.setlabel}>Password :</label>
              <TextField
                id="outlined-basic"
                size="small"
                type={passvisible ? "text" : "password"}
                placeholder="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.setinput}>
              <label className={classes.setlabel}>confirm Password :</label>
              <TextField
                id="outlined-basic"
                size="small"
                type="password"
                placeholder="Confirm password"
                variant="outlined"
                value={conpassword}
                onChange={(e) => setConpassword(e.target.value)}
              />
              {passwordError && (
                <>
                  <Typography className={classes.setErrorLabel} style={{ marginTop: "10px" }}>{passwordError}</Typography>
                </>
              )}
            </div>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className={classes.setloginbutton}
          onClick={handlelogin}
        >
          Signup
        </Button>
      </Paper>
    </Container>
  </>;
};

export default Signup;
