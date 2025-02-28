import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, CircularProgress, Alert, Button , Box } from "@mui/material";
import InfoCard from "../InfoCard/InfoCard";
import { Link } from "react-router-dom";
import {
  Work as WorkIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Upgrade as UpgradeIcon,
  ToggleOnSharp as ToggleOnSharpIcon
} from "@mui/icons-material";

// Define API status constants to manage API request states
const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Dashboard = () => {
  // State variables to manage API response data, status, and errors
  const [cardItems, setCardItems] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);

  // Function to fetch dashboard data from API
  const fetchData = async () => {
    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS); // Set API status to 'IN_PROGRESS' before fetching
      setError(null); // Reset error state before making API call
      
      // Simulated API call (Replace with actual API call)
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { title: "Resource", path: "/resources", description: "Cloud computing resources like VMs, storage, and databases.", icon: WorkIcon },
              { title: "Utilization", path: "/utilization", description: "Tracking CPU, memory, and network performance.", icon: TrendingUpIcon },
              { title: "Cost Analysis", path: "/cost", description: "Optimizing costs for cloud resource usage.", icon: AttachMoneyIcon },
              { title: "Improvement", path: "/opportunities", description: "Optimization techniques like auto-scaling and cost monitoring.", icon: UpgradeIcon },
              { title: "Green Switch", path: "/greenswitch", description: "Energy-efficient cloud resource management.", icon: ToggleOnSharpIcon },
            ]),
          1000 // Simulated network delay of 2 seconds
        )
      );
      
      // Update state with fetched data and set API status to 'SUCCESS'
      setCardItems(response);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      // Handle API failure and update error message
      setError("Failed to load dashboard data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Dashboard Title */}
      <Typography variant="h5" fontWeight="bold" mb={4}>LBG CloudPulse-Dashboard</Typography>
      
      {/* Centered Loading, Error and Retry Button */}
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ mb: 2 }}>
        {apiStatus === apiStatusConstants.IN_PROGRESS && <CircularProgress />}
        {apiStatus === apiStatusConstants.FAILURE && (
          <>
            <Alert severity="error">{error}</Alert>
            <Button variant="contained" color="primary" onClick={fetchData} sx={{ marginTop: 2 }}>
              Retry
            </Button>
          </>
        )}
      </Box>
      
      {/* Render dashboard content when API request is successful */}
      {apiStatus === apiStatusConstants.SUCCESS && (
        <Grid container spacing={3}>
          {cardItems.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={card.path} style={{ textDecoration: "none", color: "inherit" }}>
                <InfoCard icon={card.icon} title={card.title} description={card.description} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
