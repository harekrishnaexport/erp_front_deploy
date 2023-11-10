import {
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import React, { useState, useEffect, useRef } from "react";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import { useHistory } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import Loader from "../../commonLink/Loader";
import moment from "moment";
import { Box } from "@mui/system";
import paymentStyle from "./PaymentStyle";
import PaymentModel from "./PaymentModel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ReactToPrint from "react-to-print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const PaymentRecord = () => {
  const [active, setActive] = useState(true);
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [medicalList, setMedicalList] = useState([]);
  const [date, setDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [invoiceIdfromadmin, setInvoiceIdfromadmin] = useState("");
  const [medicalid, setMedicalid] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [paymentList, setPaymentList] = useState([]);
  const [selectedstatusfromadmin, setSelectedstatusfromadmin] = useState(true);
  const [totalReceivedAmount, setTotalReceivedAmount] = useState("");
  const [totalReturnAmount, setTotalReturnAmount] = useState("");
  const [salesmanid, setSalesmanid] = useState("");
  const [dataView, setDataView] = useState(false);
  const [selectedValue, setSelectedValue] = useState(true);
  const [isSelectedValueChanged, setIsSelectedValueChanged] = useState(false);
  const [emptyRecords, setEmptyRecords] = useState(false);
  const [salesmenList, setSalesmenList] = useState([]);
  const [pdfDownloadBtnclick, setPdfDownloadBtnclick] = useState(false);
  const [error, setError] = useState([]);
  const [modelOpenPdfdownload, setModelOpenPdfdownload] = useState(false);
  const [gruptdataPdf, setGruptdataPdf] = useState([]);
  const history = useHistory();
  let token = localStorage.getItem("ssAdmin");
  let componentRef = useRef();

  useEffect(() => {
    fetchpaymentdata();
  }, []);
  const classes = paymentStyle();

  const fetchpaymentdata = () => {
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
        setDbFetcherr(err.response.data.error);
        setTimeout(() => {
          setDbFetcherr("");
        }, 3000);
      });
  };
  console.log(selectedstatusfromadmin);
  useEffect(() => {
    if (isSelectedValueChanged) {
      setDataView(false);
      setIsSelectedValueChanged(false);
      setMedicalid("");
      setSalesmanid("");
      setDate("");
      setToDate("");
      setInvoiceIdfromadmin("");
    }
  }, [isSelectedValueChanged, selectedValue]);

  useEffect(() => {
    let receiveamt = 0;
    let Retunamt = 0;
    if (selectedstatusfromadmin == "true") {
      for (const payment of paymentList) {
        Retunamt += payment.returnamt ? payment.returnamt : 0;
        receiveamt += payment.totalamount;
      }
    } else {
      let payments;
      for (const payment of paymentList) {
        console.log(payment);

        payments = payment.pendingamount
          ? payment.pendingamount
          : parseInt(payment.totalPayable, 10);
        receiveamt += payments;
        Retunamt += payment.returnamt ? payment.returnamt : 0;
      }
    }
    setTotalReceivedAmount(receiveamt);
    setTotalReturnAmount(Retunamt);
  }, [paymentList]);

  const getdata = () => {
    setActive(true);
    let data = {
      medical: medicalid,
      startDate: date,
      endDate: toDate,
      status: selectedValue,
      id: invoiceIdfromadmin,
      salesmen: salesmanid,
    };
    api
      .post("payment/payment_list", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setActive(false);

        if (result.data.result.result.length === 0) {
          setEmptyRecords(true);
          setDataView(false);
          setTimeout(() => {
            setEmptyRecords(false);
          }, 3000);
        } else {
          let groppdata = JSON.parse(result.data.result.senddata);
          setGruptdataPdf(groppdata);

          setSelectedstatusfromadmin(result.data.result.result[0].status);
          setPaymentList(result.data.result.result);
          setDataView(true);
        }
        setMedicalid("");
        setSalesmanid("");
        setDate("");
        setTotalReceivedAmount("");
        setTotalReturnAmount("");
        setToDate("");
        setInvoiceIdfromadmin("");
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

  const fetchdetailsdata = (e) => {
    if (selectedValue === "true" || selectedValue === true) {
      if (medicalid || (date && toDate) || salesmanid) {
        getdata();
      } else {
        error.medicalid = "Field Required";
        setError({ ...error, [e.target.name]: e.target.value });
        setTimeout(() => {
          setError([]);
        }, 3000);
      }
    } else {
      if (medicalid || (date && toDate) || salesmanid) {
        getdata();
      } else {
        error.medicalid = "Field Required";
        setError({ ...error, [e.target.name]: e.target.value });
        setTimeout(() => {
          setError([]);
        }, 3000);
      }
    }
  };

  const handleview = (data) => {
    setInvoiceId(data);
    setModelOpen(true);
  };

  const handleradilinput = (e) => {
    setSelectedValue(e.target.value);
    setIsSelectedValueChanged(true);
  };

  const pdfDownload = () => {
    setPdfDownloadBtnclick(true);
    setModelOpenPdfdownload(true);
  };
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Payment Record
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          {dbFetcherr && (
            <Typography className={classes.setErrorLabel}>
              {dbFetcherr}{" "}
            </Typography>
          )}
          {error.medicalid && (
            <Typography className={classes.setErrorLabel}>
              {error.medicalid}{" "}
            </Typography>
          )}
          {emptyRecords && (
            <Typography className={classes.setErrorLabel}>
              {"Record Not Found"}{" "}
            </Typography>
          )}
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

            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>From :</Typography>

                <TextField
                  fullWidth
                  type="date"
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder=" *"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  className={classes.settextfield}
                />
              </div>
              {error.date && (
                <Typography className={classes.setErrorLabel}>
                  {error.date}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>to :</Typography>
                <TextField
                  fullWidth
                  type="date"
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder=" *"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className={classes.settextfield}
                />
              </div>
              {error.toDate && (
                <Typography className={classes.setErrorLabel}>
                  {error.toDate}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>
                  Salesman Name :
                </Typography>
                <Select
                  style={{ padding: "0px" }}
                  fullWidth
                  id="demo-select-small"
                  value={salesmanid}
                  className={classes.settextfield}
                  onChange={(e) => setSalesmanid(e.target.value)}
                  getOptionValue={(option) => option._id}
                  getOptionLabel={(option) => option.name}
                  options={salesmenList}
                >
                  <MenuItem defaultValue="" value="">
                    <em>None</em>
                  </MenuItem>
                  {salesmenList.map((e) => {
                    return <MenuItem value={e._id}>{e.name}</MenuItem>;
                  })}
                </Select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.setinsidegrid}>
                <Typography className={classes.setlabel}>
                  Payment Status :
                </Typography>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="true"
                  name="radio-buttons-group"
                  style={{ flexDirection: "row" }}
                  onChange={handleradilinput}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Received"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Pending"
                  />
                </RadioGroup>
              </div>
            </Grid>
          </Grid>
          {error.invoiceIdfromadmin && (
            <Typography className={classes.setErrorLabel}>
              {error.invoiceIdfromadmin}{" "}
            </Typography>
          )}
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
              onClick={fetchdetailsdata}
            >
              Save
            </Button>
          </div>
        </Paper>

        {dataView && (
          <Paper className={classes.setProductpaper} elevation={5}>
            {dbFetcherr && (
              <Typography className={classes.setErrorLabel}>
                {dbFetcherr}{" "}
              </Typography>
            )}
            <div className={classes.pdfpayment}>
              <div>
                <Typography className={classes.setmobileviewtotal}>
                  {(selectedstatusfromadmin === true ||
                    selectedstatusfromadmin === "true") &&
                    `Total Receive Amount: ${totalReceivedAmount}`}
                  {(selectedstatusfromadmin === false ||
                    selectedstatusfromadmin === "false") &&
                    `Total Pending Amount: ${totalReceivedAmount}`}
                </Typography>
                <Typography className={classes.setmobileviewtotal}>
                  {`Total Return Amount: ${totalReturnAmount}`}
                </Typography>
              </div>
              <Button
                variant="contained"
                className={classes.setproductbtnsend}
                onClick={pdfDownload}
                endIcon={<FileDownloadIcon />}
              >
                pdf
              </Button>
            </div>
            <TableContainer>
              <Table className={classes.settable} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.tableth}>
                      No.
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableth}
                      style={{ minWidth: "110px" }}
                    >
                      Date
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Medical
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Invoice id
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Total Amount
                    </TableCell>
                    {selectedstatusfromadmin == false && (
                      <>
                        <TableCell align="center" className={classes.tableth}>
                          Pending Amount
                        </TableCell>
                      </>
                    )}
                    <TableCell align="center" className={classes.tableth}>
                      Return Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentList.map((e, index) => {
                    console.log(e);
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
                          {moment(e.date).format("DD-MM-YYYY")}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.tabletd}
                          align="center"
                        >
                          {medicalList.map((data) => {
                            if (data._id === e.medical) {
                              return data.name;
                            }
                          })}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.tabletd}
                          align="center"
                        >
                          {e.invoiceId}
                        </StyledTableCell>
                        {selectedstatusfromadmin == false ? (
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.totalPayable}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell
                            className={classes.tabletd}
                            align="center"
                          >
                            {e.totalamount}
                          </StyledTableCell>
                        )}

                        {e.status === false && (
                          <>
                            <StyledTableCell
                              className={classes.tabletd}
                              align="center"
                            >
                              {e.pendingamount
                                ? e.pendingamount
                                : e.totalPayable}
                            </StyledTableCell>{" "}
                          </>
                        )}
                        <StyledTableCell
                          className={classes.tabletd}
                          align="center"
                        >
                          {e.returnamt ? e.returnamt : 0}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.tabletdicon}
                          align="center"
                        >
                          <div className={classes.seticondiv}>
                            <Tooltip title="Bill Information">
                              <InfoIcon
                                className={classes.seteditincon}
                                onClick={() => handleview(e.invoiceId)}
                              />
                            </Tooltip>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>
      <Modal
        open={modelOpen}
        onClose={() => setModelOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.setmodeldisplay}>
          <PaymentModel medical={medicalList} invoiceid={invoiceId} />
        </Box>
      </Modal>

      <Modal
        open={modelOpenPdfdownload}
        onClose={() => {
          setPdfDownloadBtnclick(false);
          setModelOpenPdfdownload(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.setmodeldisplay}>
          <Typography
            className={classes.setmodeltypo}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Conformation
          </Typography>
          <Divider />
          <Typography
            className={classes.setmodeltypo}
            id="modal-modal-title"
            variant="body1"
            component="h2"
            style={{ margin: "19px 10px" }}
          >
            Would you like to Download this Payment Record from the list ?
          </Typography>
          <Divider />
          <div className={classes.setbtndeldiv}>
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" className={classes.deletebtn}>
                  {setPdfDownloadBtnclick ? "Download" : "Please Wait"}
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </Box>
      </Modal>
      <Loader active={active} />

      {pdfDownloadBtnclick && (
        <div
          ref={componentRef}
          style={{
            background: "#faf8eb",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <div className="app">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                minHeight: "100px",
                padding: "20px",
                padding: "20px 20px 0",
              }}
            >
              <h4
                style={{
                  fontSize: "30px",
                  margin: "10px 0  ",
                  minWidth: "300px",
                }}
              >
                HAREKRISHNA GLOBAL EXPORT
              </h4>
            </div>
            <hr style={{ color: "black" }} />
            <div className="content" style={{ padding: "20px 20px 10px" }}>
              {gruptdataPdf.map((data) => {
                let totalAmount = 0;
                let totalReceiveAmount = 0;
                data.record.forEach((e) => {
                  totalAmount += e.totalamount;
                  totalReceiveAmount += e.pendingamount
                    ? e.pendingamount
                    : parseInt(e.receiveamount, 10)
                    ? parseInt(e.receiveamount, 10)
                    : parseInt(e.totalPayable, 10);
                });
                return (
                  <>
                    <p
                      style={{
                        display: "flex",
                        color: "white",
                        background: "#3c8dbc",
                        paddingLeft: "10px",
                      }}
                    >
                      Medical:
                      <span style={{ marginLeft: "10px" }}>
                        {medicalList.map((e) => {
                          if (e._id === data.medical) {
                            return e.name;
                          }
                        })}
                      </span>
                    </p>
                    <table
                      className="table"
                      style={{ width: "100%", padding: "20px 20px 10px" }}
                    >
                      <thead>
                        <tr className="pdftableborder">
                          <th style={{ textAlign: "center" }}>Date</th>
                          <th style={{ textAlign: "center" }}>Medical</th>
                          <th style={{ textAlign: "center" }}>salesmen</th>
                          <th style={{ textAlign: "center" }}>Invoice Id</th>
                          <th style={{ textAlign: "center" }}>Total Amount</th>
                          <th style={{ textAlign: "center" }}>
                            {selectedValue == "true" || selectedValue == true
                              ? "Receive Amount"
                              : "Pending Amount"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.record.map((e) => {
                          return (
                            <>
                              <tr className="pdftableborder">
                                <td style={{ textAlign: "center" }}>
                                  {moment(e.date).format("DD-MM-YYYY")}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {medicalList.map((data) => {
                                    if (data._id === e.medical) {
                                      return data.name;
                                    }
                                  })}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {salesmenList.map((data) => {
                                    if (data._id === e.salesmen) {
                                      return data.name;
                                    }
                                  })}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {e.invoiceId}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {console.log(e.totalAmount)}
                                  {selectedValue == "true" ||
                                  selectedValue == true
                                    ? e.totalamount
                                    : e.totalPayable}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {selectedstatusfromadmin == "true" ||
                                  selectedstatusfromadmin == true
                                    ? e.totalamount
                                    : e.pendingamount
                                    ? e.pendingamount
                                    : e.totalPayable}
                                </td>
                              </tr>
                            </>
                          );
                        })}

                        <tr>
                          <td></td>
                          <td style={{ textAlign: "center" }}></td>
                          <td style={{ textAlign: "center" }}></td>
                          <td style={{ textAlign: "center" }}></td>
                          <td
                            style={{ textAlign: "center", fontWeight: "600" }}
                          >
                            {"Total Amount"}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {selectedstatusfromadmin == "true" ||
                            selectedstatusfromadmin == true
                              ? totalAmount
                              : totalReceiveAmount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                );
              })}

              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentRecord;
