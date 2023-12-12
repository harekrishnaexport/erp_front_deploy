import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../Axios";
import Loader from "../../commonLink/Loader";
import ProductStyle from "../Product/ProductStyle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Addseller = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState([]);
  const [active, setActive] = useState(true);

  const [dbFetcherr, setDbFetcherr] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setActive(false);
    }, 500);
  }, []);

  const history = useHistory();
  let token = localStorage.getItem("ssAdmin");
  const classes = ProductStyle();
  const handlename = (event) => {
    setName(event.target.value);
  };
  const handleaddress = (event) => {
    setAddress(event.target.value);
  };
  const handlemobile = (event) => {
    setMobile(event.target.value);
  };

  const senddata = (e) => {
    if (!name || !address || !mobile) {
      if (!name) {
        errors.name = "Required !";
      } else {
        errors.name = "";
      }
      if (!address) {
        errors.address = "Required !";
      } else {
        errors.address = "";
      }
      if (!mobile) {
        errors.mobile = "Required !";
      } else {
        errors.mobile = "";
      }

      setErrors({ ...errors, [e.target.name]: e.target.value });
      setTimeout(() => {
        setErrors({});
      }, 3000);
    } else {
      const data = {
        name,
        address,
        mobile,
      };
      api
        .post("/medical/medicaldetails_add", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          history.push("/app/seller");
        })
        .catch((err) => {
          setDbFetcherr(err.response.data.error);
          setTimeout(() => {
            setDbFetcherr("");
          }, 3000);
        });
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      const inputs = document.querySelectorAll(".settextfield");
      const currentIndex = Array.from(inputs).indexOf(event.target);
      const nextInput = inputs[currentIndex + 1];

      if (nextInput) {
        nextInput.focus();
      } else {
        // If there is no next input, you can perform the desired action (e.g., submit the form)
        senddata(event);
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading_inner}>
          <Tooltip title="Back">
            <Avatar
              className={classes.setaddproheaderarrow}
              variant="rounded"
              component={Link}
              to="/app/seller"
            >
              <ArrowBackIcon sx={{ color: "black" }} />
            </Avatar>
          </Tooltip>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Add Medical
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          {dbFetcherr && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherr}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Name : </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="name *"
                  value={name}
                  onChange={handlename}
                  onKeyPress={handleEnterKey}
                  className={classes.settextfield}
                />
              </div>
              {errors.name && (
                <Typography className={classes.setErrorLabel}>
                  {errors.name}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Address :</Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="address *"
                  value={address}
                  onChange={handleaddress}
                  onKeyPress={handleEnterKey}
                  className={classes.settextfield}
                />
              </div>
              {errors.address && (
                <Typography className={classes.setErrorLabel}>
                  {errors.address}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Mobile : </Typography>
                <TextField
                  fullWidth
                  type="number"
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="mobile *"
                  value={mobile}
                  onChange={handlemobile}
                  onKeyPress={handleEnterKey}
                  className={classes.settextfield}
                />
              </div>
              {errors.mobile && (
                <Typography className={classes.setErrorLabel}>
                  {errors.mobile}{" "}
                </Typography>
              )}
            </Grid>
          </Grid>
          <div className={classes.setsendbutton} style={{ marginTop: "15px" }}>
            <Button
              variant="contained"
              size="medium"
              className={classes.setsendbtninside}
              onClick={senddata}
            >
              Add Medical
            </Button>
          </div>
        </Paper>
      </Container>
      <Loader active={active} />
    </>
  );
};

export default Addseller;
