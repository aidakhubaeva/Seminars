import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Modal from './Modal';
import '../index.css';

const CardModel = ({ cards, setCards }) => {
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', time: '' });

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить эту карточку?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3000/cards/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        } else {
          console.error('Ошибка при удалении карточки');
        }
      } catch (error) {
        console.error('Ошибка при подключении к серверу:', error);
      }
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      title: card.title,
      description: card.description,
      date: card.date,
      time: card.time,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`; // Преобразование в формат DD.MM.YYYY
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      ...editingCard,
      ...formData,
      date: formatDate(formData.date), // Форматирование даты
    };
  
    try {
      const response = await axios.put(`http://localhost:3000/seminars/${editingCard.id}`, updatedData);
  
      if (response.status === 200) {
        const updatedCard = response.data;
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
        );
        setEditingCard(null);
      } else {
        console.error('Ошибка при обновлении карточки');
      }
    } catch (error) {
      console.error('Ошибка при подключении к серверу:', error);
    }
  };

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onEdit={handleEdit} onDelete={handleDelete} />
      ))}

      <Modal isOpen={!!editingCard} onClose={() => setEditingCard(null)}>
        <h2 className="modal-title text">Редактировать карточку</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="modal-input text"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="modal-input text"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="date"
            name="date"
            className="modal-input text"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="modal-input text"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <button type="submit" className="modal-submit text">Сохранить</button>
          <button type="" className="modal-cancel text" onClick={() => setEditingCard(null)}>Отмена</button>
        </form>
      </Modal>
    </div>
  );
};

export default CardModel;