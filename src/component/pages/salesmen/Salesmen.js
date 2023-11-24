import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../Axios";
import Loader from "../../commonLink/Loader";
import ProductStyle from "../Product/ProductStyle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";


const Salesmen = () => {
    const [medicalList, setMedicalList] = useState([]);
    const [dbFetcherr, setDbFetcherr] = useState('');
    const [deleterr, setDeleterr] = useState('');
    const [active, setActive] = useState(true);
    const classes = ProductStyle()
    const history = useHistory();
    let token = localStorage.getItem("ssAdmin")


    const handlesenddata = () => {
      history.push('/app/salesadd')
    }
  
    useEffect(() => {
      fetchHiredata();
    }, []);
  
    const fetchHiredata = () => {
      api
        .get("sales/salesmendetails_list", {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          setActive(false)
          setMedicalList(result.data.result);
        })
        .catch((err) => {
          setActive(false)
          if (err.response.status === 401) {
            localStorage.removeItem("ssAdmin");
            history.push("/");
          }
          setDbFetcherr(err.response.data.error);
          setTimeout(() => {
            setDbFetcherr("");
          }, 3000);
        });
    }
  
    const handledelete = (e) => {
      setActive(true)
      api
        .delete(`sales/salesmendetails_delete/${e}`, {
          headers: {
            Authorization: localStorage.getItem("ssAdmin"),
          },
        })
        .then((result) => {
          setActive(false)
          fetchHiredata();
        })
        .catch((err) => {
          setActive(false)
          setDeleterr(err.response.data.error);
          setTimeout(() => {
            setDeleterr("");
          }, 3000);
        });
    };
  
    const handleedit = (data) => {
      history.push(`/app/selesedit/${data}`)
    }
  return <>
  <Container component="main" maxWidth="xl" className='setcontainer'>
      <div className={classes.setpageheading}>
        <Typography variant="h4" gutterBottom className={classes.setheading}>
          Salesmen List
        </Typography>
        <Button variant="contained" size="medium" className={classes.setsendbtninside} onClick={handlesenddata}>
          Add
        </Button>
      </div>

      <Paper className={classes.setProductpaper} elevation={5}>
        {deleterr && <Typography className={classes.setErrorLabel}>{deleterr} </Typography>}
        {dbFetcherr && <Typography className={classes.setErrorLabel}>{dbFetcherr} </Typography>}
        <TableContainer>
          <Table className={classes.settable} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tableth}>
                  No.
                </TableCell>
                <TableCell align="center" className={classes.tableth}>
                  name
                </TableCell>
                <TableCell align="center" className={classes.tableth}>
                  email
                </TableCell>
                <TableCell align="center" className={classes.tableth}>
                  mobile
                </TableCell>
                <TableCell align="center" className={classes.tableth}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalList.map((e, index) => {
                return (
                  <StyledTableRow>
                    <StyledTableCell align="center" component="th" scope="row" className={classes.tabletd}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell className={classes.tabletd} align="center">
                      {e.name}
                    </StyledTableCell>
                    <StyledTableCell className={classes.tabletd} align="center">
                      {e.email}
                    </StyledTableCell>
                    <StyledTableCell className={classes.tabletd} align="center">
                      {e.mobile}
                    </StyledTableCell>

                    <StyledTableCell
                      className={classes.tabletdicon}
                      align="center"
                    >
                      <div className={classes.seticondiv} >
                        <div>
                          <Tooltip title="Edit">
                            <EditIcon
                              className={classes.seteditincon}
                              onClick={() => handleedit(e._id)}
                            />
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title="Remove">
                            <DeleteIcon
                              className={classes.setdeleteincon}
                              onClick={() => handledelete(e._id)}
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
    </Container>
    <Loader active={active} /></>;
};

export default Salesmen;
