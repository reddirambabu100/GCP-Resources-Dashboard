import React from "react";
import { Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from "recharts";
import { AreaChart } from "recharts";
import { Area } from "recharts";
// Sample utilization data grouped by project and resource
const utilizationData = {
  "Project Alpha": {
    "VM Instance 1": {
      cpu: [
        { time: "10:00", usage: 20 },
        { time: "10:05", usage: 35 },
        { time: "10:10", usage: 50 },
        { time: "10:15", usage: 45 },
        { time: "10:20", usage: 30 },
      ],
      memory: [
        { time: "10:00", usage: 40 },
        { time: "10:05", usage: 50 },
        { time: "10:10", usage: 70 },
        { time: "10:15", usage: 65 },
        { time: "10:20", usage: 55 },
      ],
    },
    "Cloud Run Service 1": {
      cpu: [
        { time: "10:00", usage: 25 },
        { time: "10:05", usage: 40 },
        { time: "10:10", usage: 55 },
        { time: "10:15", usage: 50 },
        { time: "10:20", usage: 35 },
      ],
      memory: [
        { time: "10:00", usage: 45 },
        { time: "10:05", usage: 55 },
        { time: "10:10", usage: 75 },
        { time: "10:15", usage: 70 },
        { time: "10:20", usage: 60 },
      ],
    },
  },
  "Project Beta": {
    "Kubernetes Cluster 1": {
      cpu: [
        { time: "10:00", usage: 30 },
        { time: "10:05", usage: 45 },
        { time: "10:10", usage: 60 },
        { time: "10:15", usage: 55 },
        { time: "10:20", usage: 40 },
      ],
      memory: [
        { time: "10:00", usage: 50 },
        { time: "10:05", usage: 60 },
        { time: "10:10", usage: 80 },
        { time: "10:15", usage: 75 },
        { time: "10:20", usage: 65 },
      ],
    },
    "Cloud SQL Instance 1": {
      cpu: [
        { time: "10:00", usage: 15 },
        { time: "10:05", usage: 30 },
        { time: "10:10", usage: 45 },
        { time: "10:15", usage: 40 },
        { time: "10:20", usage: 25 },
      ],
      memory: [
        { time: "10:00", usage: 35 },
        { time: "10:05", usage: 45 },
        { time: "10:10", usage: 65 },
        { time: "10:15", usage: 60 },
        { time: "10:20", usage: 50 },
      ],
    },
  },
};

const Utilization = () => {
  return (
    <Container sx={{ mt: 3, overflowX: "hidden"}}>
      <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>
        Resource Utilization (Project-wise & Resource-wise)
      </Typography>

      {Object.keys(utilizationData).map((project) => (
        <Accordion key={project} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{project}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {Object.keys(utilizationData[project]).map((resource) => (
              <Accordion key={resource} sx={{ mb: 2 }} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{resource}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  {/* CPU Usage */}
                  <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      CPU Usage (%)
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={utilizationData[project][resource].cpu}>
                <defs>
                  <linearGradient id="cpuColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#1976d2" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="usage" stroke="#1976d2" fill="url(#cpuColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
                  </Paper>

                  {/* Memory Usage */}
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Memory Usage (%)
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData[project][resource].memory}>
                <XAxis dataKey="time" stroke="#43a047" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#43a047" barSize={40} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
                  </Paper>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Utilization;
