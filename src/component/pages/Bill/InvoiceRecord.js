import {
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
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
import BillStyle from "./BillStyle";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import InvoiceModelOpen from "./InvoiceModelOpen";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReactToPrint from "react-to-print";
import DeleteIcon from "@mui/icons-material/Delete";
import returnimg from "../../../odrreturn.png";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CommonPagination from "../../commonLink/pagination";

const InvoiceRecord = () => {
  const [active, setActive] = useState(true);
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [billList, setBillList] = useState([]);
  const [billListSub, setBillListSub] = useState([]);
  const [billstateId, setBillstateId] = useState("");
  const [productListName, setProductListName] = useState([]);
  const [medicalList, setMedicalList] = useState([]);
  const [salesmenList, setSalesmenList] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [PdfSelectedData, setPdfSelectedData] = useState({});
  const [selectedSels, setSelectedSels] = useState({});
  const [dbFetcherrbank, setDbFetcherrbank] = useState("");
  const [bankDetails, setBankDetails] = useState([]);
  const [pdfJenerated, setPdfJenerated] = useState(false);
  const [profileList, setProfileList] = useState([]);
  const [pdfDownload, setPdfDownload] = useState(false);
  const [pdfDownload1, setPdfDownload1] = useState(false);
  const [pdfDownload2, setPdfDownload2] = useState(false);
  const [pdfDownload3, setPdfDownload3] = useState(false);
  const [modelOpenPdfview, setModelOpenPdfview] = useState(false);
  const [pdfDownloadBtnclick, setPdfDownloadBtnclick] = useState(false);
  const [modelOpenPdfdownload, setModelOpenPdfdownload] = useState(false);
  const [deleterr, setDeleterr] = useState("");
  const [paymentList, setPaymentList] = useState([]);
  const [pdfViewdata, setPdfViewdata] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [isSelectedValueChanged, setIsSelectedValueChanged] = useState(false);
  const [productListMrp, setProductListMrp] = useState([]);
  const [paginationlist, setPaginationlist] = useState([]);
  const [dataView, setDataView] = useState(false);
  const [medicalid, setMedicalid] = useState("");
  const [error, setError] = useState([]);
  const [emptyRecords, setEmptyRecords] = useState(false);
  const [salesmanid, setSalesmanid] = useState("");
  const [date, setDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  const history = useHistory();
  let token = localStorage.getItem("ssAdmin");
  const componentRef = useRef();
  useEffect(() => {
    fetchSellerdata();
  }, []);
  const classes = BillStyle();

  var perpage = 20;
  // console.log(workdata.length)
  var startIndex = (page - 1) * perpage;
  var endIndex = page * perpage;
  useEffect(() => {
    var currentCards = billList.slice(startIndex, endIndex);
    setPaginationlist(currentCards);
  }, [page, billList]);

  var totalpages = Math.ceil(billList.length / perpage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchSellerdata = () => {
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
        console.log(err);
        if (err.response.status === 401) {
          localStorage.removeItem("ssAdmin");
          history.push("/");
        }
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

  const fetchdetailsdata = (e) => {
    if (medicalid || (date && toDate) || salesmanid) {
      getdata();
    } else {
      error.medicalid = "Field Required";
      setError({ ...error, [e.target.name]: e.target.value });
      setTimeout(() => {
        setError([]);
      }, 3000);
    }
  };

  const getdata = () => {
    let data = {
      medical: medicalid,
      startDate: date,
      endDate: toDate,
      salesmen: salesmanid,
      status: selectedValue,
    };
    api
      .post("bill/mainbill_list", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setActive(false);
        setMedicalid("");
        setDate("");
        setToDate("");
        setSalesmanid("");
        setSelectedValue("");
        let groppdata = JSON.parse(result.data.result.senddata);
        setPdfViewdata(groppdata);
        if (result.data.result.result.length === 0) {
          setDataView(false);
          setEmptyRecords(true);
          setTimeout(() => {
            setEmptyRecords(false);
          }, 3000);
        } else {
          setDataView(true);

          setBillList(result.data.result.result);
        }
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
      .post("payment/payment_list", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setPaymentList(result.data.result.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pdfDownloadfun = () => {
    setPdfDownloadBtnclick(true);
    setModelOpenPdfdownload(true);
  };

  const handleview = (data) => {
    setInvoiceId(data);
    setModelOpen(true);
  };

  const handleedit = (data) => {
    history.push(`/app/editbill/${data}`);
  };

  const isDateToday = (dateToCompare) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dateToCompare = new Date(dateToCompare);
    dateToCompare.setHours(0, 0, 0, 0);
    // console.log(dateToCompare.getTime() === today.getTime())
    return dateToCompare.getTime() === today.getTime();
  };

  const handledownloadpdf = (data) => {
    let dtas = salesmenList.find((item) => item._id === data.salesmen);
    setSelectedSels(dtas);
    setPdfSelectedData(data);
    setModelOpenPdfview(true);
    api
      .get(`bill/subbill_list_model/${data.invoiceId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setPdfDownload(true);
        setBillListSub(result.data.result);
        const uniqueMedicalIds = new Set(
          result.data.result.map((item) => item.medical)
        );

        // Convert Set to an array if needed
        const uniqueMedicalIdsArray = Array.from(uniqueMedicalIds);

        setBillstateId(uniqueMedicalIdsArray[0]);

        // let updatedata = Array.from(new Set(result.data.result))
        //   console.log(updatedata)
      })
      .catch((err) => {
        setPdfDownload(false);
        setDbFetcherrbank("Server Error");
      });

    api
      .get("product/product_list", {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setPdfDownload1(true);
        setProductListMrp(result.data.result);
      })
      .catch((err) => {
        setPdfDownload1(false);
      });

    api
      .get("product/product_list_seperate", {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setPdfDownload1(true);
        setProductListName(result.data.result);
      })
      .catch((err) => {
        setPdfDownload1(false);
        setDbFetcherrbank("Server Error");
        setTimeout(() => {
          setDbFetcherrbank("");
        }, 3000);
      });
    api
      .get("profile/profile_company_list", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setPdfDownload2(true);
        setProfileList(result.data.result);
      })
      .catch((err) => {
        setPdfDownload2(false);
        setDbFetcherrbank("Server Error");
        setTimeout(() => {
          setDbFetcherrbank("");
        }, 3000);
      });

    api
      .get("profile/profile_list", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setPdfDownload3(true);
        setActive(false);
        setBankDetails(result.data.result);
        setPdfJenerated(true);
      })
      .catch((err) => {
        setPdfDownload3(false);
        setActive(false);
        if (err.response.status === 401) {
          localStorage.removeItem("ssAdmin");
          history.push("/");
        }
        setDbFetcherrbank("Server Error");
        setTimeout(() => {
          setDbFetcherrbank("");
        }, 3000);
      });
    // setTimeout(() => {
    //   setPdfDownload(false);
    // }, 5000);
  };

  const handledelete = (data) => {
    setActive(true);
    api
      .delete(`bill/billdetails_delete/${data}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false);
        setDataView(false);
      })
      .catch((err) => {
        setActive(false);
        setDeleterr(err.response.data.error);
        setTimeout(() => {
          setDeleterr("");
        }, 3000);
      });
  };

  const handlereturnodr = (data) => {
    history.push(`/app/returnbill/${data}`);
  };

  const handleradilinput = (e) => {
    setSelectedValue(e.target.value);
    setIsSelectedValueChanged(true);
  };
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Invoice Record
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
            {/* {deleteerror && (
            <Typography className={classes.setErrorLabel}>
              {deleteerror}{" "}
            </Typography>
          )} */}
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                className={classes.setproductbtnsend}
                onClick={pdfDownloadfun}
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
                      Invoice id
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Medical
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Total Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Discount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Amount Receive
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Salesmen
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Return
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginationlist.map((e, index) => {
                    let isToday = isDateToday(e.date);
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
                          {e.invoiceId}
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
                          {e.totalPayable ? e.totalPayable : e.totalamt}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.tabletd}
                          align="center"
                        >
                          {e.discount ? e.discount : 0}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.tabletd}
                          align="center"
                        >
                          {e.status === true ? "Done" : "Pending"}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.tabletd}
                          align="center"
                        >
                          {salesmenList.map((data) => {
                            if (data._id === e.salesmen) {
                              return data.name;
                            }
                          })}
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.tabletd}
                          align="center"
                        >
                          {e.returnstatus === true ? "True" : "False"}
                        </StyledTableCell>

                        <StyledTableCell
                          className={classes.tabletdicon}
                          align="center"
                        >
                          <div className={classes.seticondiv}>
                            {isToday && e.status === false ? (
                              <div>
                                <Tooltip title="Edit">
                                  <EditIcon
                                    className={classes.seteditincon}
                                    onClick={() => handleedit(e.invoiceId)}
                                  />
                                </Tooltip>
                              </div>
                            ) : (
                              <div
                                style={{ width: "23px", height: "31px" }}
                              ></div>
                            )}
                            <div>
                              <Tooltip title="Bill Information">
                                <InfoIcon
                                  className={classes.seteditincon}
                                  onClick={() => handleview(e.invoiceId)}
                                />
                              </Tooltip>
                            </div>
                            <Tooltip title="PDF Download">
                              <PictureAsPdfIcon
                                className={classes.seteditincon}
                                onClick={() => handledownloadpdf(e)}
                              />
                            </Tooltip>
                            <Tooltip title="Return Product">
                              <div>
                                <img
                                  src={returnimg}
                                  style={{
                                    maxWidth: "25px",
                                    paddingLeft: "3px",
                                  }}
                                  onClick={() => handlereturnodr(e.invoiceId)}
                                />
                              </div>
                            </Tooltip>

                            {isToday && e.returnstatus == false ? (
                              <div>
                                <Tooltip title="Remove">
                                  <DeleteIcon
                                    className={classes.setdeleteincon}
                                    onClick={() => handledelete(e.invoiceId)}
                                  />
                                </Tooltip>
                              </div>
                            ) : (
                              <div style={{ width: "23px" }}></div>
                            )}
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
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
              <CommonPagination
                count={totalpages}
                page={page}
                handleChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </div>
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
          <InvoiceModelOpen medical={medicalList} invoiceid={invoiceId} />
        </Box>
      </Modal>
      <Modal
        open={modelOpenPdfview}
        onClose={() => {
          setModelOpenPdfview(false);
          setPdfDownload(false);
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
            Would you like to Download this Invoice from the list ?
          </Typography>
          <Divider />
          <div className={classes.setbtndeldiv}>
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" className={classes.deletebtn}>
                  {pdfJenerated &&
                  pdfDownload &&
                  pdfDownload1 &&
                  pdfDownload2 &&
                  pdfDownload3
                    ? "Download"
                    : "Please Wait"}
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>
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
      {pdfJenerated &&
        pdfDownload &&
        pdfDownload1 &&
        pdfDownload2 &&
        pdfDownload3 && (
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
                  HAREKRISHNA
                  <br />
                  <span style={{ paddingLeft: "20px" }}>GLOBAL EXPORT</span>
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <span style={{ display: "flex", alignContent: "baseline" }}>
                    {moment(PdfSelectedData.date).format("DD-MM-YYYY")}
                  </span>
                  <h4
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    Invoice No :
                    <span style={{ paddingLeft: "5px" }}>
                      {" "}
                      {PdfSelectedData.invoiceId}{" "}
                    </span>
                  </h4>
                </div>
              </div>
              <hr style={{ color: "black" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 20px 0",
                  minHeight: "100px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    BILLED TO:{" "}
                    <span>
                      {medicalList.map((data) => {
                        if (billstateId === data._id) {
                          return data.name;
                        }
                      })}
                    </span>
                  </h4>
                  <h4
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    {medicalList.map((data) => {
                      if (data._id === billListSub[0].medical) {
                        return data.mobile;
                      }
                    })}
                  </h4>
                  <div style={{display:"flex"}}>
                    <h4
                      style={{
                        display: "flex",
                        alignContent: "baseline",
                        margin: "0",
                      }}
                    >
                      Address:
                    </h4>
                    <span style={{ paddingLeft: "5px" }}>
                      {medicalList.map((data) => {
                        if (billstateId === data._id) {
                          return  data.address;
                        }
                      })}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                  }}
                >
                  <span style={{ display: "flex", alignContent: "baseline" }}>
                    {profileList.length > 0 ? profileList[0].comname : ""}
                  </span>
                  <span style={{ display: "flex", alignContent: "baseline" }}>
                    {profileList.length > 0 ? profileList[0].comnumber : ""}
                  </span>
                </div>
              </div>
              <hr style={{ color: "black" }} />
              <div className="content" style={{ padding: "20px 20px 10px" }}>
                <table
                  className="table"
                  style={{ width: "100%", padding: "20px 20px 10px" }}
                >
                  <thead>
                    <tr className="pdftableborder">
                      <th style={{ textAlign: "left", width: "60%" }}>
                        Description
                      </th>
                      <th style={{ textAlign: "center" }}>Rate</th>
                      <th style={{ textAlign: "center" }}>Quantity</th>
                      <th style={{ textAlign: "center" }}>Mrp</th>
                      <th style={{ textAlign: "center" }}>Amount</th>
                      {/* <th style={{ textAlign: "center" }}>Payable Amount</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {billListSub.map((e, index) => {
                      return (
                        <tr className="pdftableborder">
                          <td style={{ textAlign: "left" }}>
                            {productListName.map((data) => {
                              if (data._id === e.product) {
                                return data.name;
                              }
                            })}
                          </td>
                          <td style={{ textAlign: "center" }}>{e.rate}</td>
                          <td style={{ textAlign: "center" }}>{e.qty}</td>
                          <td style={{ textAlign: "center" }}>
                            {productListMrp.map((data) => {
                              if (data.name === e.product) {
                                return data.mrp;
                              }
                            })}
                          </td>
                          <td style={{ textAlign: "center" }}>{e.amount}</td>
                          {/* <td style={{ textAlign: "center" }}>{e.totalPayable}</td> */}
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}>
                        {billList.map((bill) => {
                          if (billListSub[0].invoiceId == bill.invoiceId) {
                            return bill.totalamt;
                          }
                        })}
                      </td>
                    </tr>
                    <tr style={{ height: "20px" }}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center", paddingTop: "10px" }}>
                        Total{" "}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          borderTop: "2px solid black",
                          paddingTop: "10px",
                        }}
                      >
                        {billList.map((bill) => {
                          if (billListSub[0].invoiceId == bill.invoiceId) {
                            return bill.totalPayable;
                          }
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div></div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 20px 20px",
                  minHeight: "100px",
                  width: "-webkit-fill-available",
                  position: "absolute",
                  bottom: "0",
                  borderTop: " 1px solid",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    Payment Information
                  </h4>
                  <span
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    {profileList.length > 0 ? profileList[0].comname : ""}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    Bank :{" "}
                    <span style={{ paddingLeft: "5px" }}>
                      {" "}
                      {bankDetails.length > 0
                        ? bankDetails[0].bankname
                        : ""}{" "}
                    </span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    IFSC :{" "}
                    <span style={{ paddingLeft: "5px" }}>
                      {" "}
                      {bankDetails.length > 0 ? bankDetails[0].ifsc : ""}{" "}
                    </span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      margin: "0",
                    }}
                  >
                    Account No :{" "}
                    <span style={{ paddingLeft: "5px" }}>
                      {" "}
                      {bankDetails.length > 0
                        ? bankDetails[0].account
                        : ""}{" "}
                    </span>
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "flex", alignContent: "baseline" }}>
                    {profileList.length > 0 ? profileList[0].comname : ""}
                  </span>
                  <span style={{ display: "flex", alignContent: "baseline" }}>
                    {profileList.length > 0 ? profileList[0].comnumber : ""}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignContent: "baseline",
                      marginTop: "15px",
                    }}
                  >
                    Salesman :
                    <span style={{ paddingLeft: "5px" }}>
                      {" "}
                      {selectedSels.name}
                    </span>
                  </span>
                  <span style={{ display: "flex", alignContent: "baseline" }}>
                    Phone No. :
                    <span style={{ paddingLeft: "5px" }}>
                      {selectedSels.mobile}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      {pdfDownloadBtnclick && (
        <div
          ref={componentRef}
          style={{
            background: "#faf8eb",
            minHeight: "100vh",
            maxHeight: "100%",
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
              {pdfViewdata.map((data) => {
                let totalAmount = 0;
                let totalpandingamounts = 0;
                data.record.forEach((e) => {
                  console.log(e);
                  totalAmount += parseInt(e.totalPayable, 10)
                    ? parseInt(e.totalPayable, 10)
                    : e.totalamt;
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
                          <th style={{ textAlign: "center" }}>Invoice</th>
                          <th style={{ textAlign: "center" }}>Medical</th>
                          <th style={{ textAlign: "center" }}>salesmen</th>
                          <th style={{ textAlign: "center" }}>Total Amount</th>
                          <th style={{ textAlign: "center" }}>
                            Payable Amount
                          </th>
                          <th style={{ textAlign: "center" }}>Return Amount</th>
                          <th style={{ textAlign: "center" }}>
                            pending Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.record.map((e) => {
                          {
                            paymentList.map((data) => {
                              if (data.invoiceId === e.invoiceId) {
                                console.log(typeof data.pendingamount);
                                console.log(typeof data.totalPayable);
                                if (data.status === true) {
                                  totalpandingamounts += data.pendingamount;
                                } else {
                                  totalpandingamounts += data.pendingamount
                                    ? data.pendingamount
                                    : parseInt(data.totalPayable, 10);
                                }
                                console.log(totalpandingamounts);
                              }
                            });
                          }
                          return (
                            <>
                              <tr className="pdftableborder">
                                <td style={{ textAlign: "center" }}>
                                  {moment(e.date).format("DD-MM-YYYY")}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {e.invoiceId}
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
                                  {e.totalamt}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {e.totalPayable ? e.totalPayable : e.totalamt}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {e.returnamt ? e.returnamt : 0}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {paymentList.map((data) => {
                                    if (data.invoiceId === e.invoiceId) {
                                      console.log(data);
                                      if (data.status === true) {
                                        return data.pendingamount;
                                      } else {
                                        return data.pendingamount
                                          ? data.pendingamount
                                          : data.totalPayable
                                          ? data.totalPayable
                                          : data.totalamt;
                                      }
                                    }
                                  })}
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
                          <td style={{ textAlign: "center" }}>{totalAmount}</td>
                          <td style={{ textAlign: "center" }}></td>
                          <td style={{ textAlign: "center" }}>
                            {totalpandingamounts}
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

      <Loader active={active} />
    </>
  );
};

export default InvoiceRecord;
