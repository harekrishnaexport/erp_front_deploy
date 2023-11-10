import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Divider, Drawer } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import Sidebardata from "./Sidebardata";
import { useHistory } from "react-router-dom";
import useStyleMainDisplay from "./MainDisplayStyle";
import hk from "../../hk.webp";

let DrawerOpenWidth = 260;

export default function MobileView() {
  const [mobileMenu, setMobileMenu] = useState(null);
  const mobileMenunBoolean = Boolean(mobileMenu);
  const [mobileSidebaropen, setMobileSidebaropen] = useState(false);

  const classes = useStyleMainDisplay();
  const history = useHistory();

  const handleMobiblenenuClose = () => {
    setMobileMenu(null);
  };

  const handleMobileSidebar = () => {
    setMobileSidebaropen(!mobileSidebaropen);
  };

  const handleopenmenu = (e) => {
    setMobileMenu(e.currentTarget)
  }

  const handleuserprofile = () => {
    history.push("/app/profile");
  };
  const handleLogout = () => {
    localStorage.removeItem("ssAdmin");
    history.push("/");
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileSidebar}
              sx={{
                marginRight: 3,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className={classes.settypomobile}
            >
              Hare Krishna Global Export
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box className={classes.mobilerightmenu}>
              <IconButton
                size="large"
                onClick={handleopenmenu}
                aria-controls={mobileMenunBoolean ? "Open_Menu" : undefined}
                aria-haspopup="true"
                aria-expanded={mobileMenunBoolean ? "true" : undefined}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="nav"
        sx={{ width: { xs: DrawerOpenWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileSidebaropen}
          onClose={handleMobileSidebar}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DrawerOpenWidth,
            },
            "& .MuiPaper-root": { backgroundColor: "#222d32" },
          }}
        >
          <div className={classes.setavatrhandle}>
            <Avatar
              src={hk}
              className={classes.setheaderavtar}
              sx={{ width: "75px" }}
            />
          </div>
          <Divider variant="middle" style={{ borderColor: "#fff0f045" }} />
          <Sidebardata />
        </Drawer>
      </Box>

      <Menu
        anchorEl={mobileMenu}
        id="Open_Menu"
        open={mobileMenunBoolean}
        onClose={handleMobiblenenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "hidden",
            filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.32))",
            mt: 1.5,

            "& .MuiMenu-list": {
              padding: "5px",
            },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 16,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleuserprofile}>
          <MailOutlineOutlinedIcon className={classes.setmobileicon} />
          <div className={classes.setbox}>Profile</div>
        </MenuItem>
        <Divider style={{ marginTop: '0px', marginBottom: '0px' }} />
        <MenuItem  onClick={handleLogout}>
          <ExitToAppIcon className={classes.setmobileicon} />
          <div className={classes.setbox}>Logout</div>
        </MenuItem>
      </Menu>
    </>
  );
}
