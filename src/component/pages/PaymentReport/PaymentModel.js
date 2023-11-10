import { Button, Container, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
// import ProductStyle from "./ProductStyle";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import Loader from "../../commonLink/Loader";
import moment from 'moment'
import { Box } from "@mui/system";
import paymentStyle from "./PaymentStyle";
const PaymentModel = ({ invoiceid, medical }) => {
  const [billList, setBillList] = useState([]);
  const [productList, setProductList] = useState([]);

  const classes = paymentStyle();
  let token = localStorage.getItem("ssAdmin")

  useEffect(() => {
    fetchHiredata();
  }, []);

  const fetchHiredata = () => {
    api
      .get(`/payment/payment_list_seperate/${invoiceid}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        // setActive(false)
        setBillList(result.data.result);
      })
      .catch((err) => {
        console.log(err)
      });


  }
  return (
    <>
      {/* <Typography
        className={classes.setmodeltypo}
        id="modal-modal-title"
        variant="h5"
        component="h2"
      >
        Invoice id : {medical.map((data) => {
          if (data._id === e.medical) {
            return data.name
          }
        })}
      </Typography> */}
      {/* <Divider /> */}
      <TableContainer>
        <Table className={classes.settable} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell align="center" className={classes.tableth} style={{ minWidth: "110px" }}>
                date
              </TableCell>
              <TableCell align="center" className={classes.tableth} style={{ minWidth: "110px" }}>
                medical
              </TableCell>
              <TableCell align="center" className={classes.tableth} >
                invoiceId
              </TableCell>

              <TableCell align="center" className={classes.tableth} style={{ minWidth: "150px" }}>
                Receive amount
              </TableCell>
              <TableCell align="center" className={classes.tableth} style={{ minWidth: "150px" }}>
                Pending amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billList.map((e, index) => {
              return (
                <StyledTableRow>

                  <StyledTableCell className={classes.tabletd} align="center">
                    {moment(e.date).format('DD-MM-YYYY')}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {medical.map((data) => {
                      if (data._id === e.medical) {
                        return data.name
                      }
                    })}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.invoiceId}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.payamount}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.pandingamount}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PaymentModel