// src/components/Footer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        py: 2,
        backgroundColor: '#172337',
        color: '#6c757d',
      }}
    >
      <Typography variant="body2">© 2025 My E-Commerce Website. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
