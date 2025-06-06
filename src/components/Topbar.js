import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { Logout, AccountCircle } from '@mui/icons-material';

const roleColors = {
  Admin: '#ff6600',
  Engineer: '#2196f3',
  Client: '#43a047'
};

const Topbar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ background: '#fff', color: '#222', boxShadow: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Construction Site Tracker
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleMenu} size="large" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: roleColors[user.role] || '#888' }}>
                {user.name ? user.name[0].toUpperCase() : <AccountCircle />}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.role}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); onLogout(); }}>
                <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;