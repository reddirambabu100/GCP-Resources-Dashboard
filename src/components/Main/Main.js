import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  Cloud as ResourcesIcon, 
  BarChart as UtilizationIcon, 
  AttachMoney as CostIcon, 
  Lightbulb as OpportunitiesIcon, 
  PowerSettingsNew as GreenSwitchIcon 
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Resources', path: '/resources', icon: <ResourcesIcon /> },
  { text: 'Utilization', path: '/utilization', icon: <UtilizationIcon /> },
  { text: 'Cost', path: '/cost', icon: <CostIcon /> },
  { text: 'Opportunities', path: '/opportunities', icon: <OpportunitiesIcon /> },
  { text: 'GreenSwitch', path: '/greenswitch', icon: <GreenSwitchIcon /> },
  { text: 'NotificationHistory', path: '/notificationHistory', icon: <NotificationsIcon /> }
];

export default function Main() {
  const { notificationHistory } = useNotification();
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%', 
          transition: 'width 0.3s', 
          backgroundColor: "#099162"
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            LBG CloudPulse
          </Typography>
          <IconButton color="inherit" component={Link} to="/notificationHistory">
            <Badge badgeContent={notificationHistory.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer 
        variant="persistent" 
        anchor="left" 
        open={open} 
        sx={{ '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: "#099162" } }}
      >
        <IconButton sx={{ alignSelf: 'center', color: "white", margin: 1 }}>
          GCP Resource
        </IconButton>
        <Divider />
        <List>
          {menuItems.map(({ text, path, icon }) => (
            <ListItem button key={text} component={Link} to={path} sx={{ color: 'white' }}>
              <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

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
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
