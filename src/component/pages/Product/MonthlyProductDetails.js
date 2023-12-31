// import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { api } from "../../Axios";
// import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
// import Loader from "../../commonLink/Loader";
// import { useHistory } from "react-router-dom";
// import ProductStyle from "./ProductStyle";
// import moment from 'moment'
// const MonthlyProductDetails = () => {
//   const [productList, setProductList] = useState([]);
//   const [dbFetcherr, setDbFetcherr] = useState('');
//   const [active, setActive] = useState(true);

//   const classes = ProductStyle()

//   const history = useHistory();

//   useEffect(() => {
//     fetchHiredata();
//   }, []);


//   const fetchHiredata = () => {
//     api
//       .get("product/productdetailsSeperate_list", {
//         headers: {
//           Authorization: localStorage.getItem("ssAdmin"),
//         },
//       })
//       .then((result) => {
//         setActive(false)
//         setProductList(result.data.result);
//       })
//       .catch((err) => {
//         setActive(false)
//         if (err.response.status === 401) {
//           localStorage.removeItem("ssAdmin");
//           history.push("/");
//         }
//         setDbFetcherr(err.response.data.error);
//         setTimeout(() => {
//           setDbFetcherr("");
//         }, 3000);
//       });
//   }
//   return <>
//     <Container component="main" maxWidth="xl" className='setcontainer'>
//       <div className={classes.setpageheading}>
//         <Typography variant="h4" gutterBottom className={classes.setheading}>
//           Product Report
//         </Typography>
//       </div>

//       <Paper className={classes.setProductpaper} elevation={5}>
//         {dbFetcherr && <Typography className={classes.setErrorLabel}>{dbFetcherr} </Typography>}
//         <TableContainer>
//           <Table className={classes.settable} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center" className={classes.tableth}>
//                   No.
//                 </TableCell>
//                 <TableCell align="center" className={classes.tableth}>
//                   Date
//                 </TableCell>
//                 <TableCell align="center" className={classes.tableth}>
//                   Product
//                 </TableCell>
//                 <TableCell align="center" className={classes.tableth}>
//                   Add/Remove Quantity
//                 </TableCell>
//                 <TableCell align="center" className={classes.tableth}>
//                   Amount
//                 </TableCell>
//                 <TableCell align="center" className={classes.tableth}>
//                   Mrp
//                 </TableCell>
//                 <TableCell align="center" className={classes.tableth}>
//                   Expiry
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {productList.map((e, index) => {
//                 return (
//                   <StyledTableRow>
//                     <StyledTableCell align="center" component="th" scope="row" className={classes.tabletd}>
//                       {index + 1}
//                     </StyledTableCell>
//                     <StyledTableCell className={classes.tabletd} align="center">
//                       {moment(e.date).format('DD-MM-YYYY')}
//                     </StyledTableCell>
//                     <StyledTableCell className={classes.tabletd} align="center">
//                       {e.name}
//                     </StyledTableCell>
//                     <StyledTableCell className={classes.tabletd} align="center">
//                       {e.quantity}
//                     </StyledTableCell>
//                     <StyledTableCell className={classes.tabletd} align="center">
//                       {e.rate}
//                     </StyledTableCell>
//                     <StyledTableCell className={classes.tabletd} align="center">
//                       {e.mrp}
//                     </StyledTableCell>
//                     <StyledTableCell className={classes.tabletd} align="center">
//                       {moment(e.expiry).format('DD-MM-YYYY')}
//                     </StyledTableCell>

//                   </StyledTableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Container>
//     <Loader active={active} />
//   </>
// };

// export default MonthlyProductDetails;


import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { api } from "../../Axios";
import { StyledTableCell, StyledTableRow } from "../../commonLink/TableDesign";
import Loader from "../../commonLink/Loader";
import { useHistory } from "react-router-dom";
import ProductStyle from "./ProductStyle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from 'moment'

const MonthlyProductDetails = () => {
  const [productList, setProductList] = useState([]);
  const [dbFetcherr, setDbFetcherr] = useState('');
  const [active, setActive] = useState(true);
const [deleterr, setDeleterr] = useState('')
  const classes = ProductStyle()

  const history = useHistory();

  useEffect(() => {
    fetchHiredata();
  }, []);


  const fetchHiredata = () => {
    api
      .get("product/product_list_seperate", {
        headers: {
          Authorization: localStorage.getItem("ssAdmin"),
        },
      })
      .then((result) => {
        setActive(false)
        setProductList(result.data.result);
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
      .delete(`product/productdetails_delete_list/${e}`, {
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

  const handlesenddata = () => {
    history.push('/app/productadd')
  }
  
  const handleedit = (data) => {
    history.push(`/app/productnameedit/${data}`)
  }
  return <>
    <Container component="main" maxWidth="xl" className='setcontainer'>
      <div className={classes.setpageheading}>
        <Typography variant="h4" gutterBottom className={classes.setheading}>
          Product List
        </Typography>
          <Button variant="contained" size="medium" className={classes.setsendbtninside} onClick={handlesenddata}>
            Add
          </Button>
      </div>

      <Paper className={classes.setProductpaper} elevation={5}>
        {dbFetcherr && <Typography className={classes.setErrorLabel}>{dbFetcherr} </Typography>}
        <TableContainer>
          <Table className={classes.settable} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tableth}>
                  No.
                </TableCell>
                <TableCell align="center" className={classes.tableth}>
                  Date
                </TableCell>
                <TableCell align="center" className={classes.tableth}>
                  Product
                </TableCell>
                <TableCell align="center" className={classes.tableth}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((e, index) => {
                return (
                  <StyledTableRow>
                    <StyledTableCell align="center" component="th" scope="row" className={classes.tabletd}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell className={classes.tabletd} align="center">
                      {moment(e.date).format('DD-MM-YYYY')}
                    </StyledTableCell>
                    <StyledTableCell className={classes.tabletd} align="center">
                      {e.name}
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
    <Loader active={active} />
  </>
};

export default MonthlyProductDetails;
