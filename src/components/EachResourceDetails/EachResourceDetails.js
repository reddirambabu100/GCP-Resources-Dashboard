import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Typography, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const EachResourceDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const resource = location.state?.resource;

  if (!resource) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5">Resource Not Found</Typography>
      </Container>
    );
  }

  // Sample utilization data (should be replaced with real API data)
  const utilizationData = [
    { time: "10:00", cpu: 30, memory: 40 },
    { time: "10:05", cpu: 50, memory: 20 },
    { time: "10:10", cpu: 45, memory: 45 },
    { time: "10:15", cpu: 40, memory: 10 },
    { time: "10:20", cpu: 95, memory: 25 },
  ];

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Resource Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Dynamic Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(resource).map((key, index) => (
                  <TableCell key={index} variant="head" sx={{ fontWeight: 700 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize key names */}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {Object.values(resource).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Utilization Chart */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          CPU & Memory Utilization
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={utilizationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU Usage (%)" />
            <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory Usage (%)" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default EachResourceDetails;
