import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from '../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const AddPage: React.FC = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`/api/books/${bookId}/pages`, { content });
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.error('Error adding page', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Page
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddPage;
