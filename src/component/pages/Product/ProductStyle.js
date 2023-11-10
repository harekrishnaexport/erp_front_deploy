import { makeStyles } from "@material-ui/styles";

const ProductStyle = makeStyles((theme) => ({
  setpageheading: {
    maxWidth: "100% !important",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9fafc",
  },
  setpageheading_inner: {
    maxWidth: "100% !important",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "#f9fafc",
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
  setaddproheaderarrow: {
    border: "1px solid #202223",
    backgroundColor: "transparent !important",
    // marginTop: "6px !important",
    marginRight: "20px",
    marginLeft: "4px",
  },
  setlabel: {
    fontFamily:'"Poppins",sans-serif' ,
    fontSize:"15px",
    lineHeight:"21px",
    marginTop: '10px',
    marginRight: '10px',
    color:'black'
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
  tabletdicon:{
    fontFamily:["Poppins", "sans-serif", "!important"],
    justifyContent: 'center',
    padding:'8px !important',
    color:'#202223 !important',
    display:'flex !important'
  },
  seticondiv:{
    display:'flex',
    justifyContent:'center'
  },
  seteditincon:{
    color:'#353535e0',
    "&:hover": { color: "#3c8dbc !important" , backgroundColor: "#d6efef6e"},
  },
  setdeleteincon:{
    color:'#353535e0',
    // marginRight:'-15px',
    "&:hover": { color: "#7f2121 !important" , backgroundColor: "antiquewhite"},
  },
  tabletd:{
    fontFamily:["Poppins", "sans-serif", "!important"],
    padding:'8px !important',
    color:'#202223 !important',
    fontSize: '16px !important'
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
}));

export default ProductStyle;
