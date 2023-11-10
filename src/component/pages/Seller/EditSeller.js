import { Avatar, Button, Container, Grid, Paper, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { api } from "../../Axios";
import ProductStyle from "../Product/ProductStyle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../../commonLink/Loader";

const Editseller = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState([]);
  const [active, setActive] = useState(true);
  const [dbFetcherr, setDbFetcherr] = useState('');
  const history = useHistory();
  const productidparam = useParams();
  let token = localStorage.getItem("ssAdmin")
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

  useEffect(() => {
    fetchProductdata()

  }, []);

  const fetchProductdata = () => {
    api
      .get(`medical/medicaldetails_update_detail/${productidparam.id}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false)
        setName(result.data.result.name)
        setAddress(result.data.result.address)
        setMobile(result.data.result.mobile)

      })
      .catch((err) => {
        setActive(false)
        if (err.response.status === 401) {
          localStorage.removeItem("ssAdmin");
          history.push("/");
        }
        setDbFetcherr(err.response.data.error);
        setTimeout(() => {
          setDbFetcherr("");
        }, 3000);
      });
  }

  const senddata = (e) => {
    if (!name || !address || !mobile) {
      if (!name) {
        errors.name = "Required !"
      } else {
        errors.name = ''
      }
      if (!address) {
        errors.address = "Required !"
      } else {
        errors.address = ''
      }
      if (!mobile) {
        errors.mobile = "Required !"
      } else {
        errors.mobile = ''
      }

      setErrors({ ...errors, [e.target.name]: e.target.value })
      setTimeout(() => {
        setErrors({})
      }, 3000);
    } else {
      const data = {
        name,
        address,
        mobile,
      };
      api
        .post(`/medical/medicaldetails_update/${productidparam.id}`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          history.push('/app/seller')
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
    <Container component="main" maxWidth="xl" className='setcontainer'>


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
          Edit Medical
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
              <Typography className={classes.setlabel}>Email :</Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                variant="outlined"
                placeholder="email *"
                value={address}
                onChange={handleaddress}
                className={classes.settextfield}
              />
              {errors.address && (
                <Typography className={classes.seterrorlabel}>
                  {errors.address}{" "}
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
                placeholder="mobile *"
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
  </>;
};

export default Editseller;
