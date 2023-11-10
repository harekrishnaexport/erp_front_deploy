import { makeStyles } from "@material-ui/styles";

const paymentStyle = makeStyles((theme) => ({
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
  setmobileviewtotal: {
    fontWeight: "600 !important",
    [theme.breakpoints.down("xs")]: {
      fontSize:"14px"
    },
  },
  settextfield: {
    '& .MuiInputBase-root': {
      fontFamily: ["Poppins", "sans-serif", "!important"],
    }, "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
  },
  setproductbtnsend: {
    fontWeight: '600 !important',
    height: '40px',
    marginTop: '21px',
    textTransform: "none",
    padding: "0px 15px",
    backgroundColor: "#3c8dbc !important",
    color: "white",
    "&:hover": { backgroundColor: "#3c8dbc !important" },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
  setdatepicker: {
    "&:hover": { boxShadow: `${theme.shadows[3]}`, border: 0 },
    width: '-webkit-fill-available !important',
    height: '40px !important',
    marginBottom: '3px',
    "& .react-date-picker__calendar": {
      width: '350px !important',
      maxWidth: '-webkit-fill-available !important',
      // z-index: 1;
    },
  },
  pdfpayment: {
    display: 'flex',
    justifyContent: 'space-between'
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
  setmodeldisplay: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white !important",
    border: "1px solid #000",
    boxShadow: `${theme.shadows[8]}`,
    borderRadius: "9px !important",
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      width: 300,
      heigth: "200px !important",
    },
    // [theme.breakpoints.down("sm")]: {
    //   width: 600,
    //   heigth: "200px !important",
    // },
    [theme.breakpoints.up("lg")]: {
      width: 1200,
      // heigth: "200px !important",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 600, // Your styles for the range between lg and sm
    },
  },
  setmodeltypo: {
    fontFamily: ["Poppins", "sans-serif", "!important"],
  },
}))

export default paymentStyle;
