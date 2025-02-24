import React, { useState } from "react";
import { 
  Container, Typography, Paper, Table, TableHead, TableRow, TableCell, 
  TableBody, Button, Accordion, AccordionSummary, AccordionDetails, TextField, List, ListItem, ListItemText 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Mock Data for Optimization Opportunities Grouped by Project
const opportunitiesData = {
  "Project Alpha": [
    { name: "VM-02", type: "Compute Engine", issue: "Low CPU Utilization", action: "Consider Downgrading" },
    { name: "Cloud SQL DB", type: "Database", issue: "Idle for 30+ Days", action: "Turn Off or Delete" }
  ],
  "Project Beta": [
    { name: "Storage Bucket B", type: "Storage", issue: "Unused Storage", action: "Delete or Archive" },
    { name: "VM-Backup-01", type: "Compute Engine", issue: "Duplicate Instance", action: "Merge or Remove" }
  ],
  "Project Gamma": [
    { name: "BigQuery Dataset", type: "Analytics", issue: "Rarely Queried", action: "Optimize or Delete" }
  ]
};

const Opportunities = () => {
  const [comments, setComments] = useState({}); // Stores comments for each opportunity
  const [inputComments, setInputComments] = useState({}); // Manages input field values

  // Handle input changes
  const handleInputChange = (event, project, index) => {
    const newInputs = { ...inputComments };
    if (!newInputs[project]) newInputs[project] = {};
    newInputs[project][index] = event.target.value;
    setInputComments(newInputs);
  };

  // Save comment when "Add Comment" button is clicked
  const handleAddComment = (project, index) => {
    if (!inputComments[project]?.[index]) return; // Prevent adding empty comments

    const newComments = { ...comments };
    if (!newComments[project]) newComments[project] = {};
    if (!newComments[project][index]) newComments[project][index] = [];
    
    newComments[project][index].push(inputComments[project][index]); // Add new comment
    setComments(newComments);

    // Clear input field after submission
    const newInputs = { ...inputComments };
    newInputs[project][index] = "";
    setInputComments(newInputs);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Opportunities for Improvement</Typography>

      {Object.keys(opportunitiesData).map((project) => (
        <Accordion key={project} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{project}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Optimization Suggestions</Typography>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Type</b></TableCell>
                    <TableCell><b>Issue</b></TableCell>
                    <TableCell><b>Recommended Action</b></TableCell>
                    <TableCell><b>Action</b></TableCell>
                    <TableCell><b>Developer Comments</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {opportunitiesData[project].map((opportunity, index) => (
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
                      <TableCell>
                        <TextField 
                          size="small" 
                          fullWidth 
                          placeholder="Add comment" 
                          value={inputComments[project]?.[index] || ""}
                          onChange={(e) => handleInputChange(e, project, index)}
                        />
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          size="small" 
                          sx={{ mt: 1 }}
                          onClick={() => handleAddComment(project, index)}
                        >
                          Add Comment
                        </Button>

                        {/* Display list of saved comments */}
                        {comments[project]?.[index] && (
                          <List dense sx={{ mt: 1, bgcolor: "#f9f9f9", p: 1, borderRadius: 1 }}>
                            {comments[project][index].map((comment, i) => (
                              <ListItem key={i} sx={{ py: 0 }}>
                                <ListItemText primary={`🗨 ${comment}`} />
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Opportunities;
