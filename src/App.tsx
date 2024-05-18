import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/NavBar';
import BookReader from './pages/BookReader';
import EditPage from './pages/EditPage';
import Donate from './pages/Donate';
import Footer from './components/Footer';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import AddBook from './pages/AddBook';
import AddPage from './pages/AddPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<BookReader />} />
                <Route path="/edit/:pageNumber" element={<EditPage />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/books/:bookId/add-page" element={<AddPage />} />
              </Route>
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
