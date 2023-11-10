import {
  Avatar,
  Button,
  Divider,
  Select,
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
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import BillStyle from "./BillStyle";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const ReturnOrder = () => {
  const [active, setActive] = useState(false)
  const [medicalList, setMedicalList] = useState([]);
  const [dbFetcherrProduct, setDbFetcherrProduct] = useState("");
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [productList, setProductList] = useState([]);
  const [salesmenList, setSalesmenList] = useState([]);
  const [startRecordLength, setStartRecordLength] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [rows, setRows] = useState([
    {
      medical: "",
      product: "",
      rate: "",
      qty: "",
      salesmen: "",
      amount: "",
      retunqty: '',
      return: '',
      update: false
    },
  ]);
  const [errors, setErrors] = useState(rows.map(() => ({
    medical: "",
    product: "",
    rate: "",
    qty: "",
    amount: "",
    retunqty: "",
  })));
  const [selectedMedical, setSelectedMedical] = useState("");
  const [selectedSeles, setselectedSeles] = useState('')
  const classes = BillStyle();
  const history = useHistory();
  let token = localStorage.getItem("ssAdmin");
  let getid = useParams();
  const handleMedicalNameChange = (value) => {
    setSelectedMedical(value);
  };
  const handleSalesNameChange = (value) => {
    setselectedSeles(value);
  };
  useEffect(() => {
    fetchHiredata();
  }, []);

  const fetchHiredata = () => {
    api
      .get(`bill/billdetails_update_detail/${getid.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setActive(false);
        setStartRecordLength(result.data.result.length)
        setRows(result.data.result)
        setErrors(
          result.data.result.map(() => ({
            medical: "",
            product: "",
            rate: "",
            qty: "",
            amount: "",
            returnamt: '',
            retunqty: "",
          }))
        );
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

    api
      .get("medical/medical_list", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setActive(false);
        setMedicalList(result.data.result);
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

    api
      .get("product/product_list", {
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
        setDbFetcherrProduct(err.response.data.error);
        setTimeout(() => {
          setDbFetcherr("");
        }, 3000);
      });

    api
      .get("sales/salesmendetails_list", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setActive(false);
        setSalesmenList(result.data.result);
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

  const calculateTotalAmount = () => {
    let total = 0;
    for (const row of rows) {
      total += parseFloat(row.returnamt) || 0;
    }
    return total;
  };
  let returnAmount = calculateTotalAmount();





  const handleInputChange = (index, fieldName, value) => {
    const updatedRows = [...rows];
    updatedRows[index][fieldName] = value;

    if (fieldName === "product") {
      const selectedProduct = productList.find(
        (product) => product._id === value
      );
      if (selectedProduct) {
        updatedRows[index].rate = selectedProduct.rate; // Set the rate only if selectedProduct is defined
      } else {
        updatedRows[index].rate = ""; // Set rate to empty string if selectedProduct is not found
      }
    }

    setRows(updatedRows);

    if (fieldName === "qty" || fieldName === "rate") {
      const qty = parseFloat(updatedRows[index].qty);
      const rate = parseFloat(updatedRows[index].rate);

      if (!isNaN(qty) && !isNaN(rate)) {
        updatedRows[index].amount = (qty * rate).toFixed(2); // Calculate amount only if qty and rate are numbers
      } else {
        updatedRows[index].amount = ""; // Set amount to an empty string if qty or rate is not a number
      }
    }

    if (fieldName === "retunqty") {
      const retunqty = parseFloat(updatedRows[index].retunqty);
      const qty = parseFloat(updatedRows[index].qty);
      const rate = parseFloat(updatedRows[index].rate);

      updatedRows[index].returnamt = (rate * retunqty).toFixed(2);
      if (retunqty) {
        updatedRows[index].update = true
      }
      if (!isNaN(retunqty) && !isNaN(qty) && retunqty > qty) {
        const updatedErrors = [...errors];
        updatedErrors[index] = {
          ...updatedErrors[index],
          [fieldName]: "Return Qty cannot be greater than Qty",
        };
        setErrors(updatedErrors);
      } else {
        const updatedErrors = [...errors];
        updatedErrors[index] = { ...updatedErrors[index], [fieldName]: "" };
        setErrors(updatedErrors);
      }
    }

  };



  const validateFields = () => {
    const newErrors = rows.map((row, index) => {
      const errors = {};

      if (parseInt(row.retunqty, 10) > row.qty) {
        errors.retunqty = 'Return Qty cannot be greater than Qty'
      }

      return errors;
    });

    setErrors(newErrors);
    return newErrors.every((err) => Object.values(err).every((v) => v === ""));
  };

  console.log(errors)
  const senddata = () => {
    if (!validateFields()) {
      setTimeout(() => {
        setErrors(Array.from({ length: rows.length }, () => ({}))); // Clear all errors
      }, 3000);
    } else {
      const hasEmptyRow = rows.some(row => !!row.retunqty);
      if (hasEmptyRow) {
        api
          .post(
            `/return/returnproduct/${getid.id}`,
            { rows, returnAmount },
            {
              headers: {
                Authorization: localStorage.getItem("ssAdmin"),
              },
            }
          )
          .then((result) => {
            setActive(false);
            history.push('/app/invoicerecord')
          })
          .catch((err) => {
            setActive(false);
            setDbFetcherrProduct(err.response.data.error);
            setTimeout(() => {
              setDbFetcherr("");
            }, 3000);
          });
      } else {
        setUserMessage('Enter Qty !')
        setTimeout(() => {
          setUserMessage('')
        }, 3000);
      }
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        {/* <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Return
          </Typography>
        </div> */}
        <div className={classes.setpageheading_inner}>
          <Tooltip title="Back">
            <Avatar
              className={classes.setaddproheaderarrow}
              variant="rounded"
              component={Link}
              to="/app/invoicerecord"
            >
              <ArrowBackIcon sx={{ color: "black" }} />
            </Avatar>
          </Tooltip>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Return
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          {dbFetcherr && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherr}{" "}
            </Typography>
          )}
          {dbFetcherrProduct && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherrProduct}{" "}
            </Typography>
          )}
          {userMessage && (
            <Typography className={classes.setErrorLabel}>
              {userMessage}{" "}
            </Typography>
          )}

          <TableContainer>
            <Table className={classes.settable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.tableth}>
                    Medical Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Product Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Rate
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Amount
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    before return
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Return Qty
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
                      <Select
                        disabled
                        error={index === 0 ? errors[index].medical : false}
                        style={{ padding: "0px" }}
                        fullWidth
                        id={`medical-${index}`}
                        value={row.medical}
                        className={classes.settextfield}
                        onChange={(e) => {
                          handleInputChange(
                            index,
                            "medical",
                            e.target.value
                          );
                          handleMedicalNameChange(e.target.value);
                        }}
                      >
                        <MenuItem defaultValue="medical" value="">
                          <em>None</em>
                        </MenuItem>
                        {medicalList.map((e) => (
                          <MenuItem value={e._id}>{e.name}</MenuItem>
                        ))}
                      </Select>

                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      style={{ minWidth: "200px" }}
                    >
                      <Select
                        disabled
                        style={{ padding: "0px" }}
                        fullWidth
                        id={`product-${index}`}
                        className={classes.settextfield}
                        value={row.product}
                        onChange={(e) =>
                          handleInputChange(index, "product", e.target.value)
                        }
                      >
                        <MenuItem defaultValue="product" value="">
                          <em>None</em>
                        </MenuItem>
                        {productList.map((e) => {
                          return <MenuItem value={e._id}>{e.name}</MenuItem>;
                        }) || []}
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        // error={errors[index].rate}
                        fullWidth
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="rate *"
                        value={row.rate}
                        // onChange={(e) =>
                        //   handleInputChange(index, "rate", e.target.value)
                        // }
                        className={`${classes.settextfield}`}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        fullWidth
                        type="number"
                        id={`qty-${index}`}
                        size="small"
                        variant="outlined"
                        placeholder="qty *"
                        value={row.qty}
                        // onChange={(e) =>
                        //   handleInputChange(index, "qty", e.target.value)
                        // }
                        className={classes.settextfield}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="amount *"
                        value={row.amount}
                        readOnly="true"
                        // onChange={(e) =>
                        //   handleInputChange(index, "amount", e.target.value)
                        // }
                        className={classes.settextfield}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                    // style={{ maxWidth: "100px", minWidth: "130px" }}
                    >{row.return ? row.return : 0}</StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >

                      <TextField

                        error={errors[index].retunqty}
                        fullWidth
                        type="number"
                        id={`retunqty-${index}`}
                        size="small"
                        variant="outlined"
                        placeholder="qty *"
                        value={row.retunqty}
                        onChange={(e) =>
                          handleInputChange(index, "retunqty", e.target.value)
                        }
                        className={classes.settextfield}
                      />
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
            <h4>Total Amount : </h4>
            <span style={{ paddingLeft: "10px" }}>{returnAmount}</span>
          </div>
          <div className={classes.setsendbutton} style={{ marginTop: "15px" }}>
            <Button
              variant="contained"
              size="medium"
              className={classes.setsendbtninside}
              onClick={senddata}
            >
              Create
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  )
}

export default ReturnOrder