import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { api } from "../../Axios";
import ProfileStyle from "./ProfileStyle";

const Owncompanydetail = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [upname, setUpname] = useState('');
  const [upphone, setPUpnone] = useState('');
  const [errors, setErrors] = useState([]);
  const [editid, setEditid] = useState("");
  const [dbEditerr, setDbEditerr] = useState('');
  const [dbAdderr, setDbAdderr] = useState('');
  const [dbFetcherr, setDbFetcherr] = useState('');
  const [updateRecord, setUpdateRecord] = useState(false);
  const [addRecord, setAddRecord] = useState(false);
  let token = localStorage.getItem('ssAdmin')

  const classes = ProfileStyle()
  const handlename = (e) => {
    setName(e.target.value)
  }
  const handlephone = (e) => {
    setPhone(e.target.value)
  }
  const handleupname = (e) => {
    setUpname(e.target.value)
  }
  const handleupphone = (e) => {
    setPUpnone(e.target.value)
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    api
      .get(`/profile/profile_company_list`, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        if (result.data.result.length > 0) {
          setEditid(result.data.result[0]._id)
          setUpname(result.data.result[0].comname)
          setPUpnone(result.data.result[0].comnumber)
        }
      })
      .catch((err) => {
        setDbFetcherr(err.response.data.error);
        setTimeout(() => {
          setDbFetcherr("");
        }, 3000);
      });
  }


  const senddata = (e) => {
    if (editid) {
      if (!upname || !upphone) {
        if (!upname) {
          errors.upname = " Required !!";
        } else {
          errors.upname = "";
        }

        if (!upphone) {
          errors.upphone = " Required !!";
        } else {
          errors.upphone = "";
        }

        setErrors({ ...errors, [e.target.name]: e.target.value });
        setTimeout(() => {
          setErrors([])
        }, 3000);
      } else {
        const data = {
          comname: upname,
          comnumber: upphone,
        };
        api
          .post(`/profile/Profiledetails_profile_update/${editid}`, data, {
            headers: {
              Authorization: token,
            },
          })
          .then((result) => {
            setUpdateRecord(true)
            setTimeout(() => {
              setUpdateRecord(false)
            }, 3000);
            fetchdata();
          })
          .catch((err) => {
            setDbEditerr(err.response.data.error);
            setTimeout(() => {
              setDbEditerr("");
            }, 3000);
          });
      }
    } else {
      if (!name || !phone) {
        if (!name) {
          errors.name = " Required !!";
        } else {
          errors.name = "";
        }

        if (!phone) {
          errors.phone = " Required !!";
        } else {
          errors.phone = "";
        }


        setErrors({ ...errors, [e.target.name]: e.target.value });
        setTimeout(() => {
          setErrors([])
        }, 3000);
      } else {
        const data = {
          comname: name,
          comnumber: phone,
          // id
        };
        api
          .post(`/profile/Profiledetails_profile_add`, data, {
            headers: {
              Authorization: token,
            },
          })
          .then((result) => {
            setAddRecord(true)
            fetchdata();
            setTimeout(() => {
              setAddRecord(false)
            }, 3000);
          })
          .catch((err) => {
            setDbAdderr(err.response.data.error);
            setTimeout(() => {
              setDbAdderr("");
            }, 3000);
          });
      }
    }

  };
  return <>
    <Paper className={classes.setProductpaper} elevation={5}>
      {/* <div className={classes.setpageheading}> */}
      <Typography variant="h5" gutterBottom className={classes.setInnerheading}>
        Company
      </Typography>
      {/* </div> */}
      {dbEditerr && (
        <Typography className={classes.setErrorLabel} style={{marginBottom:'15px'}}>
          {dbEditerr}{" "}
        </Typography>
      )}
      {dbFetcherr && (
        <Typography className={classes.setErrorLabel} style={{marginBottom:'15px'}}>
          {dbFetcherr}{" "}
        </Typography>
      )}
      {dbAdderr && (
        <Typography className={classes.setErrorLabel} style={{marginBottom:'15px'}}>
          {dbAdderr}{" "}
        </Typography>
      )}
      {addRecord && (
        <Typography className={classes.setErrorLabel} style={{marginBottom:'15px'}}>
          {"Record Added Successfully"}
        </Typography>
      )}
      {updateRecord && (
        <Typography className={classes.setErrorLabel} style={{marginBottom:'15px'}}>
          {"Record Update Successfully"}
        </Typography>
      )}
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
          <div>
            <Typography className={classes.setlabel}>Name : </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              variant="outlined"
              placeholder="name *"
              value={editid ? upname : name}
              onChange={editid ? handleupname : handlename}
              className={classes.settextfield}
            />
          </div>
          {errors.name && (
            <Typography className={classes.setErrorLabel}>
              {errors.name}{" "}
            </Typography>
          )}
          {errors.upname && (
            <Typography className={classes.setErrorLabel}>
              {errors.upname}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
          <div>
            <Typography className={classes.setlabel}>Phone No :</Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              variant="outlined"
              placeholder="new password *"
              value={editid ? upphone : phone}
              onChange={editid ? handleupphone : handlephone}
              className={classes.settextfield}
            />
          </div>
          {errors.phone && (
            <Typography className={classes.setErrorLabel}>
              {errors.phone}{" "}
            </Typography>
          )}
          {errors.upphone && (
            <Typography className={classes.setErrorLabel}>
              {errors.upphone}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>

        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout} style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'flex-end'
        }}>
          <div className={classes.setsendbutton}>

            {editid ?
              <Button
                variant="contained"
                size="medium"
                className={classes.setsendbtninside}
                onClick={senddata}
              >
                update
              </Button>
              :
              <Button
                variant="contained"
                size="medium"
                className={classes.setsendbtninside}
                onClick={senddata}
              >
                Add
              </Button>
            }
          </div>
        </Grid>
      </Grid>
    </Paper>
  </>;
};

export default Owncompanydetail;
