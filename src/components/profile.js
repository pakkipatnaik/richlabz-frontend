import React from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Box
} from '@mui/material';
import { getUser } from '../auth';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
  const user = getUser();
  const navigate = useNavigate();

  if (!user) return <Typography align="center" mt={5}>Please login to view your profile.</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={4}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 2 }}>
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              My Profile
            </Typography>

            <Box mt={3} width="100%">
              <Typography variant="body2" color="text.secondary">First Name</Typography>
              <Typography mb={2}>{user.firstName}</Typography>

              <Typography variant="body2" color="text.secondary">Last Name</Typography>
              <Typography mb={2}>{user.lastName}</Typography>

              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography mb={2}>{user.email}</Typography>

              <Typography variant="body2" color="text.secondary">Mobile</Typography>
              <Typography mb={2}>{user.mobile}</Typography>
            </Box>

            <Box display="flex" gap={2} mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/edit-profile')}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/change-password')}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
