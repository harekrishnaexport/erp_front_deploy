import React from "react";
import { Paper } from "@material-ui/core";
 import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Dashbord = () => {
  return <>
    <Container
      component="main"
      maxWidth="xl"
      className="setcontainer"
    >
      <Typography
        variant="h4"
        gutterBottom
        className="setheading"
      >
        Dashbord
      </Typography>

      <Paper className='setProductpaper' elevation={5}>

      </Paper>
    </Container>
  </>;
};

export default Dashbord;
