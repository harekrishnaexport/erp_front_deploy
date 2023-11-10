import React, { useState, useEffect } from "react";
import Loader from "../../commonLink/Loader";
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
import ProductStyle from "../Product/ProductStyle";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { api } from "../../Axios";
import { Link, useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditPurchase = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [expiry, setExpiry] = useState("");
  const [party, setParty] = useState("");
  const [totalamt, setTotalamt] = useState("");
  const [errors, setErrors] = useState({});
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [active, setActive] = useState(true);
  const productidparam = useParams();
  const history = useHistory();
  const classes = ProductStyle();
  let token = localStorage.getItem("ssAdmin");

  useEffect(() => {
    fetchProductdata();
  }, []);

  useEffect(() => {
    if (quantity && rate) {
      const totalAmount = parseFloat(quantity) * parseFloat(rate);
      setTotalamt(totalAmount.toFixed(2)); 
    }else {
        setTotalamt('')
    }
  }, [quantity, rate]);

  const fetchProductdata = () => {
    api
      .get(`purchase/purchasedetails_update_detail/${productidparam.id}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        console.log(result.data.result)
        setActive(false);
        setName(result.data.result.name);
        setQuantity(result.data.result.quantity);
        setRate(result.data.result.rate);
        setExpiry(result.data.result.expiry);
        setParty(result.data.result.party);
        setTotalamt(result.data.result.totalamt);
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
    setParty(event.target.value);
  };

  const senddata = (e) => {
    if (!name || !quantity || !rate || !party || !expiry) {
      if (!name) {
        errors.name = "Required !";
      } else {
        errors.name = "";
      }
      if (!quantity) {
        errors.quantity = "Required !";
      } else {
        errors.quantity = "";
      }
      if (!rate) {
        errors.rate = "Required !";
      } else {
        errors.rate = "";
      }
      if (!party) {
        errors.party = "Required !";
      } else {
        errors.party = "";
      }
      if (!expiry) {
        errors.expiry = "Required !";
      } else {
        errors.expiry = "";
      }
      setErrors({ ...errors, [e.target.name]: e.target.value });
      setTimeout(() => {
        setErrors({});
      }, 3000);
    } else {
      const data = {
        name,
        quantity,
        rate,
        party,
        expiry,
        totalamt,
      };
      api
        .post(`/purchase/purchasedetails_update/${productidparam.id}`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          history.push("/app/purchase");
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
              to="/app/purchase"
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
                <Typography className={classes.setlabel}>
                  Party Name :
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="name *"
                  value={party}
                  onChange={handlemrp}
                  className={classes.settextfield}
                />
              </div>
              {errors.party && (
                <Typography className={classes.setErrorLabel}>
                  {errors.party}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>
                  Product Name :{" "}
                </Typography>
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
                <Typography className={classes.setlabel}>Rate : </Typography>
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
                <Typography className={classes.setlabel}>
                  Total Amount :
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="total amount *"
                  value={totalamt}
                  //   onChange={handle}
                  className={classes.settextfield}
                />
              </div>
              {errors.mrp && (
                <Typography className={classes.setErrorLabel}>
                  {errors.mrp}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Expiry :</Typography>
                <TextField
                  fullWidth
                  type="date"
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
      <Loader active={active} />
    </>
  );
};

export default EditPurchase;
