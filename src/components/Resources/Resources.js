import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  Collapse,
  IconButton,
  Button
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Sample project names for filtering resources
const sampleProjects = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"];

// List of GCP service categories
const services = ["Compute", "Storage", "Database", "Networking", "Security"];

// Mapping of service categories to their corresponding resource types
const resourceTypes = {
  Compute: ["VM Instances", "Kubernetes Clusters", "Cloud Run"],
  Storage: ["Cloud Storage", "Filestore", "Bigtable"],
  Database: ["Cloud SQL", "Firestore", "Spanner"],
  Networking: ["VPC Networks", "Load Balancers", "Cloud DNS"],
  Security: ["IAM Roles", "Firewall Rules"]
};

// Function to generate sample resource data for the dashboard
const generateSampleData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const project = sampleProjects[i % sampleProjects.length]; // Assign projects cyclically
    const service = services[i % services.length]; // Assign services cyclically
    const type = resourceTypes[service][i % resourceTypes[service].length]; // Assign resource type cyclically

    return {
      id: i + 1, // Unique resource ID
      project,
      service,
      type,
      name: `${type} ${i + 1}`, // Construct a name for the resource
      status: ["Running", "Stopped", "Available", "Pending"][i % 4], // Assign status cyclically
      createdDate: new Date(2023, Math.floor(i / 10), (i % 28) + 1).toLocaleDateString(), // Generate realistic dates
    };
  });
};

const ResourcesDashboard = () => {
  // State to store the list of resources
  const [resources, setResources] = useState(generateSampleData());

  // State to track the currently selected project
  const [selectedProject, setSelectedProject] = useState(sampleProjects[0]);

  // State to track the expanded service sections
  const [expandedServices, setExpandedServices] = useState({});

  // State to track pagination for each service category
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  // Simulate live updates by toggling resource statuses every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prevResources) =>
        prevResources.map((res) => ({
          ...res,
          status: res.status === "Running" ? "Stopped" : "Running" // Toggle between "Running" and "Stopped"
        }))
      );
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to expand/collapse a service section
  const toggleService = (service) => {
    setExpandedServices((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  // Function to handle page changes in pagination
  const handlePageChange = (service, newPage) => {
    setPagination((prev) => ({ ...prev, [service]: { ...prev[service], page: newPage } }));
  };

  // Function to handle changes in the number of rows per page
  const handleRowsPerPageChange = (service, event) => {
    setPagination((prev) => ({
      ...prev,
      [service]: { rowsPerPage: parseInt(event.target.value, 10), page: 0 } // Reset to first page on change
    }));
  };

  // Filter resources based on the selected project
  const filteredResources = resources.filter((res) => res.project === selectedProject);

  // Group resources by their respective service category
  const groupedByService = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.service]) acc[resource.service] = [];
    acc[resource.service].push(resource);
    return acc;
  }, {});


  // const fetchResourceData = async() => {
  //   const url = "http://localhost:5000/api/resources";
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  // }



  // useEffect (() => {
  //    fetchResourceData();
  // }, [])

  return (
    <Container sx={{ mt: 3 }}>
      {/* Dashboard Title */}
      <Typography variant="h5" fontWeight={"bold"} mb={4}>LBG CloudPulse Resources</Typography>

      {/* Project Selection Dropdown */}
      <Select sx={{mb:3, backgroundColor:"#006a4d", color: "white",
               "& .MuiSelect-icon": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Default outline color
               "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Darker shade on hover
               "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Change color when focused
    }} fontWeight= "bold" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} >
        {sampleProjects.map((proj) => (
          <MenuItem key={proj} value={proj}>{proj}</MenuItem>
        ))}
      </Select>

      {/* Iterate through each service category and render resource tables */}
      {Object.keys(groupedByService).map((service) => {
        const page = pagination[service]?.page || 0;
        const rowsPerPage = pagination[service]?.rowsPerPage || 5;
        const serviceResources = groupedByService[service];

        return (
          <Paper key={service}  sx={{ mb: 3, p: 2, backgroundColor:"#006a4d"}}> 
            {/* Service Header with Expand/Collapse Button */}
            <Typography variant="p1" fontWeight={"bold"} color="white">
              <IconButton onClick={() => toggleService(service)}>
                {expandedServices[service] ? <ExpandLess sx={{color:"white"}} /> : <ExpandMore sx={{color:"white"}}/>}
              </IconButton>
              {service} Services
            </Typography>

            {/* Expandable Table for Service Resources */}
            <Collapse in={expandedServices[service]} timeout={"auto"} unmountOnExit>
              <Table >
                <TableHead >
                  <TableRow >
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Resource Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Display only resources within the current page */}
                  {serviceResources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resource) => (
                    <TableRow key={resource.id} sx={{ backgroundColor: "white" }}>
                      <TableCell>{resource.id}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell>{resource.status}</TableCell>
                      <TableCell>{resource.createdDate}</TableCell>
                      <TableCell align="start">
                          <Button 
                          
                            variant="contained" 
                            sx={{backgroundColor:"#006a4d"}} 
                            size="small" 
                            onClick={() => navigate(`/resource/${resource.id}`, { state: { resource } })}
                          >
                            View Details
                          </Button>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <TablePagination
                sx={{
                  "& .MuiTablePagination-root": { color: "white" }, // Applies to the main root container
                  "& .MuiTablePagination-selectLabel": { color: "white" }, // "Rows per page" text
                  "& .MuiSelect-icon": { color: "white" }, // Dropdown arrow icon
                  "& .MuiTablePagination-displayedRows": { color: "white" }, // Page info (e.g., 1-5 of 50)
                  "& .MuiIconButton-root": { color: "white" }, 
                  color:"white",
                }}
                rowsPerPageOptions={[5, 10, 20]} // Options for items per page
                count={serviceResources.length} // Total number of resources in the category
                rowsPerPage={rowsPerPage} // Selected rows per page
                page={page} // Current page
                onPageChange={(e, newPage) => handlePageChange(service, newPage)} // Handle page change
                onRowsPerPageChange={(e) => handleRowsPerPageChange(service, e)} // Handle rows per page change
              />
            </Collapse>
          </Paper>
        );
      })}
    </Container>
  );
};

export default ResourcesDashboard;
