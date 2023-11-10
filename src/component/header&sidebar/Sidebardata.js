import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Divider } from "@mui/material";
import useStyleMainDisplay from "./MainDisplayStyle";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SourceIcon from '@mui/icons-material/Source';

export default function Sidebardata() {
  const [sublistOpenmaster, setSublistOpenmaster] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation()
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handlemasterList = () => {
    setSelectedIndex(0);
    setSublistOpenmaster(0);
  };

  const hendlesublistmaster = (event, index) => {
    setSublistOpenmaster(!sublistOpenmaster);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (
      "/app/product" === location.pathname || "/app/product_repot" === location.pathname
    ) {
      setSelectedIndex(1);
    }
  });

  const handleOrderClick = (event) => {
    setSelectedIndex(0);
    setSublistOpenmaster(0);
  };

  const classes = useStyleMainDisplay(selectedIndex);
  // const username = JSON.parse(localStorage.getItem("username"));
  // const capitaluser = username.toUpperCase();
  // let letter = capitaluser.charAt(0);
  return (
    <>
      <List className={classes.selectedindex}>
        <ListItemButton
          onClick={(event) => hendlesublistmaster(event)}
          className={classes.effectlist}
          selected={selectedIndex === 1}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <LibraryBooksIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText primary="Product Master" className={classes.setsidebaricon} />
          {sublistOpenmaster ? (
            <ExpandLessIcon className={classes.setsidebaricon} />
          ) : (
            <ExpandMoreIcon className={classes.setsidebaricon} />
          )}
        </ListItemButton>
        <Collapse
          in={sublistOpenmaster}
          timeout="auto"
          unmountOnExit
          sx={{ backgroundColor: "#2c3b41" }}
        >
          <List
            component="div"
            disablePadding
            className={classes.selectedsubindex}
          >
            <ListItemButton
              button
              component={Link}
              to="/app/product"
              selected={"/app/product" === location.pathname}
              onClick={(event) => handleListItemClick(event, 1)}
              className={classes.effectlist}
            >
              <ListItemIcon style={{ minWidth: "45px" }}>
                <PanoramaFishEyeIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Product"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
            <Divider sx={{ paddingTop: 0.1 }} />
            <ListItemButton
              button
              component={Link}
              onClick={(event) => handleListItemClick(event, 1)}
              to="/app/product_repot"
              selected={"/app/product_repot" === location.pathname}
              className={classes.effectlist}
            >
              <ListItemIcon style={{ minWidth: "45px" }}>
                <PanoramaFishEyeIcon className={classes.setsidebaricon} />
              </ListItemIcon>
              <ListItemText
                primary="Product Report"
                className={classes.setsidebaricon}
              />
            </ListItemButton>
            <Divider sx={{ paddingTop: 0.1 }} />
          </List>
        </Collapse>
        {/* master end ------- */}


        <ListItemButton
            button
            component={Link}
            to="/app/seller"
            selected={"/app/seller" === location.pathname }
            onClick={handlemasterList}
            className={classes.effectlist}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <MedicalServicesIcon   className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Medical Master"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
          <ListItemButton
            button
            component={Link}
            to="/app/salesmen"
            selected={"/app/salesmen" === location.pathname }
            onClick={handlemasterList}
            className={classes.effectlist}
          >
            <ListItemIcon style={{ minWidth: "45px" }}>
              <MedicalServicesIcon   className={classes.setsidebaricon} />
            </ListItemIcon>
            <ListItemText
              primary="Salesmen Master"
              className={classes.setsidebaricon}
            />
          </ListItemButton>
          <ListItemButton
          button
          component={Link}
            to="/app/purchase"
            selected={"/app/purchase" === location.pathname }
          onClick={handlemasterList}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <InsertDriveFileIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="Purchase Report"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
        
        <ListItemButton
          button
          component={Link}
            to="/app/createbill"
            selected={"/app/createbill" === location.pathname }
          onClick={handlemasterList}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <InsertDriveFileIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="Generate Invoice"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
        <ListItemButton
          button
          component={Link}
            to="/app/invoicerecord"
            selected={"/app/invoicerecord" === location.pathname }
          onClick={handlemasterList}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <SourceIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="Invoice Record"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
        <ListItemButton
          button
          component={Link}
            to="/app/paymentaccept"
            selected={"/app/paymentaccept" === location.pathname }
          onClick={handlemasterList}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <InsertDriveFileIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="Payment Accept"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
        <ListItemButton
          button
          component={Link}
            to="/app/paymentreport"
            selected={"/app/paymentreport" === location.pathname }
          onClick={handlemasterList}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <SourceIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="Payment Report"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
        <ListItemButton
          button
          component={Link}
            to="/app/returneport"
            selected={"/app/returneport" === location.pathname }
          onClick={handlemasterList}
          className={classes.effectlist}
        >
          <ListItemIcon style={{ minWidth: "45px" }}>
            <SourceIcon className={classes.setsidebaricon} />
          </ListItemIcon>
          <ListItemText
            primary="Return Report"
            className={classes.setsidebaricon}
          />
        </ListItemButton>
        
      </List>
    </>
  );
}