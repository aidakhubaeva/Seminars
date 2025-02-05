import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Modal from './Modal';
import '../index.css';

const CardModel = ({ cards, setCards }) => {
  // Состояние для хранения редактируемой карточки
  const [editingCard, setEditingCard] = useState(null);

  // Состояние для формы редактирования
  const [formData, setFormData] = useState({ title: '', description: '', date: '', time: '' });

  // Удаление карточки с сервера и обновление состояния
  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту карточку?')) {
      try {
        await axios.delete(`http://localhost:3000/cards/${id}`);
        setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // Удаление карточки из состояния
      } catch (error) {
        console.error('Ошибка при удалении карточки:', error); // Обработка ошибок при удалении
      }
    }
  };

  // Открытие модального окна для редактирования карточки
  const handleEdit = (card) => {
    setEditingCard(card); // Устанавливаем текущую карточку для редактирования
    setFormData({
      title: card.title,
      description: card.description,
      date: card.date,
      time: card.time,
    });
  };

  // Обработчик изменений в полях формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Обновление данных формы
  };

  // Отправка обновленных данных на сервер
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...editingCard, ...formData }; // Объединение старых и новых данных

    try {
      const response = await axios.put(`http://localhost:3000/seminars/${editingCard.id}`, updatedData);
      if (response.status === 200) {
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === response.data.id ? response.data : card)) // Обновление данных карточки в состоянии
        );
        setEditingCard(null); // Закрытие модального окна после успешного редактирования
      }
    } catch (error) {
      console.error('Ошибка при обновлении карточки:', error); // Обработка ошибок при обновлении
    }
  };

  return (
    <div className="card-grid">
      {/* Отображение списка карточек */}
      {cards.map((card) => (
        <Card key={card.id} card={card} onEdit={handleEdit} onDelete={handleDelete} />
      ))}

      {/* Модальное окно для редактирования карточки */}
      <Modal
        isOpen={!!editingCard}
        onClose={() => setEditingCard(null)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CardModel;