import React from "react";
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

// Mock Data for Optimization Opportunities
const opportunitiesData = [
  { name: "VM-02", type: "Compute Engine", issue: "Low CPU Utilization", action: "Consider Downgrading" },
  { name: "Cloud SQL DB", type: "Database", issue: "Idle for 30+ Days", action: "Turn Off or Delete" },
  { name: "Storage Bucket B", type: "Storage", issue: "Unused Storage", action: "Delete or Archive" },
  { name: "VM-Backup-01", type: "Compute Engine", issue: "Duplicate Instance", action: "Merge or Remove" },
  { name: "BigQuery Dataset", type: "Analytics", issue: "Rarely Queried", action: "Optimize or Delete" },
];

const Opportunities = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Opportunities for Improvement</Typography>

      {/* Opportunities Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Optimization Suggestions</Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Issue</b></TableCell>
              <TableCell><b>Recommended Action</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opportunitiesData.map((opportunity, index) => (
              <TableRow key={index}>
                <TableCell>{opportunity.name}</TableCell>
                <TableCell>{opportunity.type}</TableCell>
                <TableCell>{opportunity.issue}</TableCell>
                <TableCell>{opportunity.action}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small">
                    Take Action
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Opportunities;
