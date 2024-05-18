import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState<string[]>(['']);
  const navigate = useNavigate();

  const handleAddPage = () => {
    setPages([...pages, '']);
  };

  const handlePageChange = (index: number, value: string) => {
    const newPages = pages.slice();
    newPages[index] = value;
    setPages(newPages);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('/api/books', { title, author, pages: pages.map((content, number) => ({ number: number + 1, content })) });
      navigate('/');
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Book
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        {pages.map((page, index) => (
          <TextField
            key={index}
            label={`Page ${index + 1}`}
            variant="outlined"
            multiline
            rows={4}
            value={page}
            onChange={(e) => handlePageChange(index, e.target.value)}
            required
          />
        ))}
        <Button variant="contained" onClick={handleAddPage}>
          Add Page
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddBook;
