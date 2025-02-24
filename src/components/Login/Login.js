import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async () => {
    navigate("/"); // Redirect to dashboard
    // Mock authentication (Replace with actual API call)
    // if (data.email === "admin@example.com" && data.password === "password123") {
    //   localStorage.setItem("token", "mock-token"); // Store token (use real JWT in production)
    //   navigate("/dashboard"); // Redirect to dashboard
    // } else {
    //   setLoginError("Invalid email or password.");
    // }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login to LBG CloudPulse
        </Typography>

        {loginError && <Alert severity="error">{loginError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
