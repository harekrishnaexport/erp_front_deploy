// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Container,
//   Paper,
//   Typography,
//   Grid,
//   TextField,
//   Tooltip,
//   Avatar,
// } from "@mui/material";
// import { useReducer } from "react";
// import { api } from "../../Axios";
// import ProductStyle from "../Product/ProductStyle";
// import { Link, useHistory } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Loader from "../../commonLink/Loader";

// const Addpurchase = () => {
//   const [name, setName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [rate, setRate] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [party, setParty] = useState("");
//   const [totalamt, setTotalamt] = useState("");
//   const [errors, setErrors] = useState({});
//   const [dbFetcherr, setDbFetcherr] = useState("");
//   const [active, setActive] = useState(true);

//   const history = useHistory();
//   const classes = ProductStyle();
//   let token = localStorage.getItem("ssAdmin");

//   useEffect(() => {
//     setTimeout(() => {
//       setActive(false);
//     }, 500);
//   }, []);

//   const handlename = (event) => {
//     setName(event.target.value);
//   };
//   const handleqty = (event) => {
//     setQuantity(event.target.value);
//   };
//   const handleamount = (event) => {
//     setRate(event.target.value);
//   };
//   const handleexpiry = (event) => {
//     setExpiry(event.target.value);
//   };
//   const handlemrp = (event) => {
//     setParty(event.target.value);
//   };
//   useEffect(() => {
//     if (quantity && rate) {
//       const totalAmount = parseFloat(quantity) * parseFloat(rate);
//       setTotalamt(totalAmount.toFixed(2));
//     }
//   }, [quantity, rate]);

//   const senddata = (e) => {
//     if (!name || !quantity || !rate || !party || !expiry) {
//       if (!name) {
//         errors.name = "Required !";
//       } else {
//         errors.name = "";
//       }
//       if (!quantity) {
//         errors.quantity = "Required !";
//       } else {
//         errors.quantity = "";
//       }
//       if (!rate) {
//         errors.rate = "Required !";
//       } else {
//         errors.rate = "";
//       }
//       if (!party) {
//         errors.party = "Required !";
//       } else {
//         errors.party = "";
//       }
//       if (!expiry) {
//         errors.expiry = "Required !";
//       } else {
//         errors.expiry = "";
//       }
//       setErrors({ ...errors, [e.target.name]: e.target.value });
//       setTimeout(() => {
//         setErrors({});
//       }, 3000);
//     } else {
//       const data = {
//         name,
//         quantity,
//         rate,
//         party,
//         expiry,
//         totalamt
//       };
//       console.log(data)
//       api
//         .post("purchase/purchasedetails_add", data, {
//           headers: {
//             Authorization: token,
//           },
//         })
//         .then((result) => {
//           history.push("/app/purchase");
//         })
//         .catch((err) => {
//           setDbFetcherr(err.response.data.error);
//           setTimeout(() => {
//             setDbFetcherr("");
//           }, 3000);
//         });
//     }
//   };
//   return (
//     <>
//       {" "}
//       <Container component="main" maxWidth="xl" className="setcontainer">
//         <div className={classes.setpageheading_inner}>
//           <Tooltip title="Back">
//             <Avatar
//               className={classes.setaddproheaderarrow}
//               variant="rounded"
//               component={Link}
//               to="/app/purchase"
//             >
//               <ArrowBackIcon sx={{ color: "black" }} />
//             </Avatar>
//           </Tooltip>
//           <Typography variant="h4" gutterBottom className={classes.setheading}>
//             Purchase Add
//           </Typography>
//         </div>

