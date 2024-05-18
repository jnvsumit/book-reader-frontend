import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import {
  Container, Typography, Button, Box, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const BookReader: React.FC = () => {
  const [pageContent, setPageContent] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [bookId, setBookId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [pages, setPages] = useState<Array<{ number: number, title: string }>>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
      fetchPage(bookId, pageNumber);
    }
  }, [bookId, pageNumber]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      const books = response.data;
      if (books.length > 0) {
        setBookId(books[0]._id); // Use the first book's ID
      } else {
        console.error('No books found');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchBookDetails = async (bookId: string) => {
    try {
      const response = await axios.get(`/api/books/${bookId}`);
      setTotalPages(response.data.pages.length);
      setPages(response.data.pages.map((page: { number: number, content: string }) => ({
        number: page.number,
        title: `Page ${page.number}`
      })));
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const fetchPage = async (bookId: string, page: number) => {
    try {
      const response = await axios.get(`/api/books/${bookId}/pages/${page}`);
      if (response.data) {
        setPageContent(response.data.content);
      } else {
        setPageContent('Page not found');
      }
    } catch (error) {
      console.error('Error fetching page:', error);
      setPageContent('Error loading page');
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar 
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        pages={pages}
        setPageNumber={setPageNumber}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 2, marginTop: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Book Reader
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            {pageContent}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2} gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber === 1}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
              disabled={pageNumber === totalPages}
            >
              Next
            </Button>
          </Box>
          {user?.role === 'ADMIN' && (
            <Box mt={4}>
              <Button variant="contained" color="secondary">
                Add Book
              </Button>
              <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
                Add Page
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default BookReader;
