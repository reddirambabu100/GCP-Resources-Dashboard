import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const cpuData = [
  { time: "10:00", usage: 20 },
  { time: "10:05", usage: 35 },
  { time: "10:10", usage: 50 },
  { time: "10:15", usage: 45 },
  { time: "10:20", usage: 30 },
  { time: "10:25", usage: 55 },
  { time: "10:30", usage: 60 },
];

const memoryData = [
  { time: "10:00", usage: 40 },
  { time: "10:05", usage: 50 },
  { time: "10:10", usage: 70 },
  { time: "10:15", usage: 65 },
  { time: "10:20", usage: 55 },
  { time: "10:25", usage: 75 },
  { time: "10:30", usage: 80 },
];

const Utilization = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Resource Utilization</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>CPU Usage (%)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cpuData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="usage" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Memory Usage (%)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={memoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="usage" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default Utilization;
