import {
  Button,
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
  Typography,
  Checkbox,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import MenuItem from "@mui/material/MenuItem";
import paymentStyle from "./PaymentStyle";
import Loader from "../../commonLink/Loader";

const PaymentEntry = () => {
  const [medicalid, setMedicalid] = useState("");
  const [medicalList, setMedicalList] = useState([]);
  const [medicalBillList, setMedicalBillList] = useState([]);
  const [active, setActive] = useState(true);
  const [copyData, setCopyData] = useState([]);
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState([]);
  const [dataView, setDataView] = useState(false);
  const [billdatafetchError, setBilldatafetchError] = useState("");
  const [emptyMeducalid, setEmptyMeducalid] = useState("");
  const [paymentTableError, setPaymentTableError] = useState("");
  const [conformMessage, setConformMessage] = useState("");
  const [emptyRecords, setEmptyRecords] = useState(false);
  const history = useHistory();
  const classes = paymentStyle();
  let token = localStorage.getItem("ssAdmin");
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
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
  };

  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      fetchSellerdata();
    }
  };
  const fetchSellerdata = () => {
    if (!medicalid) {
      setEmptyMeducalid("Required");
      setTimeout(() => {
        setEmptyMeducalid("");
      }, 3000);
    } else {
      setActive(true);
      api
        .get(`bill/subbill_list/${medicalid}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setActive(false);
          if (result.data.result.length === 0) {
            setDataView(false)
            setEmptyRecords(true)
            setTimeout(() => {
              setEmptyRecords(false)
            }, 3000);
          } else {
            setDataView(true)
            setMedicalBillList(result.data.result);
          }
          setMedicalid("");
        })
        .catch((err) => {
          setActive(false);
          if (err.response.status === 401) {
            localStorage.removeItem("ssAdmin");
            history.push("/");
          }
          setBilldatafetchError(err.response.data.error);
          setTimeout(() => {
            setBilldatafetchError("");
          }, 3000);
        });
    }
  };

  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    if (e.target.name === "allselect") {
      const tempUser = medicalBillList.map((user) => {
        return { ...user, isChecked: checked };
      });
      setMedicalBillList(tempUser);
    } else {
      let tempUser = medicalBillList.map((user) =>
        user.invoiceId == name ? { ...user, isChecked: checked } : user
      );

      setMedicalBillList(tempUser);
    }
  };

  const handleawbdisplay = (index) => (e) => {
    let Array = [...medicalBillList];
    Array[index]["payamount"] = e.target.value;
    setMedicalBillList(Array);
    const pendingAmount = Array[index]["pendingamount"];
    const payAmount = parseInt(e.target.value, 10);
    let amount = pendingAmount ? pendingAmount : Array[index]['totalPayable']
    const newDifference = amount - payAmount;

    const updatedMedicalBillList = [...medicalBillList];
    if (payAmount > pendingAmount) {
      updatedMedicalBillList[index]["payamountError"] =
        "Receive Amount cannot be greater than Total Amount";
    } else {
      updatedMedicalBillList[index]["payamountError"] = undefined;
    }
    if (newDifference === 0) {
      updatedMedicalBillList[index]["difference"] = 0;
    } else {
      updatedMedicalBillList[index]["difference"] = newDifference;
    }
    if (newDifference === 0) {
      updatedMedicalBillList[index]["paymentDone"] = true;
    } else {
      updatedMedicalBillList[index]["paymentDone"] = false;
    }
    setMedicalBillList(updatedMedicalBillList);
  };
  var errStatus = false;
  const handleadddata = (e) => {
    const Extra_data = [];

    let tempData = medicalBillList.map((e) => {
      if (e.isChecked) {
        if (!e.payamount) {
          return { ...e, payamterror: "Required" };
        } else {
          return { ...e };
        }
      } else {
        Extra_data.push(e);
      }
    });
    let chehckerr = 0;
    const sending_data = [];
    let totalpayamount = 0;

    {
      tempData.map((data) => {
        if (!data) {
        } else {
          if (data.payamount) {
            totalpayamount += parseInt(data.payamount, 10);
          }
          sending_data.push(data);
          if (data.payamterror !== undefined) {
            chehckerr = chehckerr + 1;
          }
        }
      });
    }

    setCopyData(sending_data);
    if (sending_data.length === 0 || chehckerr !== 0) {
      if (sending_data.length === 0) {
        errors.isCheck = "Please select Row";
      } else {
        errors.isCheck = "";
      }

      setErrors({ ...errors, [e.target.name]: e.target.value });
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    } else {
      setActive(true);
      let data = {
        sending_data,
        totalpayamount,
      };
      api
        .post("payment/paymentreceive", data, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setActive(false);
          setDataView(false);
          errStatus = false;
          setConformMessage("Payment Update Successful");
          setTimeout(() => {
            setConformMessage("");
          }, 3000);
        })
        .catch((err) => {
          setActive(false);
          if (err.response.status === 401) {
            localStorage.removeItem("ssAdmin");
            history.push("/");
          }
          setPaymentTableError(err.response.data.error);
          setTimeout(() => {
            setPaymentTableError("");
          }, 3000);
        });
      api
        .post(
          "bill/mainbill_receive",
          sending_data,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((result) => {
          setActive(false);
        })
        .catch((err) => {
          setActive(false);
          if (err.response.status === 401) {
            localStorage.removeItem("ssAdmin");
            history.push("/");
          }
          setPaymentTableError(err.response.data.error);
          setTimeout(() => {
            setPaymentTableError("");
          }, 3000);
        });
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            payment Entry
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          <Grid
            container
            spacing={2}
            style={{ marginTop: "10px", display: "flex", alignItems: "end" }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>
                  Medical Name :
                </Typography>
                <Select
                  style={{ padding: "0px" }}
                  fullWidth
                  id="demo-select-small"
                  value={medicalid}
                  className={classes.settextfield}
                  onChange={(e) => setMedicalid(e.target.value)}
                  getOptionValue={(option) => option._id}
                  getOptionLabel={(option) => option.name}
                  options={medicalList}
                  onKeyPress={handlekeypress}
                >
                  <MenuItem defaultValue="medicalname" value="">
                    <em>None</em>
                  </MenuItem>
                  {medicalList.map((e) => {
                    return <MenuItem value={e._id}>{e.name}</MenuItem>;
                  })}
                </Select>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              className={classes.setinputlayoutforodrbtn}
              style={{ marginBottom: "2px" }}
            >
              <Button
                variant="contained"
                className={classes.setproductbtnsend}
                onClick={fetchSellerdata}
              >
                Save
              </Button>
            </Grid>
          </Grid>

          {dbFetcherr && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherr}{" "}
            </Typography>
          )}
          {emptyMeducalid && (
            <Typography className={classes.setErrorLabel}>
              {emptyMeducalid}{" "}
            </Typography>
          )}
          {conformMessage && (
            <Typography className={classes.setErrorLabel}>
              {conformMessage}{" "}
            </Typography>
          )}
          {billdatafetchError && (
            <Typography className={classes.setErrorLabel}>
              {billdatafetchError}{" "}
            </Typography>
          )}
          {emptyRecords && (
            <Typography className={classes.setErrorLabel}>
              {"Record Not Found"}{" "}
            </Typography>
          )}
        </Paper>
        {dataView && (
          <Paper className={classes.setProductpaper} elevation={5}>
            {paymentTableError && (
              <Typography className={classes.setErrorLabel}>
                {paymentTableError}{" "}
              </Typography>
            )}
            {errors.isCheck && (
              <Typography className={classes.setErrorLabel}>
                {errors.isCheck}{" "}
              </Typography>
            )}
            <TableContainer>
              <Table stickyHeader className={classes.settable}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableth}>
                      <Checkbox
                        checked={
                          !medicalBillList.some(
                            (user) => user?.isChecked !== true
                          )
                        }
                        onChange={handleOnChange}
                        name="allselect"
                      />{" "}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableth}
                      style={{ minWidth: "150px" }}
                    >
                      Invoice No
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Total Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Receive Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Return Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Less Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicalBillList.map((e, index) => {
                    if (e.status === false) {
                      console.log(e)
                      return (
                        <StyledTableRow>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                            className={classes.tabletd}
                          >
                            <Checkbox
                              name={e.invoiceId}
                              checked={e?.isChecked || false}
                              onChange={handleOnChange}
                            />
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
                            {e.pendingamount ? e.pendingamount : e.totalPayable}
                          </StyledTableCell>
                          {copyData.map((data) => {
                            if (data.invoiceId === e.invoiceId) {
                              if (data.payamterror) {
                                errStatus = true;
                              }
                            }
                          })}
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            <TextField
                              error={errStatus}
                              disabled={!e.isChecked && disabled}
                              size="small"
                              variant="outlined"
                              id="payamount"
                              name="payamount"
                              style={{ minWidth: "160px" }}
                              value={e.payamt}
                              onChange={handleawbdisplay(index)}
                              className={classes.settextfield}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.returnamt ? e.returnamt : 0}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.pendingamount
                              ? e.difference !== undefined
                                ? e.difference
                                : e.pendingamount
                              : e.difference
                                ? e.difference
                                : e.totalPayable}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                className={classes.setproductbtnsend}
                onClick={handleadddata}
              >
                Save
              </Button>
            </div>
          </Paper>
        )}
      </Container>
      <Loader active={active} />
    </>
  );
};

export default PaymentEntry;
