import React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { logout, getUser } from '../auth';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  const actions = [
    { icon: <PersonAddIcon />, name: 'Register', onClick: () => navigate('/register') },
    { icon: <LoginIcon />, name: 'Login', onClick: () => navigate('/') },
  ];

  if (user) {
    actions.push(
      { icon: <AccountCircleIcon />, name: 'Profile', onClick: () => navigate('/profile') },
      { icon: <LockResetIcon />, name: 'Change Password', onClick: () => navigate('/change-password') },
      { icon: <LogoutIcon />, name: 'Logout', onClick: handleLogout }
    );
  }

  return (
    <SpeedDial
      ariaLabel="User actions"
      sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
      icon={<MenuIcon />}
      direction="down"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
}
