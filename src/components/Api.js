import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = ({ onDataLoaded }) => {
  // Состояния для отслеживания загрузки и ошибок
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null);     // Состояние ошибок

  useEffect(() => {
    // Запрос данных с сервера при монтировании компонента
    axios.get('http://localhost:3000/seminars')
      .then(response => {
        onDataLoaded(response.data); // Передача загруженных данных в родительский компонент
        setLoading(false);           // Отключение состояния загрузки после успешного запроса
      })
      .catch((err) => {
        setError(`Ошибка при загрузке данных: ${err.message}`); // Обработка ошибки
        setLoading(false);                                      // Отключение состояния загрузки при ошибке
      });
  }, [onDataLoaded]);

  // Отображение состояния загрузки
  if (loading) return <p>Загрузка данных...</p>;

  // Отображение ошибки, если она возникла
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return null; // Компонент не отображает ничего после успешной загрузки данных
};

export default Api;