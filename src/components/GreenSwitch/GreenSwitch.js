import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert } from "@mui/material";

// Mock Data: Simulating Resources from Google Cloud API
const initialResources = [
  { id: 1, name: "VM-Backup-02", type: "Compute Engine", status: "Stopped", expireDays: 45, cost: "$10/month" },
  { id: 2, name: "Old-DB-01", type: "Database", status: "Idle", expireDays: 60, cost: "$20/month" },
  { id: 3, name: "Storage-Archive", type: "Storage", status: "Not Accessed", expireDays: 90, cost: "$5/month" },
  { id: 4, name: "Test-VM-01", type: "Compute Engine", status: "Stopped", expireDays: 30, cost: "$8/month" },
];

// Auto-delete threshold (e.g., 60 days)
const AUTO_DELETE_DAYS = 60;

const GreenSwitch = () => {
  const [resources, setResources] = useState(initialResources);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Simulate Auto-delete Process & Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prevResources) =>
        prevResources
          .map((res) => ({ ...res, expireDays: res.expireDays - 1 })) // Reduce expiration days
          .filter((res) => {
            if (res.expireDays <= 0) {
              handleSendNotification(res.name);
              return false;
            }
            return true;
          })
      );
    }, 1000 * 5); // Every 5 seconds (for testing)

    return () => clearInterval(interval);
  }, []);

  // Simulated Function to Send Notification Before Deletion
  const handleSendNotification = (resourceName) => {
    setAlertMessage(`⚠️ Warning: ${resourceName} was auto-deleted!`);
    setAlertOpen(true);
  };

  // Function to Manually Remove a Resource
  const handleRemove = (id) => {
    const resource = resources.find((res) => res.id === id);
    handleSendNotification(resource.name);
    setResources(resources.filter((resource) => resource.id !== id));
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Green Switch - Auto Cleanup</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Unused Resources</Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Expire in (Days)</b></TableCell>
              <TableCell><b>Estimated Cost</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.status}</TableCell>
                  <TableCell style={{ color: resource.expireDays <= AUTO_DELETE_DAYS ? "red" : "black" }}>
                    {resource.expireDays} {resource.expireDays <= AUTO_DELETE_DAYS ? "⚠️" : ""}
                  </TableCell>
                  <TableCell>{resource.cost}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" size="small" onClick={() => handleRemove(resource.id)}>
                      Remove Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No unused resources remaining ✅</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="warning">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GreenSwitch;
