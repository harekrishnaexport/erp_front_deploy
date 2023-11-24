import {
  Button,
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import BillStyle from "./BillStyle";

const InvoiceModelOpen = ({ invoiceid, medical }) => {
  const [billList, setBillList] = useState([]);
  const [productListName, setProductListName] = useState([]);
  const classes = BillStyle();
  let token = localStorage.getItem("ssAdmin");

  useEffect(() => {
    fetchHiredata();
  }, []);

  const fetchHiredata = () => {
    api
      .get(`bill/subbill_list_model/${invoiceid}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setBillList(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("product/product_list_seperate", {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setProductListName(result.data.result);
      })
      .catch((err) => {});
  };
  return (
    <>
      <TableContainer>
        <Table className={classes.settable} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableth}>
                No.
              </TableCell>

              <TableCell align="center" className={classes.tableth}>
                medical
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
                Return Qty
              </TableCell>
              <TableCell align="center" className={classes.tableth}>
                Amount
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
                    {medical.map((data) => {
                      if (data._id === e.medical) {
                        return data.name;
                      }
                    })}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {/* {e.invoiceId} */}
                    {productListName.map((data) => {
                      if (data._id === e.product) {
                        return data.name;
                      }
                    })}
                  </StyledTableCell>

                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.rate}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.qty}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.return ? e.return : 0}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.amount}
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

export default InvoiceModelOpen;
