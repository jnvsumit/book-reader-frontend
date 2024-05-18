import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditPage: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const navigate = useNavigate();
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    if (pageNumber) {
      fetchPage(parseInt(pageNumber));
    } else {
      navigate('/'); // Redirect to a default page if pageNumber is not provided
    }
  }, [pageNumber, navigate]);

  const fetchPage = async (page: number) => {
    try {
      const response = await axios.get(`/api/books/1/pages/${page}`);
      setPageContent(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (pageNumber) {
      try {
        await axios.put(`/api/books/1/pages/${pageNumber}`, { content: pageContent });
        alert('Page saved');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Page number is not defined');
    }
  };

  return (
    <div>
      <textarea value={pageContent} onChange={(e) => setPageContent(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditPage;
