import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    }}
  >
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Box
        component="img"
        sx={{ height: 40, marginBottom: 2 }}
        alt="Ashram Logo"
        src="/ashram-logo.png" // Ensure the path is correct
      />
      <Typography variant="body1">
        © 2024 Ashram Book Reader. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {'Built with love by the Ashram community. '}
        <Link color="inherit" href="https://mui.com/">
          Learn More
        </Link>
      </Typography>
    </Container>
  </Box>
);

export default Footer;
