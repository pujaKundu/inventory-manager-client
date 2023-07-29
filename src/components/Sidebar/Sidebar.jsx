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
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Configuration from "../Configuration/Configuration";
import Purchase from "../Purchase/Purchase";

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
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const toggleConfiguration = () => {
    setShowConfiguration(true);
  };
  const togglePurchase = () => {
    setShowPurchase(true);
    setShowConfiguration(false);
  };
  const drawer = (
    <div style={{ width: "200px" }}>
      <Toolbar />
      <Divider />
      <List>
        <List>
          <ListItem>
            <Link to="/configuration">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                Configuration
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/purchase">
              <Button
                color="inherit"
                onClick={togglePurchase}
                style={{ textDecoration: "none", color: "#3B185F" }}
              >
                Purchase
              </Button>
            </Link>
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
        style={{ backgroundColor: "#2A0944" }}
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
          <Typography variant="h6" noWrap component="div">
            Dashboard
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
      side
    </Box>
  );
}