//         <Paper className={classes.setProductpaper} elevation={5}>
//           {dbFetcherr && (
//             <Typography className={classes.setErrorLabel}>
//               {dbFetcherr}{" "}
//             </Typography>
//           )}
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
//               <div>
//                 <Typography className={classes.setlabel}>
//                   Party Name :
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   id="outlined-basic"
//                   size="small"
//                   variant="outlined"
//                   placeholder="name *"
//                   value={party}
//                   onChange={handlemrp}
//                   className={classes.settextfield}
//                 />
//               </div>
//               {errors.party && (
//                 <Typography className={classes.setErrorLabel}>
//                   {errors.party}{" "}
//                 </Typography>
//               )}
//             </Grid>
//             <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
//               <div>
//                 <Typography className={classes.setlabel}>
//                   Product Name :{" "}
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   id="outlined-basic"
//                   size="small"
//                   variant="outlined"
//                   placeholder="name *"
//                   value={name}
//                   onChange={handlename}
//                   className={classes.settextfield}
//                 />
//                 {errors.name && (
//                   <Typography className={classes.setErrorLabel}>
//                     {errors.name}{" "}
//                   </Typography>
//                 )}
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
//               <div>
//                 <Typography className={classes.setlabel}>Quantity :</Typography>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   id="outlined-basic"
//                   size="small"
//                   variant="outlined"
//                   placeholder="quantity *"
//                   value={quantity}
//                   onChange={handleqty}
//                   className={classes.settextfield}
//                 />
//               </div>
//               {errors.quantity && (
//                 <Typography className={classes.setErrorLabel}>
//                   {errors.quantity}{" "}
//                 </Typography>
//               )}
//             </Grid>
//             <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
//               <div>
//                 <Typography className={classes.setlabel}>Rate : </Typography>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   id="outlined-basic"
//                   size="small"
//                   variant="outlined"
//                   placeholder="amount *"
//                   value={rate}
//                   onChange={handleamount}
//                   className={classes.settextfield}
//                 />
//               </div>
//               {errors.rate && (
//                 <Typography className={classes.setErrorLabel}>
//                   {errors.rate}{" "}
//                 </Typography>
//               )}
//             </Grid>

//             <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
//               <div>
//                 <Typography className={classes.setlabel}>
//                   Total Amount :
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   id="outlined-basic"
//                   size="small"
//                   variant="outlined"
//                   placeholder="total amount *"
//                   value={totalamt}
//                   //   onChange={handle}
//                   className={classes.settextfield}
//                 />
//               </div>
//               {errors.mrp && (
//                 <Typography className={classes.setErrorLabel}>
//                   {errors.mrp}{" "}
//                 </Typography>
//               )}
//             </Grid>
//             <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
//               <div>
//                 <Typography className={classes.setlabel}>Expiry :</Typography>
//                 <TextField
//                   fullWidth
//                   type="date"
//                   id="outlined-basic"
//                   size="small"
//                   variant="outlined"
//                   placeholder=" *"
//                   value={expiry}
//                   onChange={handleexpiry}
//                   className={classes.settextfield}
//                 />
//               </div>
//               {errors.expiry && (
//                 <Typography className={classes.setErrorLabel}>
//                   {errors.expiry}{" "}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//           <div className={classes.setsendbutton} style={{ marginTop: "15px" }}>
//             <Button
//               variant="contained"
//               size="medium"
//               className={classes.setsendbtninside}
//               onClick={senddata}
//             >
//               Add Product
//             </Button>
//           </div>
//         </Paper>
//       </Container>
//       <Loader active={active} />
//     </>
//   );
// };

// export default Addpurchase;

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
import { useHistory, Link } from "react-router-dom";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import ProductStyle from "../Product/ProductStyle";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../../commonLink/Loader";

const Addpurchase = () => {
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [productList, setProductList] = useState([]);
  const [active, setActive] = useState(false);
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
  const [discount, setDiscount] = useState("");
  const [selectedMedical, setSelectedMedical] = useState("");
  const [selectedSeles, setselectedSeles] = useState("");

  const history = useHistory();
  const classes = ProductStyle();

  let token = localStorage.getItem("ssAdmin");

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
      { srate:'', totalamt: "", name: "", quantity: "", rate: "", expiry: "" },
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

  const calculateTotalAmount = () => {
    let total = 0;
    for (const row of rows) {
      total += parseFloat(row.totalamt) || 0;
    }
    return total;
  };
  const totalAmount = calculateTotalAmount();

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
    console.log(newErrors);
    setErrors(newErrors);
    return newErrors.every((err) => Object.values(err).every((v) => v === ""));
  };

  const senddata = () => {
    if (!validateFields()) {
      setTimeout(() => {
        setErrors(Array.from({ length: rows.length }, () => ({}))); // Clear all errors
      }, 3000);
    } else {
      setActive(true);
      api
        .post(
          "/purchase/purchasedetails_add",
          { record:rows, totalAmount },
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
            Purchase Add
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          {dbFetcherr && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherr}{" "}
            </Typography>
          )}
          {/* {dbFetcherrProduct && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherrProduct}{" "}
            </Typography>
          )} */}
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
                        error={errors[index].party}
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
                        error={errors[index].name}
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
                        error={errors[index].quantity}
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
                        error={errors[index].rate}
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
                        error={errors[index].srate}
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
                        error={errors[index].expiry}
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

export default Addpurchase;
