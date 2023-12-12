import React, { useState, useEffect } from "react";
import { Button, Container, Paper, Typography, Grid, TextField, Tooltip, Avatar } from "@mui/material";
import { api } from "../../Axios";
import ProductStyle from "./ProductStyle";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../../commonLink/Loader";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [expiry, setExpiry] = useState('');
  const [mrp, setMrp] = useState('');
  const [errors, setErrors] = useState('');
  const [dbFetcherr, setDbFetcherr] = useState('');
  const [active, setActive] = useState(true);

  const history = useHistory()
  const classes = ProductStyle();
  let token = localStorage.getItem("ssAdmin")


  useEffect(() => {
    setTimeout(() => {
      setActive(false)
    }, 500);
  }, []);

  const handlename = (event) => {
    setName(event.target.value);
  }

  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      senddata();
    }
  };

  const senddata = (e) => {
    if (!name) {

      setErrors('Required')
      setTimeout(() => {
        setErrors('')
      }, 3000);
    } else {
      api
        .post("/product/productlist_add", {name}, {
          headers: {
            Authorization: localStorage.getItem("ssAdmin"),
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
          Product Add
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
                onKeyPress={handlekeypress}
                className={classes.settextfield}
              />
              {errors && (
                <Typography className={classes.setErrorLabel}>
                  {errors}{" "}
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
            Add Product
          </Button>
        </div>
      </Paper>
    </Container>
    <Loader active={active} />
  </>;
};

export default AddProduct;

