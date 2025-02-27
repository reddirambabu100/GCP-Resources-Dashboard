import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Alert , Box , Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Constants and Sample Data Generation
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
      createdDate: new Date(2023, Math.floor(i / 10), (i % 28) + 1).toISOString().split("T")[0],
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
    };
  });
};

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Utilization = () => {
  const [utilizationData, setUtilizationData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS);
      setError(null);

      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            resources: generateSampleData()
          });
        }, 1000)
      );

      // Simulating the addition of CPU and memory usage data
      const enrichedData = response.resources.reduce((acc, resource) => {
        if (!acc[resource.project]) acc[resource.project] = {};
        if (!acc[resource.project][resource.name]) acc[resource.project][resource.name] = {
          cpu: resource.cpu,
          memory: resource.memory
        };
        return acc;
      }, {});

      setUtilizationData(enrichedData);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      setError("Failed to load resource data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>
        Resource Utilization (Project-wise & Resource-wise)
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

      {apiStatus === apiStatusConstants.SUCCESS && Object.keys(utilizationData).map((project) => (
        <Accordion key={project} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{project}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {Object.keys(utilizationData[project]).map((resource) => (
              <Paper key={resource} sx={{ mb: 3, p: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {resource}
                </Typography>

                {/* CPU Usage */}
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  CPU Usage (%)
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={utilizationData[project][resource].cpu}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="usage" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>

                {/* Memory Usage */}
                <Typography variant="subtitle2" sx={{ mb: 2, mt: 3 }}>
                  Memory Usage (%)
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={utilizationData[project][resource].memory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="usage" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Utilization;
