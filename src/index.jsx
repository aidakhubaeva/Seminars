import React from 'react';
import { createRoot } from 'react-dom/client';  // Новый метод из React 18
import App from './components/App';

console.log('Инициализация React-приложения...');

const container = document.getElementById('root');
const root = createRoot(container); // Создание корневого элемента
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React-приложение успешно отрендерено.');