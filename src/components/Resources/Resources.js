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
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const sampleProjects = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"];
const services = ["Compute", "Storage", "Database", "Networking", "Security"];
const resourceTypes = {
  Compute: ["VM Instances", "Kubernetes Clusters", "Cloud Run"],
  Storage: ["Cloud Storage", "Filestore", "Bigtable"],
  Database: ["Cloud SQL", "Firestore", "Spanner"],
  Networking: ["VPC Networks", "Load Balancers", "Cloud DNS"],
  Security: ["IAM Roles", "Firewall Rules"]
};

const generateSampleData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const project = sampleProjects[i % sampleProjects.length];
    const service = services[i % services.length];
    const type = resourceTypes[service][i % resourceTypes[service].length];
    return {
      id: i + 1,
      project,
      service,
      type,
      name: `${type} ${i + 1}`,
      status: ["Running", "Stopped", "Available", "Pending"][i % 4],
      createdDate: new Date(2023, Math.floor(i / 10), (i % 28) + 1).toLocaleDateString(),
    };
  });
};

const ResourcesDashboard = () => {
  const [resources, setResources] = useState(generateSampleData());
  const [selectedProject, setSelectedProject] = useState(sampleProjects[0]);
  const [expandedServices, setExpandedServices] = useState({});
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prevResources) =>
        prevResources.map((res) => ({
          ...res,
          status: res.status === "Running" ? "Stopped" : "Running"
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleService = (service) => {
    setExpandedServices((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handlePageChange = (service, newPage) => {
    setPagination((prev) => ({ ...prev, [service]: { ...prev[service], page: newPage } }));
  };

  const handleRowsPerPageChange = (service, event) => {
    setPagination((prev) => ({
      ...prev,
      [service]: { rowsPerPage: parseInt(event.target.value, 10), page: 0 }
    }));
  };

  const filteredResources = resources.filter((res) => res.project === selectedProject);
  const groupedByService = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.service]) acc[resource.service] = [];
    acc[resource.service].push(resource);
    return acc;
  }, {});

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>GCP Resources Dashboard</Typography>
      <Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} sx={{ mb: 3 }}>
        {sampleProjects.map((proj) => (
          <MenuItem key={proj} value={proj}>{proj}</MenuItem>
        ))}
      </Select>
      {Object.keys(groupedByService).map((service) => {
        const page = pagination[service]?.page || 0;
        const rowsPerPage = pagination[service]?.rowsPerPage || 5;
        const serviceResources = groupedByService[service];
        return (
          <Paper key={service} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6">
              <IconButton onClick={() => toggleService(service)}>
                {expandedServices[service] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              {service} Services
            </Typography>
            <Collapse in={expandedServices[service]}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceResources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>{resource.id}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell>{resource.status}</TableCell>
                      <TableCell>{resource.createdDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={serviceResources.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => handlePageChange(service, newPage)}
                onRowsPerPageChange={(e) => handleRowsPerPageChange(service, e)}
              />
            </Collapse>
          </Paper>
        );
      })}
    </Container>
  );
};

export default ResourcesDashboard;
