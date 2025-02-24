import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Paper, Table, TableHead, TableRow, 
  TableCell, TableBody, Button, Snackbar, Alert, TablePagination, 
  TextField, Select, MenuItem, TableContainer, Accordion, AccordionSummary, 
  AccordionDetails 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNotification } from "../../context/NotificationContext"; // Import notification hook

// Mock Data: Simulating project-wise resources
const initialResources = {
  "Project Alpha": [
    { id: 1, name: "VM-Backup-02", type: "Compute Engine", status: "Stopped", expireDays: 45, cost: 10 },
    { id: 2, name: "Old-DB-01", type: "Database", status: "Idle", expireDays: 60, cost: 20 }
  ],
  "Project Beta": [
    { id: 3, name: "Storage-Archive", type: "Storage", status: "Not Accessed", expireDays: 90, cost: 5 },
    { id: 4, name: "Test-VM-01", type: "Compute Engine", status: "Stopped", expireDays: 30, cost: 8 }
  ],
  "Project Gamma": [
    { id: 5, name: "Web-Server-01", type: "Compute Engine", status: "Running", expireDays: 75, cost: 25 },
    { id: 6, name: "Analytics-DB", type: "Database", status: "Idle", expireDays: 55, cost: 30 }
  ]
};

// Auto-delete threshold (e.g., 60 days)
const AUTO_DELETE_DAYS = 60;

const GreenSwitch = () => {
  const { showNotification } = useNotification();
  const [resources, setResources] = useState(initialResources);
  const [expanded, setExpanded] = useState(null);

  // Auto-delete expired resources
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prevResources) => {
        const updatedResources = {};
        
        Object.keys(prevResources).forEach((project) => {
          updatedResources[project] = prevResources[project]
            .map((res) => ({ ...res, expireDays: res.expireDays - 1 })) // Reduce expiration days
            .filter((res) => {
              if (res.expireDays <= 0) {
                showNotification(`⚠️ ${res.name} was auto-deleted from ${project}!`, "warning");
                return false; // Remove expired resources
              }
              return true;
            });
        });

        return updatedResources;
      });
    }, 15000); // Auto-delete check every 15 seconds (for testing)

    return () => clearInterval(interval);
  }, [showNotification]);

  // Handle manual resource removal
  const handleRemove = (project, id) => {
    const resource = resources[project].find((res) => res.id === id);
    showNotification(`🚀 ${resource.name} removed from ${project}`, "success");

    setResources((prevResources) => ({
      ...prevResources,
      [project]: prevResources[project].filter((res) => res.id !== id)
    }));
  };

  // Handle accordion expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Green Switch - Auto Cleanup</Typography>

      {Object.keys(resources).map((project) => (
        <Accordion 
          key={project} 
          expanded={expanded === project} 
          onChange={handleAccordionChange(project)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{project}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Paper sx={{ p: 2, mb: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                      <TableCell align="center"><b>Name</b></TableCell>
                      <TableCell align="center"><b>Type</b></TableCell>
                      <TableCell align="center"><b>Status</b></TableCell>
                      <TableCell align="center"><b>Expire in (Days)</b></TableCell>
                      <TableCell align="center"><b>Cost ($)</b></TableCell>
                      <TableCell align="center"><b>Action</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resources[project].map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell align="center">{resource.name}</TableCell>
                        <TableCell align="center">{resource.type}</TableCell>
                        <TableCell align="center">{resource.status}</TableCell>
                        <TableCell align="center">{resource.expireDays}</TableCell>
                        <TableCell align="center">${resource.cost}</TableCell>
                        <TableCell align="center">
                          <Button 
                            variant="contained" 
                            color="error" 
                            size="small" 
                            onClick={() => handleRemove(project, resource.id)}
                          >
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
    </Container>
  );
};

export default GreenSwitch;
