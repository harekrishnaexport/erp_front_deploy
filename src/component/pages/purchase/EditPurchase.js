import React, { useState, useEffect } from "react";
import Loader from "../../commonLink/Loader";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import DeleteIcon from "@mui/icons-material/Delete";

const EditPurchase = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [expiry, setExpiry] = useState("");
  const [party, setParty] = useState("");
  const [totalamt, setTotalamt] = useState("");
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [active, setActive] = useState(true);
  const [rows, setRows] = useState([
    {
      srate: '',
      totalamt: "",
      name: "",
      quantity: "",
      rate: "",
      expiry: "",
      party: "",
    },
  ]);
  const [errors, setErrors] = useState([
    {
      srate: '',
      totalamt: "",
      name: "",
      quantity: "",
      rate: "",
      expiry: "",
      party: "",
    },
  ]);

  const productidparam = useParams();
  const history = useHistory();
  const classes = ProductStyle();
  let token = localStorage.getItem("ssAdmin");

  useEffect(() => {
    fetchProductdata();
  }, []);

  const handleInputChange = (index, fieldName, value) => {
    const updatedRows = [...rows];
    updatedRows[index][fieldName] = value;

    if (updatedRows[0].party !== "") {
      for (let i = 0; i < updatedRows.length; i++) {
        updatedRows[i].party = updatedRows[0].party;
      }
    }

    if (fieldName === "quantity" || fieldName === "rate") {
      const qty = parseFloat(updatedRows[index].quantity);
      const rate = parseFloat(updatedRows[index].rate);
      updatedRows[index].totalamt =
        isNaN(qty) || isNaN(rate) ? "" : (qty * rate).toFixed(2);
    }
    setRows(updatedRows);

    const updatedErrors = [...errors];
    updatedErrors[index] = { ...updatedErrors[index], [fieldName]: "" };
    setErrors(updatedErrors);
  };

  const handlemoredata = () => {
    setRows([
      ...rows,
      { srate: '', totalamt: "", name: "", quantity: "", rate: "", expiry: "" },
    ]);
    setErrors([...errors, {}]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const validateFields = () => {
    const newErrors = rows.map((row, index) => {
      console.log(row);
      const errors = {};
      if (index === 0) {
        if (row.party === "") {
          errors.party = "required";
        }
      }
      if (row.name === "") {
        errors.name = "required";
      }
      if (row.rate === "") {
        errors.rate = "required";
      }
      if (row.srate === "") {
        errors.srate = "required";
      }
      if (row.quantity === "") {
        errors.quantity = "required";
      }
      if (row.expiry === "") {
        errors.expiry = "required";
      }
      return errors;
    });

    setErrors(newErrors);
    return newErrors.every((err) => Object.values(err).every((v) => v === ""));

  };


  useEffect(() => {
    if (quantity && rate) {
      const totalAmount = parseFloat(quantity) * parseFloat(rate);
      setTotalamt(totalAmount.toFixed(2));
    } else {
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
        setRows(result.data.result)
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

  const calculateTotalAmount = () => {
    let total = 0;
    for (const row of rows) {
      total += parseFloat(row.totalamt) || 0;
    }
    return total;
  };
  const totalAmount = calculateTotalAmount();

  const senddata = () => {
    if (!validateFields()) {
      setTimeout(() => {
        setErrors(Array.from({ length: rows.length }, () => ({}))); // Clear all errors
      }, 3000);
    } else {
      setActive(true);
      api
        .post(
          `/purchase/purchasedetails_update/${productidparam.id}`,
          { record: rows, totalAmount },
          {
            headers: {
              Authorization: localStorage.getItem("ssAdmin"),
            },
          }
        )
        .then((result) => {
          setActive(false);
          history.push("/app/purchase");
        })
        .catch((err) => {
          setActive(false);
          setDbFetcherr(err.response.data.error);
          setTimeout(() => {
            setDbFetcherr("");
          }, 3000);
        });
    }
  };
  console.log(errors)
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
          <TableContainer>
            <Table className={classes.settable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableth}>
                    Party Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Product Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Rate
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Amount
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Seling Rate
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Expiry Date
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      className={classes.tabletd}
                      style={{ minWidth: "200px" }}
                    >
                      <TextField
                        disabled={index !== 0}
                        // error={errors[index].party === '' && errors[index].party}
                        fullWidth
                        type="text"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="name *"
                        value={row.party}
                        onChange={(e) =>
                          handleInputChange(index, "party", e.target.value)
                        }
                        className={classes.settextfield}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      style={{ minWidth: "200px" }}
                    >
                      <TextField
                        // error={errors[index].name}
                        fullWidth
                        type="text"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="Product Name *"
                        value={row.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                        className={classes.settextfield}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        // error={errors[index].quantity}
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="quantity *"
                        value={row.quantity}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", e.target.value)
                        }
                        className={classes.settextfield}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        // error={errors[index].rate}
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="rate *"
                        value={row.rate}
                        onChange={(e) =>
                          handleInputChange(index, "rate", e.target.value)
                        }
                        className={`${classes.settextfield}`}
                      />
                    </StyledTableCell>

                    <StyledTableCell
                      className={classes.tabletd}
                      style={{ minWidth: "200px" }}
                    >
                      <TextField
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="total amount *"
                        value={row.totalamt}
                        readOnly="true"
                        className={classes.settextfield}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        // error={errors[index].srate}
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="selling rate *"
                        value={row.srate}
                        onChange={(e) =>
                          handleInputChange(index, "srate", e.target.value)
                        }
                        className={`${classes.settextfield}`}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "130px", minWidth: "140px" }}
                    >
                      <TextField
                        fullWidth
                        // error={errors[index].expiry}
                        type="date"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder=" *"
                        value={row.expiry}
                        onChange={(e) =>
                          handleInputChange(index, "expiry", e.target.value)
                        }
                        className={classes.settextfield}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "20px" }}
                    >
                 
                      {index === 0 ? (
                        <div></div>
                      ) : (
                        <Tooltip title="Remove">
                          <DeleteIcon
                            className={classes.setdeleteincon}
                            onClick={() => handleRemoveRow(index)}
                          />
                        </Tooltip>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            className={classes.setsendbutton}
            style={{
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <h4 style={{ margin: "10px 0" }}>Total Amount : </h4>
            <span style={{ paddingLeft: "10px" }}>{totalAmount}</span>
          </div>
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
