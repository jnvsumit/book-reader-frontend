import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Donate: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Donate to Us
    </Typography>
    <Box 
      component="form" 
      action="/api/donations" 
      method="POST" 
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        required
        id="amount"
        name="amount"
        label="Amount"
        type="number"
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        id="donorName"
        name="donorName"
        label="Donor Name"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="message"
        name="message"
        label="Message"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Donate
      </Button>
    </Box>
  </Container>
);

export default Donate;
