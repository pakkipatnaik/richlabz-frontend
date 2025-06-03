import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar,
    Alert, } from '@mui/material';
import api from '../api';
import { getUser } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const user = getUser();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
   const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();
   
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) return 
    setSnack({ open: true, message: "Password doesnt match", severity: "error" });
    try {
      await api.post(`/users/${user._id}/change-password`, form);
    setSnack({ open: true, message: "Password updated", severity: "success" });
      navigate('/profile');
    } catch (err) {
      setSnack({ open: true, message:err.response?.data?.message || 'Error changing password', severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={2}>Change Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Current Password" name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="New Password" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} margin="normal" required />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Change Password</Button>
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
