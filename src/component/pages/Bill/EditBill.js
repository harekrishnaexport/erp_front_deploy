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
import { useHistory, useParams ,Link} from "react-router-dom";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import BillStyle from "./BillStyle";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Loader from "../../commonLink/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditBill = () => {
  const [active, setActive] = useState(false);
  const [medicalList, setMedicalList] = useState([]);
  const [dbFetcherrProduct, setDbFetcherrProduct] = useState("");
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [productList, setProductList] = useState([]);
  const [salesmenList, setSalesmenList] = useState([]);
  const [startRecordLength, setStartRecordLength] = useState("");
  const [rows, setRows] = useState([
    {
      medical: "",
      product: "",
      rate: "",
      qty: "",
      salesmen: "",
      amount: "",
      new: false,
    },
  ]);
  const [errors, setErrors] = useState([
    {
      medical: "",
      product: "",
      rate: "",
      qty: "",
      amount: "",
    },
  ]);
  const [selectedMedical, setSelectedMedical] = useState("");
  const [selectedSeles, setselectedSeles] = useState("");
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
        setStartRecordLength(result.data.result.length);
        setRows(result.data.result);
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

    // api
    //   .get("product/product_list", {
    //     headers: {
    //       Authorization: localStorage.getItem("ssAdmin"),
    //     },
    //   })
    //   .then((result) => {
    //     setActive(false);
    //     setProductList(result.data.result);
    //   })
    //   .catch((err) => {
    //     setActive(false);
    //     setDbFetcherrProduct(err.response.data.error);
    //     setTimeout(() => {
    //       setDbFetcherr("");
    //     }, 3000);
    //   });
      api
      .get("product/product_list_seperate", {
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
          setDbFetcherrProduct("");
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
      total += parseFloat(row.amount) || 0;
    }
    return total;
  };
  let totalAmount = calculateTotalAmount();

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedRows = [...rows];
    updatedRows[index][fieldName] = value;

    if (fieldName === "product") {
      const selectedProduct = productList.find(
        (product) => product.name === value
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

    const updatedErrors = [...errors];
    updatedErrors[index] = { ...updatedErrors[index], [fieldName]: "" };
    setErrors(updatedErrors);
  };

  const handlemoredata = () => {
    setRows([
      ...rows,
      { medical: "", product: "", rate: "", qty: "", new: true },
    ]);
    setErrors([...errors, {}]);
  };

  const validateFields = () => {
    const newErrors = rows.map((row, index) => {
      const errors = {};
      if (index === 0) {
        if (row.medical === "") {
          errors.medical = "required";
        }
      }

      if (index === 0) {
        if (row.salesmen === "") {
          errors.salesmen = "required";
        }
      }

      if (row.product === "") {
        errors.product = "required";
      }

      for (let i = 0; i < index; i++) {
        if (row.product === rows[i].product) {
          errors.product = "Product already selected in another row";
          break;
        }
      }
      if (row.qty === "") {
        errors.qty = "required";
      }

      return errors;
    });
    console.log(newErrors);
    setErrors(newErrors);

    return newErrors.every((err) => Object.values(err).every((v) => v === ""));
  };

  console.log(rows);
  const senddata = () => {
    if (!validateFields()) {
      console.log(errors);
      setTimeout(() => {
        setErrors(Array.from({ length: rows.length }, () => ({}))); // Clear all errors
      }, 3000);
    } else {
      let latestlength = rows.length;
      // setActive(true);
      api
        .post(
          `/bill/billdetails_update/${getid.id}`,
          { rows, totalAmount },
          {
            headers: {
              Authorization: localStorage.getItem("ssAdmin"),
            },
          }
        )
        .then((result) => {
          setActive(false);
          history.push("/app/invoicerecord");
          // setProductList(result.data.result);
        })
        .catch((err) => {
          setActive(false);
          setDbFetcherrProduct(err.response.data.error);
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
              to="/app/invoicerecord"
            >
              <ArrowBackIcon sx={{ color: "black" }} />
            </Avatar>
          </Tooltip>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Update Bill
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
          <div className={classes.setlistfiltericon}>
            <Avatar
              className={classes.setavtarback}
              onClick={handlemoredata}
              variant="rounded"
            >
              <AddIcon className={classes.setmoreicon} />
            </Avatar>
          </div>
          <Divider style={{ marginTop: "10px" }} />
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
                    Salesmen
                  </TableCell>
                  <TableCell align="center" className={classes.tableth}>
                    Amount
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
                      <Select
                        disabled
                        error={index === 0 ? errors[index].medical : false}
                        style={{ padding: "0px" }}
                        fullWidth
                        id={`medical-${index}`}
                        value={row.medical}
                        className={classes.settextfield}
                        onChange={(e) => {
                          handleInputChange(index, "medical", e.target.value);
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
                        // error={errors[index].product}
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
                        className={`${classes.settextfield}`}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        // error={errors[index].qty}
                        fullWidth
                        type="number"
                        id={`qty-${index}`}
                        size="small"
                        variant="outlined"
                        placeholder="qty *"
                        value={row.qty}
                        onChange={(e) =>
                          handleInputChange(index, "qty", e.target.value)
                        }
                        className={classes.settextfield}
                      />
                    </StyledTableCell>

                    <StyledTableCell
                      className={classes.tabletd}
                      style={{ minWidth: "200px" }}
                    >
                      <Select
                        disabled={index !== 0}
                        error={index === 0 ? errors[index].salesmen : false}
                        style={{ padding: "0px" }}
                        fullWidth
                        id={`salesmen-${index}`}
                        value={row.salesmen}
                        className={classes.settextfield}
                        onChange={(e) => {
                          handleInputChange(index, "salesmen", e.target.value);
                          handleSalesNameChange(e.target.value);
                        }}
                      >
                        <MenuItem defaultValue="salesmen" value="">
                          <em>None</em>
                        </MenuItem>
                        {salesmenList.map((e) => (
                          <MenuItem value={e._id}>{e.name}</MenuItem>
                        ))}
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        fullWidth
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
                      style={{ maxWidth: "20px" }}
                    >
                      {/* {row.new ? ( */}
                      {/* <Tooltip title="Remove">
                          <DeleteIcon
                          
                          disabled={index === 0}
                            className={classes.setdeleteincon}
                            onClick={() => handleRemoveRow(index)}
                          />
                        </Tooltip> */}
                      {/* ) : ( */}
                      {/* <div></div> */}
                      {/* )} */}
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
            <h4>Total Amount : </h4>
            <span style={{ paddingLeft: "10px" }}>{totalAmount}</span>
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

      <Loader active={active} />
    </>
  );
};

export default EditBill;
