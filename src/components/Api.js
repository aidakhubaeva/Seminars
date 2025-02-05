import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = ({ onDataLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/seminars')
      .then(response => {
        onDataLoaded(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(`Ошибка при загрузке данных: ${err.message}`);
        setLoading(false);
      });
  }, [onDataLoaded]);

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return null; 
};

export default Api;