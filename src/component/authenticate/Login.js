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

export default function Login() {
  const [passvisible, setPassvisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const classes = useStyleAuth();
  const history = useHistory();

  const handleClickShowPassword = () => {
    setPassvisible(!passvisible);
  };

  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      handlelogin();
    }
  };

  const handlelogin = () => {
    if (!email || !password) {
      if (!email) {
        setEmailError("Requied");
      } else {
        setEmailError("");
      }

      if (!password) {
        setPasswordError("Requied");
      } else {
        setPasswordError("");
      }

      setTimeout(() => {
        setPasswordError("");
        setEmailError("");
      }, 3000);
    } else {
      api
        .post("/auth/login", {
          email,
          password,
        })
        .then((result) => {
          localStorage.setItem("ssAdmin", result.data.result);
          history.push("/app/product");
        })
        .catch((err) => {
          setDbFetcherr(err.response.data.error);
          setTimeout(() => {
            setDbFetcherr("");
          }, 3000);
        });
    }
  };

  return (
    <>
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
            Sign in to start your session
          </Typography>
          {dbFetcherr && (
            <>
              <Typography className={classes.setErrorLabel}>
                {dbFetcherr}
              </Typography>
            </>
          )}
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
                {emailError && (
                  <>
                    <Typography className={classes.setErrorLabel}>
                      {emailError}
                    </Typography>
                  </>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.setinput}>
                <label className={classes.setlabel}>Password :</label>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={password}
                  type={passvisible ? "text" : "password"}
                  size="small"
                  placeholder="password"
                  onKeyPress={handlekeypress}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        InputProps={ariaLabel}
                      >
                        {passvisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {passwordError && (
                  <>
                    <Typography className={classes.setErrorLabel}>
                      {passwordError}
                    </Typography>
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
            Login
          </Button>
          <div className={classes.setbottomtypography}>
            <Typography
              variant="body2"
              className={classes.setacctypography}
              gutterBottom
            >
              Don't have an Account ?
            </Typography>
            <Typography
              className={classes.setsignuilink}
              variant="body2"
              noWrap
              component={Link}
              to="/signup"
              color="textPrimary"
              underline="none"
            >
              Sign up.
            </Typography>
          </div>
        </Paper>
      </Container>
    </>
  );
}
