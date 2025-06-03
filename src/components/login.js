import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { saveUser } from "../auth";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.identifier.trim()) {
      newErrors.identifier = "Email or Mobile is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await api.post("/", form);
      saveUser(data.user);
      navigate("/profile");
    } catch (err) {
      const message = err.response?.data?.message;
      if (message === "User not found") {
        setErrors({ identifier: "No account found with this email or mobile" });
      } else if (message === "Invalid password") {
        setErrors({ password: "Incorrect password" });
      } else {
        setSnack({
          open: true,
          message: message || "Login failed",
          severity: "eror",
        });
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom mt={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Email or Mobile"
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.identifier}
          helperText={errors.identifier}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>

        <Typography align="center" mt={3}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </form>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack({ ...snack, open: false })}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
