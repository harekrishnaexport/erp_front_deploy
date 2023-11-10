import { Avatar, Button, Container, Grid, Paper, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductStyle from "../Product/ProductStyle";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { api } from "../../Axios";
import { Link, useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [expiry, setExpiry] = useState('');
  const [mrp, setMrp] = useState('');
  const [errors, setErrors] = useState({});
  const [dbFetcherr, setDbFetcherr] = useState('');
  const [active, setActive] = useState(true);
  const productidparam = useParams();
  const history = useHistory()
  const classes = ProductStyle();
  let token = localStorage.getItem("ssAdmin")

  useEffect(() => {
    fetchProductdata()
  }, []);

  const fetchProductdata = () => {
    api
      .get(`product/productdetails_update_detail/${productidparam.id}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false)
        setName(result.data.result.name)
        setQuantity(result.data.result.quantity)
        setRate(result.data.result.rate)
        setExpiry(result.data.result.expiry)
        setMrp(result.data.result.mrp)
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

  const handlename = (event) => {
    setName(event.target.value);
  };
  const handleqty = (event) => {
    setQuantity(event.target.value);
  };
  const handleamount = (event) => {
    setRate(event.target.value);
  };
  const handleexpiry = (event) => {
    setExpiry(event.target.value);
  };
  const handlemrp = (event) => {
    setMrp(event.target.value);
  };

  const senddata = (e) => {
    if (!name || !quantity || !rate || !mrp || !expiry) {
      if (!name) {
        errors.name = "Required !"
      } else {
        errors.name = ''
      }
      if (!quantity) {
        errors.quantity = "Required !"
      } else {
        errors.quantity = ''
      }
      if (!rate) {
        errors.rate = "Required !"
      } else {
        errors.rate = ''
      }
      if (!mrp) {
        errors.mrp = "Required !"
      } else {
        errors.mrp = ''
      }
      if (!expiry) {
        errors.expiry = "Required !"
      } else {
        errors.expiry = ''
      }
      setErrors({ ...errors, [e.target.name]: e.target.value })
      setTimeout(() => {
        setErrors({})
      }, 3000);
    } else {
      const data = {
        name,
        quantity,
        rate,
        mrp,
        expiry,
      };
      api
        .post(`/product/productdetails_update/${productidparam.id}`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          history.push('/app/product')
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
            to="/app/product"
          >
            <ArrowBackIcon sx={{ color: "black" }} />
          </Avatar>
        </Tooltip>
        <Typography variant="h4" gutterBottom className={classes.setheading}>
          Edit Product
        </Typography>
      </div>

      <Paper className={classes.setProductpaper} elevation={5}>
        {dbFetcherr && (
          <Typography className={classes.setErrorLabel}>
            {dbFetcherr}{" "}
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
                className={classes.settextfield}
              />
              {errors.name && (
                <Typography className={classes.setErrorLabel}>
                  {errors.name}{" "}
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
            <div>
              <Typography className={classes.setlabel}>Quantity :</Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                variant="outlined"
                placeholder="quantity *"
                value={quantity}
                onChange={handleqty}
                className={classes.settextfield}
              />
            </div>
            {errors.quantity && (
              <Typography className={classes.setErrorLabel}>
                {errors.quantity}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
            <div>
              <Typography className={classes.setlabel}>Amount : </Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                variant="outlined"
                placeholder="amount *"
                value={rate}
                onChange={handleamount}
                className={classes.settextfield}
              />
            </div>
            {errors.rate && (
              <Typography className={classes.setErrorLabel}>
                {errors.rate}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
            <div>
              <Typography className={classes.setlabel}>Expiry :</Typography>
              <TextField
                fullWidth
                type='date'
                id="outlined-basic"
                size="small"
                variant="outlined"
                placeholder=" *"
                value={expiry}
                onChange={handleexpiry}
                className={classes.settextfield}
              />
            </div>
            {errors.expiry && (
              <Typography className={classes.setErrorLabel}>
                {errors.expiry}{" "}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
            <div>
              <Typography className={classes.setlabel}>MRP :</Typography>
              <TextField
                fullWidth
                type='number'
                id="outlined-basic"
                size="small"
                variant="outlined"
                placeholder="mrp *"
                value={mrp}
                onChange={handlemrp}
                className={classes.settextfield}
              />
            </div>
            {errors.mrp && (
              <Typography className={classes.setErrorLabel}>
                {errors.mrp}{" "}
              </Typography>
            )}
          </Grid>
        </Grid>
        <div className={classes.setsendbutton}>
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

    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "#000000a1",
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
      open={active}
    >
      <DotLoader color="white" />
    </Backdrop>

  </>;
};

export default EditProduct;
