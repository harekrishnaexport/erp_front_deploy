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
import { useHistory } from "react-router-dom";
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const BillGenerate = () => {
  const [medicalList, setMedicalList] = useState([]);
  const [dbFetcherrProduct, setDbFetcherrProduct] = useState("");
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [productList, setProductList] = useState([]);
  const [salesmenList, setSalesmenList] = useState([]);
  const [active, setActive] = useState(true);
  const [totalPayable, setTotalPayable] = useState("");
  const [rows, setRows] = useState([
    {
      medicalname: "",
      proname: "",
      rate: "",
      qty: "",
      salesmen: "",
      amount: "",
    },
  ]);
  const [errors, setErrors] = useState([
    {
      medicalname: "",
      proname: "",
      rate: "",
      qty: "",
      amount: "",
    },
  ]);
  const [discount, setDiscount] = useState("");
  const [selectedMedical, setSelectedMedical] = useState("");
  const [selectedSeles, setselectedSeles] = useState("");
  const [productListName, setProductListName] = useState([]);
  const history = useHistory();
  const theme = useTheme();
  const classes = BillStyle();

  let token = localStorage.getItem("ssAdmin");

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
      .get("product/product_list_seperate", {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false);
        setProductListName(result.data.result);
      })
      .catch((err) => {
        setActive(false);
        setDbFetcherrProduct(err.response.data.error);
        setTimeout(() => {
          setDbFetcherrProduct("");
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

  const handleInputChange = (index, fieldName, value) => {
    const updatedRows = [...rows];
    updatedRows[index][fieldName] = value;

    if (fieldName === "proname") {
      const selectedProduct = productList.find(
        (product) => product.name === value
      );
      if (selectedProduct) {
        updatedRows[index].rate = selectedProduct.rate;
      } else {
        updatedRows[index].rate = "";
      }
    }
    if (updatedRows[0].medicalname !== "") {
      for (let i = 0; i < updatedRows.length; i++) {
        updatedRows[i].medicalname = updatedRows[0].medicalname;
        // console.log(updatedRows[i].medicalname);
      }
    }
    if (updatedRows[0].salesmen !== "") {
      for (let i = 0; i < updatedRows.length; i++) {
        updatedRows[i].salesmen = updatedRows[0].salesmen;
      }
    }
    // console.log(fieldName);
 
    console.log(updatedRows);

    setRows(updatedRows);

    if (fieldName === "qty" || fieldName === "rate") {
      const qty = parseFloat(updatedRows[index].qty);
      const rate = parseFloat(updatedRows[index].rate);
      updatedRows[index].amount =
        isNaN(qty) || isNaN(rate) ? "" : (qty * rate).toFixed(2);
    }

    const updatedErrors = [...errors];
    updatedErrors[index] = { ...updatedErrors[index], [fieldName]: "" };
    setErrors(updatedErrors);
  };

  const handlemoredata = () => {
    setRows([...rows, { medicalname: "", proname: "", rate: "", qty: "" }]);
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

  const calculateTotalAmount = () => {
    let total = 0;
    for (const row of rows) {
      total += parseFloat(row.amount) || 0;
    }
    return total;
  };
  const totalAmount = calculateTotalAmount();

  const calculateTotalPayable = () => {
    let persontageval = (totalAmount * discount) / 100;
    const discountValue = Math.round(persontageval);
    return totalAmount - discountValue;
  };

  useEffect(() => {
    setTotalPayable(calculateTotalPayable());
  }, [discount, totalAmount]);

  const validateFields = () => {
    const newErrors = rows.map((row, index) => {
      const errors = {};
      if (index === 0) {
        if (row.medicalname === "") {
          errors.medicalname = "required";
        }
      }

      if (index === 0) {
        if (row.salesmen === "") {
          errors.salesmen = "required";
        }
      }

      if (row.proname === "") {
        errors.proname = "required";
      }

      for (let i = 0; i < index; i++) {
        if (row.proname === rows[i].proname) {
          errors.proname = "Product already selected in another row";
          break; // Exit the loop if a match is found
        }
      }
      if (row.rate === "") {
        errors.rate = "required";
      }
      if (row.qty === "") {
        errors.qty = "required";
      }

      return errors;
    });

    setErrors(newErrors);

    return newErrors.every((err) => Object.values(err).every((v) => v === ""));
  };

  const senddata = () => {
    if (!validateFields()) {
      setTimeout(() => {
        setErrors(Array.from({ length: rows.length }, () => ({}))); // Clear all errors
      }, 3000);
    } else {
      let finalAmount = discount ? totalPayable : totalAmount;

      setActive(true);

      api
        .post(
          "/bill/createbill",
          { rows, totalAmount, totalPayable, discount },
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
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Generate Bill
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
                        disabled={index !== 0}
                        error={index === 0 ? errors[index].medicalname : false}
                        style={{ padding: "0px" }}
                        fullWidth
                        id={`medicalname-${index}`}
                        value={row.medicalname}
                        className={classes.settextfield}
                        onChange={(e) => {
                          handleInputChange(
                            index,
                            "medicalname",
                            e.target.value
                          );
                          handleMedicalNameChange(e.target.value);
                        }}
                      >
                        <MenuItem defaultValue="medicalname" value="">
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
                        error={errors[index].proname}
                        style={{ padding: "0px" }}
                        fullWidth
                        // labelId="demo-select-small-label"
                        id="demo-select-small"
                        className={classes.settextfield}
                        value={row.proname}
                        onChange={(e) =>
                          handleInputChange(index, "proname", e.target.value)
                        }
                      >
                        <MenuItem defaultValue="medicalname" value="">
                          <em>None</em>
                        </MenuItem>
                        {productListName.map((e) => {
                          return <MenuItem value={e._id}>{e.name}</MenuItem>;
                        })}
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.tabletd}
                      align="center"
                      style={{ maxWidth: "100px", minWidth: "130px" }}
                    >
                      <TextField
                        error={errors[index].rate}
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
                        error={errors[index].qty}
                        fullWidth
                        type="number"
                        id="outlined-basic"
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
                        <MenuItem defaultValue="medicalname" value="">
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
                      style={{ maxWidth: "20px" }}
                    >
                      <Tooltip title="Remove">
                        <DeleteIcon
                          className={classes.setdeleteincon}
                          onClick={() => handleRemoveRow(index)}
                        />
                      </Tooltip>
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
          <div
            className={classes.setsendbutton}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <TextField
              fullWidth
              type="number"
              id="outlined-basic"
              size="small"
              variant="outlined"
              placeholder="Disccount *"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className={classes.settextfield}
              style={{ width: "200px" }}
            />
          </div>
          <div
            className={classes.setsendbutton}
            style={{
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <h4 style={{ margin: "10px 0" }}>Total Payable : </h4>
            <span style={{ paddingLeft: "10px" }}>{totalPayable}</span>
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

export default BillGenerate;
