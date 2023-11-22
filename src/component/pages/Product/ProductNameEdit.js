import { Avatar, Button, Container, Grid, Paper, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductStyle from "../Product/ProductStyle";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";
import { api } from "../../Axios";
import { Link, useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductNameEdit = () => {
    const [name, setName] = useState("");
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
            .get(`product/productdetails_update_list/${productidparam.id}`, {
                headers: {
                    Authorization: localStorage.getItem("ssAdmin"),
                },
            })
            .then((result) => {
                setActive(false)
                setName(result.data.result.name)
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


    const senddata = (e) => {
        if (!name) {
            setErrors("Required !")
            setTimeout(() => {
                setErrors({})
            }, 3000);
        } else {

            api
                .post(`/product/productdetails_update_list/${productidparam.id}`, name, {
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

export default ProductNameEdit;
