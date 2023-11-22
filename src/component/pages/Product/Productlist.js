import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import ProductStyle from "./ProductStyle";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../commonLink/Loader";
import moment from 'moment'

const Productlist = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [dbFetcherr, setDbFetcherr] = useState('');
  const [deleterr, setDeleterr] = useState('');
  const [active, setActive] = useState(true);


  const history = useHistory();
  const classes = ProductStyle()


 
  useEffect(() => {
    fetchHiredata();
  }, []);


  const fetchHiredata = () => {
    api
      .get("product/product_list", {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false)
        setProductList(result.data.result);
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

  const handledelete = (e) => {
    setActive(true)

    api
      .delete(`product/productdetails_delete/${e}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false)
        fetchHiredata();
      })
      .catch((err) => {
        setActive(false)
        setDeleterr(err.response.data.error);
        setTimeout(() => {
          setDeleterr("");
        }, 3000);
      });
  };

  const handleedit = (data) => {
    history.push(`/app/productedit/${data}`)
  }

  return <>

    <Container component="main" maxWidth="xl" className='setcontainer'>
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Product List
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          {deleterr && <Typography className={classes.setErrorLabel}>{deleterr} </Typography>}
          {dbFetcherr && <Typography className={classes.setErrorLabel}>{dbFetcherr} </Typography>}
          <TableContainer>
            <Table className={classes.settable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableth}>
                    No.
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Product
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Rate
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Mrp
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Expiry
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((e, index) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell align="center" component="th" scope="row" className={classes.tabletd}>
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tabletd} align="center">
                        {e.name}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tabletd} align="center">
                        {e.quantity}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tabletd} align="center">
                        {e.rate}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tabletd} align="center">
                        {e.mrp}
                      </StyledTableCell>
                      <StyledTableCell className={classes.tabletd} align="center" style={{minWidth:'110px'}}>
                        { moment(e.expiry).format('DD-MM-YYYY')}
                      </StyledTableCell>



                        <StyledTableCell
                          className={classes.tabletdicon}
                          align="center"
                        >
                          <div className={classes.seticondiv} >
                            <div>
                              <Tooltip title="Edit">
                                <EditIcon
                                  className={classes.seteditincon}
                                  onClick={() => handleedit(e._id)}
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <Tooltip title="Remove">
                                <DeleteIcon
                                  className={classes.setdeleteincon}
                                  onClick={() => handledelete(e._id)}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </Container>
    <Loader active={active} />
  </>;
};

export default Productlist;
