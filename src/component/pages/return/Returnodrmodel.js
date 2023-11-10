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
// import ProductStyle from "./ProductStyle";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Loader from "../../commonLink/Loader";
import moment from "moment";
import BillStyle from "../Bill/BillStyle";
import { Box } from "@mui/system";

const Returnodrmodel = ({ invoiceid, medical }) => {
  const [billList, setBillList] = useState([]);
  const [productList, setProductList] = useState([]);

  const classes = BillStyle();
  let token = localStorage.getItem("ssAdmin");

  useEffect(() => {
    fetchHiredata();
  }, []);

  const fetchHiredata = () => {
    api
      .get(`return/subreturn_list_model/${invoiceid}`, {
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
      .get("product/product_list", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        setProductList(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
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
                date
              </TableCell>
              <TableCell align="center" className={classes.tableth}>
                Invoice id
              </TableCell>
              <TableCell align="center" className={classes.tableth}>
                product
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
                    {moment(e.date).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.invoiceId}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {/* {e.invoiceId} */}
                    {productList.map((data) => {
                      if (data._id === e.product) {
                        return data.name;
                      }
                    })}
                  </StyledTableCell>

                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.returnqty}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tabletd} align="center">
                    {e.returnamt}
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

export default Returnodrmodel;
