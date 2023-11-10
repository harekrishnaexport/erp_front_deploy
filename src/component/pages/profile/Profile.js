import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { api } from "../../Axios";
import Owncompanydetail from "./Owncompanydetail";
import ForgotPassword from "./Password";
import ProfileStyle from "./ProfileStyle";

const Profile = () => {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [upName, setUpName] = useState("");
  const [upAccount, seUptAccount] = useState("");
  const [upBank, setUpBank] = useState("");
  const [upIfsc, setUpIfsc] = useState("");
  const [editid, setEditid] = useState("");
  const [dbEditerr, setDbEditerr] = useState("");
  const [dbAdderr, setDbAdderr] = useState("");
  const [dbFetcherr, setDbFetcherr] = useState("");
  const [updateRecord, setUpdateRecord] = useState(false);
  const [addRecord, setAddRecord] = useState(false);
  const [listofrecord, setListofrecord] = useState([]);

  const [errors, setErrors] = useState([]);
  let token = localStorage.getItem("ssAdmin");

  const classes = ProfileStyle();
  const handlename = (event) => {
    setName(event.target.value);
  };
  const handlebank = (event) => {
    setBank(event.target.value);
  };
  const handleifsc = (event) => {
    setIfsc(event.target.value);
  };
  const handleaccount = (event) => {
    setAccount(event.target.value);
  };

  const handleupname = (e) => {
    setUpName(e.target.value);
  };
  const handleupnaccount = (e) => {
    seUptAccount(e.target.value);
  };
  const handleupbank = (e) => {
    setUpBank(e.target.value);
  };
  const handleupifsc = (e) => {
    setUpIfsc(e.target.value);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    api
      .get(`/profile/profile_list`, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        if (result.data.result.length > 0) {
          setEditid(result.data.result[0]._id);
          setUpName(result.data.result[0].holdername);
          setUpBank(result.data.result[0].bankname);
          setUpIfsc(result.data.result[0].ifsc);
          seUptAccount(result.data.result[0].account);
          setListofrecord(result.data.result);
        }
      })
      .catch((err) => {
        setDbFetcherr(err.response.data.error);
        setTimeout(() => {
          setDbFetcherr("");
        }, 3000);
      });
  };
  const senddata = (e) => {
    if (editid) {
      if (!upName || !upAccount || !upBank || !upIfsc) {
        if (!upName) {
          errors.upname = " Required !!";
        } else {
          errors.upname = "";
        }

        if (!upAccount) {
          errors.upaccount = " Required !!";
        } else {
          errors.upaccount = "";
        }

        if (!upBank) {
          errors.upbank = " Required !!";
        } else {
          errors.upbank = "";
        }

        if (!upIfsc) {
          errors.upifsc = " Required !!";
        } else {
          errors.upifsc = "";
        }

        setErrors({ ...errors, [e.target.name]: e.target.value });
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        const data = {
          bankname: upBank,
          holdername: upName,
          account: upAccount,
          ifsc: upIfsc,
        };
        api
          .post(`/profile/Profiledetails_bank_update/${editid}`, data, {
            headers: {
              Authorization: token,
            },
          })
          .then((result) => {
            setUpdateRecord(true);
            setTimeout(() => {
              setUpdateRecord(false);
            }, 3000);
          })
          .catch((err) => {
            setDbEditerr(err.response.data.error);
            setTimeout(() => {
              setDbEditerr("");
            }, 3000);
          });
      }
    } else {
      if (!name || !account || !bank || !ifsc) {
        if (!name) {
          errors.name = " Required !!";
        } else {
          errors.name = "";
        }

        if (!account) {
          errors.account = " Required !!";
        } else {
          errors.account = "";
        }

        if (!bank) {
          errors.bank = " Required !!";
        } else {
          errors.bank = "";
        }

        if (!ifsc) {
          errors.ifsc = " Required !!";
        } else {
          errors.ifsc = "";
        }

        setErrors({ ...errors, [e.target.name]: e.target.value });
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else {
        const data = {
          bankname: bank,
          holdername: name,
          account: account,
          ifsc: ifsc,
        };
        api
          .post(`/profile/Profiledetails_bank_add`, data, {
            headers: {
              Authorization: token,
            },
          })
          .then((result) => {
            setAddRecord(true);
            fetchdata();
            setTimeout(() => {
              setAddRecord(false);
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
    setTimeout(() => {
      setErrors([]);
    }, 4000);
  };
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className={classes.setpageheading}>
          <Typography variant="h4" gutterBottom className={classes.setheading}>
            Profile
          </Typography>
        </div>

        <Paper className={classes.setProductpaper} elevation={5}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.setInnerheading}
          >
            Payment Details
          </Typography>
          {dbEditerr && (
            <Typography
              className={classes.setErrorLabel}
              style={{ marginBottom: "15px" }}
            >
              {dbEditerr}{" "}
            </Typography>
          )}
          {dbFetcherr && (
            <Typography
              className={classes.setErrorLabel}
              style={{ marginBottom: "15px" }}
            >
              {dbFetcherr}{" "}
            </Typography>
          )}
          {dbAdderr && (
            <Typography
              className={classes.setErrorLabel}
              style={{ marginBottom: "15px" }}
            >
              {dbAdderr}{" "}
            </Typography>
          )}
          {addRecord && (
            <Typography
              className={classes.setErrorLabel}
              style={{ marginBottom: "15px" }}
            >
              {"Record Added Successfully"}
            </Typography>
          )}
          {updateRecord && (
            <Typography
              className={classes.setErrorLabel}
              style={{ marginBottom: "15px" }}
            >
              {"Record Update Successfully"}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>
                  Holder Name :{" "}
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="name *"
                  value={editid ? upName : name}
                  onChange={editid ? handleupname : handlename}
                  className={classes.settextfield}
                />
              </div>
              {errors.upname && (
                <Typography className={classes.setErrorLabel}>
                  {errors.upname}{" "}
                </Typography>
              )}
              {errors.name && (
                <Typography className={classes.setErrorLabel}>
                  {errors.name}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>Bank :</Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="bank *"
                  value={editid ? upBank : bank}
                  onChange={editid ? handleupbank : handlebank}
                  className={classes.settextfield}
                />
              </div>
              {errors.bank && (
                <Typography className={classes.setErrorLabel}>
                  {errors.bank}{" "}
                </Typography>
              )}
              {errors.upbank && (
                <Typography className={classes.setErrorLabel}>
                  {errors.upbank}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>
                  Account No :
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="Account *"
                  value={editid ? upAccount : account}
                  onChange={editid ? handleupnaccount : handleaccount}
                  className={classes.settextfield}
                />
              </div>
              {errors.upaccount && (
                <Typography className={classes.setErrorLabel}>
                  {errors.upaccount}{" "}
                </Typography>
              )}
              {errors.account && (
                <Typography className={classes.setErrorLabel}>
                  {errors.account}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.setinputlayout}>
              <div>
                <Typography className={classes.setlabel}>IFSC : </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  placeholder="ifsc *"
                  value={editid ? upIfsc : ifsc}
                  onChange={editid ? handleupifsc : handleifsc}
                  className={classes.settextfield}
                />
              </div>
              {errors.upifsc && (
                <Typography className={classes.setErrorLabel}>
                  {errors.upifsc}{" "}
                </Typography>
              )}
              {errors.ifsc && (
                <Typography className={classes.setErrorLabel}>
                  {errors.ifsc}{" "}
                </Typography>
              )}
            </Grid>
          </Grid>
          <div className={classes.setsendbutton} style={{ marginTop: "15px" }}>
            {editid ? (
              <Button
                variant="contained"
                size="medium"
                className={classes.setsendbtninside}
                onClick={senddata}
              >
                update
              </Button>
            ) : (
              <Button
                variant="contained"
                size="medium"
                className={classes.setsendbtninside}
                onClick={senddata}
              >
                Add
              </Button>
            )}
          </div>
        </Paper>

        <ForgotPassword />
        <Owncompanydetail />
      </Container>
    </>
  );
};

export default Profile;
