import React, { useCallback, useMemo, useRef, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme } from '@mui/material/styles';


import '../styles/headerBar.css'
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';


const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#485c31',
      darker: '#485c31',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function HeaderBar() {
  const { auth, setAuth } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" theme={theme}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          Bearcation
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <div className="header-account-menu">
          <Menu
            anchorEl={anchorEl}
            name="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            MenuListProps={{
              disablePadding: true
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '& .MuiButtonBase-root': {
                  padding: 2,
                  display: 'flex'
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {(auth?.email) && (
              <>
              <MenuItem
                onClick={() => {
                  (auth?.email)
                    ? (auth.role == "Customer")
                      ? navigate("/customer-dashboard")
                      : navigate("/owner-dashboard")
                    : navigate("/");
                }
              }
              >
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => {
                  (navigate('/settings'))
                }
              }>
                <ListItemIcon>
                  <Settings fontSize="large" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => {
                  setAuth({});
                  (navigate('/'));
                }
              }>
                <ListItemIcon>
                  <Logout fontSize="large" />
                </ListItemIcon>
                Logout
              </MenuItem>
              </>
            )}
            {!(auth?.email) && (
              <MenuItem onClick={() => {
                  (navigate('/'));
                }
              }>
                <ListItemIcon>
                  <Login fontSize="large" />
                </ListItemIcon>
                Login
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;