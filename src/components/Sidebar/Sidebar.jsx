import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLoggedOut } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import "../../styles/styles.scss";
import logo from "../../assets/logo.png";

const drawerWidth = 240;

// New Configuration Component
const ConfigurationComponent = () => {
  return (
    <Box>
      {/* Place your configuration content here */}
      <Typography variant="h4">Configuration Component</Typography>
    </Box>
  );
};

export default function Sidebar(props) {
  const { window } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/");
  };

  const drawer = (
    <div style={{ width: "200px" }}>
      <Toolbar />
      <Divider />
      <List>
        <List>
          <ListItem>
            <Link to="/homepage">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <DashboardIcon sx={{ marginRight: "5px" }} />
                Dashboard
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/configuration">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <SettingsApplicationsIcon sx={{ marginRight: "5px" }} />
                Configuration
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/purchase">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <ShoppingCartIcon sx={{ marginRight: "5px" }} />
                Purchase
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/sales">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <LoyaltyIcon sx={{ marginRight: "5px" }} />
                Sales
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/approval">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                <LibraryAddCheckIcon sx={{ marginRight: "5px" }} />
                Approval
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Button
              onClick={logout}
              style={{
                backgroundColor: "#d65046",
                color: "#fff",
                marginTop: "32vh",
              }}
            >
              <LogoutIcon />
              Logout
            </Button>
          </ListItem>
        </List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#0c55c9" }}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={logo}
              style={{ width: "28px", height: "28px", marginRight: "5px" }}
              alt=""
            />
            Stock Optima
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
