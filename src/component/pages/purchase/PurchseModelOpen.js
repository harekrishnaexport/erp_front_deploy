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
import BillStyle from "../Bill/BillStyle";
import { Box } from "@mui/system";
const PurchseModelOpen = ({ invoiceid }) => {
  const [billList, setBillList] = useState([]);
  const classes = BillStyle();
const history = useHistory()
  useEffect(() => {
    fetchHiredata();
  }, []);

  const fetchHiredata = () => {
    api
      .get(`purchase/purchase_list/${invoiceid}`, {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setBillList(result.data.result);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("ssAdmin");
          history.push("/");
        }
      });
  };
  return (
    <>
      <TableContainer>
        <Table className={classes.settable} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableth}>
                party
              </TableCell>
              <TableCell align="center" className={classes.tableth}>
                product
              </TableCell>
              <TableCell align="center" className={classes.tableth}>
                rate
              </TableCell>
              <TableCell align="center" className={classes.tableth}>
                qty
              </TableCell>

              <TableCell align="center" className={classes.tableth}>
                Amount
              </TableCell>
              <TableCell align="center" className={classes.tableth}>
                Expiry
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billList.map((e, index) => {
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

                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.party}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.name}
                  </StyledTableCell>

                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.rate}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.qty}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.amount}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.expiry}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PurchseModelOpen;
