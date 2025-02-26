import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
// import {Link} from "react-router-dom";

export default function InfoCard({ icon: Icon, title, description }) {
  return (
    <Card sx={{ maxWidth: 345, height: 200, border:"1px solid #006a4d", borderRadius: 2, boxShadow: 3, padding: 2, display: "flex", alignItems: "center" }}>
      <Box sx={{ marginRight: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon sx={{ fontSize: 40, color: "#006a4d" }} />
      </Box>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
   
  );
}