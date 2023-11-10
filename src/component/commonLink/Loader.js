import React from "react";
import Backdrop from "@mui/material/Backdrop";
import { DotLoader } from "react-spinners";

const Loader = (active) => {

return <Backdrop
    sx={{
      color: "#fff",
      backgroundColor: "#000000a1",
      zIndex: (theme) => theme.zIndex.drawer + 2,
    }}
    open={active.active}
  >
    <DotLoader color="white" />
  </Backdrop>;
};

export default Loader;
