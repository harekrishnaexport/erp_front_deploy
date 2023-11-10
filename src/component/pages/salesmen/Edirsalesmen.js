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
import { Link, useHistory, useParams } from "react-router-dom";
import { api } from "../../Axios";
import ProductStyle from "../Product/ProductStyle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../../commonLink/Loader";

const Edirsalesmen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState([]);
  const [active, setActive] = useState(true);
  const [dbFetcherr, setDbFetcherr] = useState("");
  const history = useHistory();
  const productidparam = useParams();
  let token = localStorage.getItem("ssAdmin");
  const classes = ProductStyle();

  const handlename = (event) => {
    setName(event.target.value);
  };
  const handleaddress = (event) => {
    setEmail(event.target.value);
  };
  const handlemobile = (event) => {
    setMobile(event.target.value);
  };

  useEffect(() => {
    fetchProductdata();
  }, []);

  const fetchProductdata = () => {
    api
      .get(`sales/salesmendetails_update_detail/${productidparam.id}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false);
        setName(result.data.result.name);
        setEmail(result.data.result.email);
        setMobile(result.data.result.mobile);
      })
      .catch((err) => {
        setActive(false);
        if (err.response.status === 401) {
          localStorage.removeItem("ssAdmin");
          history.push("/");
        }
        setDbFetcherr(err.response.data.error);
        setTimeout(() => {
          setDbFetcherr("");
        }, 3000);
      });
  };

  const senddata = (e) => {
    if (!name || !email || !mobile) {
      if (!name) {
        errors.name = "Required !";
      } else {
        errors.name = "";
      }
      if (!email) {
        errors.email = "Required !";
      } else {
        errors.email = "";
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
        email,
        mobile,
      };
      api
        .post(`/sales/salesmendetails_update/${productidparam.id}`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          history.push("/app/salesmen");
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
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading_inner}>
          <Tooltip title="Back">
            <Avatar
              className={classes.setaddproheaderarrow}
              variant="rounded"
              component={Link}
              to="/app/salesmen"
            >
              <ArrowBackIcon sx={{ color: "black" }} />
            </Avatar>
          </Tooltip>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Edit Salesmen
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} className={classes.setErrorLabel}>
              <div style={{ width: "100%" }}>
                <Typography className={classes.setlabel}>Name : </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="name *"
                  value={name}
                  onChange={handlename}
                  className={classes.settextfield}
                />
                {errors.name && (
                  <Typography className={classes.seterrorlabel}>
                    {errors.name}{" "}
                  </Typography>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setErrorLabel}>
              <div style={{ width: "100%" }}>
                <Typography className={classes.setlabel}>Address :</Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="sku *"
                  value={email}
                  onChange={handleaddress}
                  className={classes.settextfield}
                />
                {errors.email && (
                  <Typography className={classes.seterrorlabel}>
                    {errors.email}{" "}
                  </Typography>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setErrorLabel}>
              <div style={{ width: "100%" }}>
                <Typography className={classes.setlabel}>Mobile : </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="name *"
                  value={mobile}
                  onChange={handlemobile}
                  className={classes.settextfield}
                />
                {errors.mobile && (
                  <Typography className={classes.seterrorlabel}>
                    {errors.mobile}{" "}
                  </Typography>
                )}
              </div>
            </Grid>
          </Grid>
          <div className={classes.setsendbutton} style={{ marginTop: "15px" }}>
            <Button
              variant="contained"
              size="medium"
              className={classes.setsendbtninside}
              onClick={senddata}
            >
              Update
            </Button>
          </div>
        </Paper>
      </Container>
      <Loader active={active} />
    </>
  );
};

export default Edirsalesmen;
