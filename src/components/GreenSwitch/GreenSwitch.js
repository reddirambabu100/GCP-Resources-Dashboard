import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom" ; 
import {
  Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, 
  Button, TableContainer, Accordion, AccordionSummary, AccordionDetails, Dialog, 
  DialogTitle, DialogContent, DialogActions, CircularProgress, Alert , Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNotification } from "../../context/NotificationContext"; // Import notification hook

// Sample projects and services for demo purposes
const sampleProjects = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"];
const services = ["Compute", "Storage", "Database", "Networking", "Security"];
const resourceTypes = {
  Compute: ["VM Instances", "Kubernetes Clusters", "Cloud Run"],
  Storage: ["Cloud Storage", "Filestore", "Bigtable"],
  Database: ["Cloud SQL", "Firestore", "Spanner"],
  Networking: ["VPC Networks", "Load Balancers", "Cloud DNS"],
  Security: ["IAM Roles", "Firewall Rules"]
};

// Function to generate mock resource data
const generateSampleData = () => {
  return sampleProjects.reduce((acc, project) => {
    acc[project] = Array.from({ length: 5 }, (_, i) => {
      const service = services[i % services.length];
      const type = resourceTypes[service][i % resourceTypes[service].length];
      return {
        id: `${project}-${i + 1}`,
        name: `${type} ${i + 1}`,
        type,
        status: ["Running", "Stopped", "Available", "Pending"][i % 4],
        expireDays: Math.floor(Math.random() * 90) + 1,
      };
    });
    return acc;
  }, {});
};

// API Status Constants
const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const AUTO_DELETE_INTERVAL = 15000; // Auto-delete interval in milliseconds

const GreenSwitch = () => {
  const { showNotification } = useNotification(); // Notification service
  const [resources, setResources] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, project: "", resource: null });
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // Fetch resource data (mocked for now)
  const fetchData = async () => {
    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS);
      setError(null);
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: generateSampleData() }), 1000)
      );
      setResources(response.data);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      setError("Failed to load resource data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-delete expired resources at set intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prevResources) => {
        let hasChanges = false;
        const updatedResources = {};

        Object.keys(prevResources).forEach((project) => {
          updatedResources[project] = prevResources[project]
            .map((res) => ({ ...res, expireDays: res.expireDays - 1 }))
            .filter((res) => {
              if (res.expireDays <= 0) {
                showNotification(`⚠️ ${res.name} was auto-deleted from ${project}!`, "warning");
                hasChanges = true;
                return false;
              }
              return true;
            });
        });

        return hasChanges ? updatedResources : prevResources;
      });
    }, AUTO_DELETE_INTERVAL);

    return () => clearInterval(interval);
  }, [showNotification]);

  // Handle resource removal request
  const handleRemoveRequest = (project, resource) => {
    setConfirmDialog({ open: true, project, resource });
  };

  // Confirm resource removal
  const handleRemoveConfirm = () => {
    const { project, resource } = confirmDialog;
    showNotification(`🚀 ${resource.name} removed from ${project}`, "success");
    setResources((prevResources) => {
      return {
        ...prevResources,
        [project]: prevResources[project].filter((res) => res.id !== resource.id),
      };
    });
    setConfirmDialog({ open: false, project: "", resource: null });
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }} fontWeight="bold">
        Green Switch - Auto Cleanup
      </Typography>

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

      {Object.keys(resources).map((project) => (
        <Accordion
          key={project}
          expanded={expanded === project}
          onChange={() => setExpanded(expanded === project ? null : project)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{project}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ p: 2, mb: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'left' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'left' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Expires In (Days)</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                    {resources[project].map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell sx={{ textAlign: 'left' }}>{resource.name}</TableCell>
                        <TableCell sx={{ textAlign: 'left' }}>{resource.type}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{resource.status}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{resource.expireDays}</TableCell>
                        <TableCell sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/resource/${resource.id}`, { state: { resource } })}>View Details</Button>
                          <Button variant="contained" color="error" size="small" onClick={() => handleRemoveRequest(project, resource)}>
                            Remove Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, project: "", resource: null })}>
        <DialogTitle>Confirm Resource Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove <b>{confirmDialog.resource?.name}</b> from <b>{confirmDialog.project}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, project: "", resource: null })}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleRemoveConfirm}>Remove</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GreenSwitch;
