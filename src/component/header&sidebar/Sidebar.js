import React from "react";
import Box from "@mui/material/Box";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useStyleMainDisplay from "./MainDisplayStyle";
import { useHistory } from "react-router-dom";
import hk from "../../hk.webp";
import Avatar from "@mui/material/Avatar";
import MobileView from "./MobileView";
import Sidebardata from "./Sidebardata";

const drawerWidth = 250;
const closedrawerWidth = 60;

const openedMixin = (theme) => ({
  display: "flex",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "&:hover": {
    "&::-webkit-scrollbar": {
      display: "flex",
      // position: 'absolute',
      width: "7px",
      zIndex: 1201,
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "#222d32",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px",
    },
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: closedrawerWidth,
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  backgroundColor: "#367fa9",
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: `calc(100% - ${closedrawerWidth}px)`,
  marginLeft: closedrawerWidth,
  backgroundColor: "#3c8dbc",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": { backgroundColor: "#222d32", border: "none" },
  ...(open && {
    // ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [settingOpen, setSettingOpen] = useState(null);
  const [spin, setSpin] = useState(false);
  const settingOpenBoolean = Boolean(settingOpen);
  const history = useHistory();
  const classes = useStyleMainDisplay();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleSettingClose = () => {
    setSettingOpen(null);
  };

  const handleuserprofile = () => {
    history.push("/app/profile");
  };
  const handleLogout = () => {
    // localStorage.removeItem("userdata");
    // localStorage.removeItem("username");
    localStorage.removeItem("ssAdmin");
    history.push("/");
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div className={classes.setwebdisplay}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              className={classes.setclass}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
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
              className={classes.settypo}
            >
              Hare Krishna Global Export
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              className={classes.seticonbtn}
              size="large"
              onClick={(e) => setSettingOpen(e.currentTarget)}
              aria-controls={settingOpenBoolean ? "Open-setting" : undefined}
              aria-haspopup="true"
              aria-expanded={settingOpenBoolean ? "true" : undefined}
            >
              <PersonOutlineIcon className={classes.custombadgeicon} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          className={classes.setdrawerpaper}
        >
          <DrawerHeader className={classes.setsidebarheader}>
            <Avatar src={hk} />
            <Typography className={classes.setheadertypo}>HKIEPL</Typography>
          </DrawerHeader>
          <Divider />
          <Sidebardata />
        </Drawer>
      </div>
      <div className={classes.setmobileview}>
        <MobileView />
      </div>

      <Menu
        anchorEl={settingOpen}
        id="Open-setting"
        open={settingOpenBoolean}
        onClose={handleSettingClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 5px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "185px",
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
          <MailOutlineOutlinedIcon />
          <div className={classes.setbox}>Profile</div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon />
          <div className={classes.setbox}>Logout</div>
        </MenuItem>
      </Menu>
    </Box>
  );
}
