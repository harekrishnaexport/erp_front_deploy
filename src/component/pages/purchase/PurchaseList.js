import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import ProductStyle from "../Product/ProductStyle";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../commonLink/Loader";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import PurchseModelOpen from "./PurchseModelOpen";

const PurchaseList = () => {
  const [productList, setProductList] = useState([]);
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [deleterr, setDeleterr] = useState("");
  const [active, setActive] = useState(true);
  const [invoiceId, setInvoiceId] = useState("");
  const [modelOpen, setModelOpen] = useState(false);

  const history = useHistory();
  const classes = ProductStyle();

  const handlesenddata = () => {
    history.push("/app/purchaseadd");
  };
  useEffect(() => {
    fetchHiredata();
  }, []);

  const fetchHiredata = () => {
    

    api
      .get("purchase/purchasemaintbl_list", {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false);
        setProductList(result.data.result);
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

  const handleview = (data) => {
    setInvoiceId(data);
    setModelOpen(true);

  }
  const handledelete = (e) => {
    setActive(true);

    api
      .delete(`purchase/purchasedetails_delete/${e}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false);
        fetchHiredata();
      })
      .catch((err) => {
        setActive(false);
        setDeleterr(err.response.data.error);
        setTimeout(() => {
          setDeleterr("");
        }, 3000);
      });
  };

  const handleedit = (data) => {
    history.push(`/app/purchaseedit/${data}`);
  };
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Purchase List
          </Typography>
          <Button
            variant="contained"
            size="medium"
            className={classes.setsendbtninside}
            onClick={handlesenddata}
          >
            Add
          </Button>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          {deleterr && (
            <Typography className={classes.setErrorLabel}>
              {deleterr}{" "}
            </Typography>
          )}
          {dbFetcherr && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherr}{" "}
            </Typography>
          )}
          <TableContainer>
            <Table className={classes.settable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableth}>
                    No.
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Invoice Id
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Date
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Party Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    amount
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
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                        className={classes.tabletd}
                      >
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tabletd}
                        align="center"
                      >
                        {e.invoiceId}
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tabletd}
                        align="center"
                      >
                        {moment(e.date).format("DD-MM-YYYY")}
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tabletd}
                        align="center"
                      >
                        {e.party}
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tabletd}
                        align="center"
                      >
                        {e.totalamt}
                      </StyledTableCell>

                      <StyledTableCell
                        className={classes.tabletdicon}
                        align="center"
                      >
                        <div className={classes.seticondiv}>
                          <div>
                            <Tooltip title="Bill Information">
                              <InfoIcon
                                className={classes.seteditincon}
                                onClick={() => handleview(e.invoiceId)}
                              />
                            </Tooltip>
                          </div>
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
      <Modal
        open={modelOpen}
        onClose={() => setModelOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.setmodeldisplay}>
          <PurchseModelOpen invoiceid={invoiceId} />
        </Box>
      </Modal>
    </>
  );
};

export default PurchaseList;
