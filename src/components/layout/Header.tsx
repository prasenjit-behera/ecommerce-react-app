import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile menu drawer
  const [searchQuery, setSearchQuery] = useState('');
  const { logoutUser} = useUserStore();
  const navigate = useNavigate();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleLogout = () => {
    logoutUser(); // Call the logout function
    handleMenuClose(); // Close the menu
    navigate('/'); // Redirect to login page
};

  const isAuthenticated = !!localStorage.getItem('token'); // Set this to `true` if the user is logged in.
  const cartCount = 0;
  // Mobile drawer menu
  const mobileMenu = (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        '& .MuiDrawer-paper': { width: 240 },
      }}
    >
      <List>
        <ListItem>
          <Typography variant="h6" sx={{ pl: 2 }}>
            My E-Commerce
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleDrawerToggle}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleDrawerToggle}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
        {!isAuthenticated && (
          <>
            <ListItem>
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>

          </>
        )}
        {isAuthenticated && (
          <>
            <ListItem>
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="My Account" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="static" color='primary'>
      <Toolbar>
        {/* Hamburger Menu for Mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'block', sm: 'none' }, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo / Website Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: "white", textDecoration: "none" }} component={Link}
          to="/" >
          E-Commerce
        </Typography>
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'left' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {isAuthenticated ? (
            <Box sx={{ ml: 2 }}>
              <IconButton onClick={handleMenuOpen} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <ArrowDropDownIcon sx={{ color: 'white' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <IconButton aria-label="cart" color="inherit">
                <Badge badgeContent={cartCount} color="warning">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button variant="outlined" component={Link}
                to="/register" color="inherit" sx={{ ml: 1 }}>
                Signup
              </Button>
              <Button variant="contained"
                component={Link}
                to="/login" sx={{ ml: 1, background: "white", color: "#1976d2" }}>
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
      {/* Mobile Drawer */}
      {mobileMenu}
    </AppBar>
  );
};

export default Header;
