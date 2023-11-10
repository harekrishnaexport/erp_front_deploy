import { makeStyles } from "@material-ui/styles";

const ProfileStyle = makeStyles((theme) => ({
  setpageheading: {
    maxWidth: "100% !important",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9fafc",
  },
  setheading: {
    padding: "5px",
    margin: "0 !important",
    color: "#202223",
    fontWeight: "600 !important",
    fontSize: "35px !important",
    lineHeight: "32px",
    fontFamily: "'Poppins', sans-serif !important",
  },
  setInnerheading: {
    //  "1px solid"
    padding: "5px",
    marginBottom: "25px !important",
    borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
    color: "#202223",
    // fontSize: "20px !important",
    lineHeight: "32px",
    fontFamily: "'Poppins', sans-serif !important",
  },
  setErrorLabel: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: '15px',
    lineHeight: '21px',
    marginTop: '10px',
    marginRight: '10px',
    color: '#7f2121',
    marginBottom: '20px',
    fontWeight: 600,
    display: 'flex',
  },
  setProductpaper: {
    textAlign: "left",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
    color: "#c20004",
    maxWidth: "100%",
    borderRadius: "10px",
    marginTop: "30px",
  },
  setsendbutton: {
    display: "flex",
    justifyContent: "end",
  },
  setlabel: {
    fontFamily: '"Poppins",sans-serif',
    fontSize: "15px",
    lineHeight: "21px",
    marginTop: '10px',
    marginRight: '10px',
    color: 'black'
  },
  setErrorLabel: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: '15px',
    lineHeight: '21px',
    marginTop: '10px',
    marginRight: '10px',
    color: '#7f2121',
    marginBottom: '20px',
    fontWeight: 600,
    display: 'flex',
  },

  setsendbtninside: {
    height: "40px",
    fontWeight: "600 !important",
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc !important",
    color: "white",
  },

  // setsendbtninsideHover: {
  //   backgroundColor: "#3c8dbccc !important",
  // },


}));

export default ProfileStyle;
