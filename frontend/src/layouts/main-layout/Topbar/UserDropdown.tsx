import { Menu, Avatar, Button, Tooltip, MenuItem, ListItemIcon, Typography, ListItemText } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import profile from 'assets/images/account/Profile.jpg';
import { useState, MouseEvent, useCallback, ReactElement } from 'react';
import userMenuItems from 'data/usermenu-items';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAllLocatData } from 'Utility/Utility'; 

const UserDropdown = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize useNavigate
  const userData = getAllLocatData(); 
  const userName = userData?.name || '';
  const handleUserClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleUserClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenuItemClick = useCallback((path: string) => {
    if (path === '/viewprofile') {
      //console.log('Logging out and clearing local storage');
      //localStorage.removeItem('web-secret'); // Ensure the key matches where your token is stored
      // Optionally check if the token is removed
     // console.log('Token after removal:', localStorage.getItem('web-secret'));
      
      navigate(path); // Navigate to the given path
    } else {
      console.log('Logging out and clearing local storage');
      localStorage.removeItem('web-secret'); // Ensure the key matches where your token is stored

      navigate(path); // Navigate to the given path
    }
    handleUserClose(); // Close the menu
  }, [navigate, handleUserClose]);

  return (
    <>
      <Button
        color="inherit"
        variant="text"
        id="account-dropdown-menu"
        aria-controls={menuOpen ? 'account-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={handleUserClick}
        disableRipple
        sx={{
          borderRadius: 2,
          gap: 3.75,
          px: { xs: 0, sm: 0.625 },
          py: 0.625,
          '&:hover': {
            bgcolor: 'transparent',
          },
        }}
      >
        <Tooltip title="Taskpert" arrow placement="bottom">
          <div>
            {/* <Avatar src={profile} sx={{ width: 44, height: 44, fontSize: '24px' }} /> */}
            {userName && (
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', color: 'white', mt: 0.5 }}
              >
                {userName}
              </Typography>
            )}
          </div>          
        </Tooltip>
        <IconifyIcon
          color="common.white"
          icon="mingcute:down-fill"
          width={22.5}
          height={22.5}
          sx={(theme) => ({
            transform: menuOpen ? `rotate(180deg)` : `rotate(0deg)`,
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.short,
            }),
          })}
        />
      </Button>
      <Menu
        id="account-dropdown-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleUserClose}
        MenuListProps={{
          'aria-labelledby': 'account-dropdown-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {userMenuItems.map((userMenuItem) => (
          <MenuItem
            key={userMenuItem.id}
            onClick={() => handleMenuItemClick(userMenuItem.path)}
          >
            <ListItemIcon
              sx={{
                minWidth: `0 !important`,
                color: userMenuItem.color,
                width: 14,
                height: 10,
                mb: 1.5,
              }}
            >
              <IconifyIcon icon={userMenuItem.icon} color={userMenuItem.color} />
            </ListItemIcon>
            <ListItemText
              sx={(theme) => ({
                color: userMenuItem.color,
                '& .MuiListItemText-primary': {
                  fontSize: theme.typography.subtitle2.fontSize,
                  fontFamily: theme.typography.subtitle2.fontFamily,
                  fontWeight: theme.typography.subtitle2.fontWeight,
                },
              })}
            >
              {userMenuItem.title}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserDropdown;
