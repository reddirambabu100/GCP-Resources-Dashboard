import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
// import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  // Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,Avatar 
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  Cloud as ResourcesIcon, 
  BarChart as UtilizationIcon, 
  AttachMoney as CostIcon, 
  Lightbulb as OpportunitiesIcon, 
  PowerSettingsNew as GreenSwitchIcon ,
  Logout,
  ArrowBack,
  ChevronLeft,MenuOpen as MenuOpenIcon
} from '@mui/icons-material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240; // Set the width of the sidebar drawer

// Define menu items for navigation
const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Resources', path: '/resources', icon: <ResourcesIcon /> },
  { text: 'Utilization', path: '/utilization', icon: <UtilizationIcon /> },
  { text: 'Cost', path: '/cost', icon: <CostIcon /> },
  { text: 'Opportunities', path: '/opportunities', icon: <OpportunitiesIcon /> },
  { text: 'GreenSwitch', path: '/greenswitch', icon: <GreenSwitchIcon /> },
  { text: 'NotificationHistory', path: '/notificationHistory', icon: <NotificationsIcon /> }
];

export default function Main() {
  // const navigate = useNavigate(); // Hook for navigation
  const { notificationHistory } = useNotification(); // Access notification history
  const [open, setOpen] = React.useState(false);
  const location = useLocation(); // State for controlling sidebar open/close
  const [isOptionSelected, setOptionSelected] = React.useState(location.pathname)
  // Function to toggle the sidebar drawer
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

   // Logout function
   const handleLogout = () => {
    localStorage.removeItem("token"); // Remove auth token
    window.location.href = "/login"; // Force reload & redirect
  };
  

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%', 
          transition: 'width 0.3s', 
          backgroundColor: "#006a4d",
          height:"64px"
        }}
      >
        <Toolbar sx={{ height: "104px" }}>
          {/* Sidebar Toggle Button */}
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start">
              {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          
          {/* Application Title */}
          <Typography fontWeight={"bold"} variant="h5" sx={{ flexGrow: 1, ml: 2}}>
            LBG CLOUDPULSE
          </Typography>

          {/* Notification Icon with Badge */}
          <IconButton color="inherit" component={Link} to="/notificationHistory">
            <Badge badgeContent={notificationHistory.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Profile Icon */}
          <IconButton  color="inherit">
            <AccountCircle />
          </IconButton>

          {/* Logout Button */}
          <IconButton edge="end" color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer 
        variant="persistent" 
        anchor="left" 
        open={open} 
        sx={{ '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: "white" } }}
      >
        <Toolbar sx={{ backgroundColor: "#006a4d", display: "flex", justifyContent: "center", height:"64px" }}>
          <img 
            src="https://lloydstechnologycentre.com/assets/site/ltc-new-logo.svg" 
            alt="Lloyds Logo" 
            style={{ width: "180px", height: "auto", maxWidth: "100%" }} // Adjust width, maintain aspect ratio
          />
        </Toolbar>


        {/* <Divider /> */}

        {/* Sidebar Menu Items */}
        <List sx={{ backgroundColor: "white" }}>
      {menuItems.map(({ text, path, icon }) => (
        <ListItem
          button
          key={text}
          component={Link}
          to={path}
          onClick={() => setOptionSelected(path)} // Update selected item
          sx={{
            color: isOptionSelected === path ? "#006a4d" : "black", // Selected item color
            fontWeight: isOptionSelected === path ? "bold" : "normal", // Bold font when selected
            backgroundColor: isOptionSelected === path ? "rgba(0, 106, 77, 0.1)" : "white", // Light background for selected item
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
              color: isOptionSelected === path ? "#006a4d" : "inherit", // Match text & icon color for selected
              fontWeight: isOptionSelected === path ? "bold" : "normal",
            },
            "&:hover": {
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.1)",
              fontWeight: "bold", // Make text bold on hover
              "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: "green",
                fontWeight: "bold",
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
        
      </Drawer>

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          transition: 'margin 0.3s', 
          marginLeft: open ? `${drawerWidth}px` : 0, 
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%' 
        }}
      >
        <Toolbar /> {/* Spacer to push content below AppBar */}
        <Outlet /> {/* This will render the child components of Main */}
      </Box>
    </Box>
  );
}
