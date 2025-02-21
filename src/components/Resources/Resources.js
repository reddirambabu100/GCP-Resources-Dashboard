// Resources.js
import React, { useState } from "react";
import {
  Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField,
} from "@mui/material";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const sampleData = [
    { id: 1, name: "VM Instance 1", type: "Compute Engine", status: "Running" },
    { id: 2, name: "Cloud SQL DB", type: "Database", status: "Active" },
    { id: 3, name: "Storage Bucket A", type: "Storage", status: "Available" },
    { id: 4, name: "VM Instance 2", type: "Compute Engine", status: "Stopped" },
    { id: 5, name: "BigQuery Dataset", type: "Analytics", status: "Active" },
  ];

  const filteredResources = sampleData.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>GCP Resources</Typography>
      <TextField
        placeholder="Search resources..."
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.id}</TableCell>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No resources found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Resources;
