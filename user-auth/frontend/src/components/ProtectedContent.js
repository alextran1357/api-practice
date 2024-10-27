// src/components/ProtectedContent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedContent = ({ token }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchProtectedContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContent(response.data.message);
      } catch (error) {
        setContent('Access restricted');
      }
    };
    if (token) fetchProtectedContent();
  }, [token]);

  return <div>{content}</div>;
};

export default ProtectedContent;
