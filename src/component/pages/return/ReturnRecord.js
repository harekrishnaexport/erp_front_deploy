import {
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
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
import BillStyle from "../Bill/BillStyle";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReactToPrint from "react-to-print";
import DeleteIcon from "@mui/icons-material/Delete";
import returnimg from "../../../odrreturn.png";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Returnodrmodel from "./Returnodrmodel";

const ReturnRecord = () => {
  const [active, setActive] = useState(true);
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [billList, setBillList] = useState([]);
  const [billListSub, setBillListSub] = useState([]);
  const [productList, setProductList] = useState([]);
  const [medicalList, setMedicalList] = useState([]);
  const [salesmenList, setSalesmenList] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [deleteerror, setDeleteerror] = useState("");
  const [PdfSelectedData, setPdfSelectedData] = useState({});
  const [selectedSels, setSelectedSels] = useState({});
  const [dbFetcherrbank, setDbFetcherrbank] = useState("");
  const [bankDetails, setBankDetails] = useState([]);
  const [pdfJenerated, setPdfJenerated] = useState(false);
  const [profileList, setProfileList] = useState([]);
  const [modelOpenPdfview, setModelOpenPdfview] = useState(false);
  const [pdfDownloadBtnclick, setPdfDownloadBtnclick] = useState(false);
  const [modelOpenPdfdownload, setModelOpenPdfdownload] = useState(false);
  const [deleterr, setDeleterr] = useState("");
  const [paymentList, setPaymentList] = useState([]);
  const [pdfViewdata, setPdfViewdata] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [isSelectedValueChanged, setIsSelectedValueChanged] = useState(false);
  const [dataView, setDataView] = useState(false);
  const [medicalid, setMedicalid] = useState("");
  const [error, setError] = useState([]);
  const [emptyRecords, setEmptyRecords] = useState(false);
  const [retrunList, setRetrunList] = useState([]);
  const [salesmanid, setSalesmanid] = useState("");
  const [date, setDate] = useState("");
  const [toDate, setToDate] = useState("");
  const history = useHistory();
  let token = localStorage.getItem("ssAdmin");
  const componentRef = useRef();
  useEffect(() => {
    fetchSellerdata();
  }, []);
  const classes = BillStyle();

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
    };

    api
      .post("return/returnproduct_list", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setDate("");
        setToDate("");
        setSalesmanid("");
        setMedicalid("");
        if (result.data.result.length === 0) {
          setDataView(false);
          setEmptyRecords(true);
          setTimeout(() => {
            setEmptyRecords(false);
          }, 3000);
        } else {
          setDataView(true);
          setRetrunList(result.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleview = (data) => {
    setInvoiceId(data);
    setModelOpen(true);
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

  const handleradilinput = (e) => {
    setSelectedValue(e.target.value);
    setIsSelectedValueChanged(true);
  };
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Return Report
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
            <Grid item xs={12} sm={6} md={3}>
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

            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
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
                      Salesmen
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Total Amount
                    </TableCell>
                    <TableCell align="center" className={classes.tableth}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {retrunList.map((e, index) => {
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
                          {e.returnamt}
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
                              <Tooltip title="Remove">
                                <DeleteIcon
                                  className={classes.setdeleteincon}
                                  onClick={() => handledelete(e.invoiceId)}
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
        )}
      </Container>
      <Modal
        open={modelOpen}
        onClose={() => setModelOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.setmodeldisplay}>
          <Returnodrmodel medical={medicalList} invoiceid={invoiceId} />
        </Box>
      </Modal>

      <Loader active={active} />
    </>
  );
};

export default ReturnRecord;
