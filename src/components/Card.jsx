import React from 'react';
import '../index.css';

const Card = ({ card, onEdit, onDelete }) => {
  return (
    <div className="card">
      <img src={card.photo} alt={card.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title text">{card.title}</h3>
        <p className="card-description text">{card.description}</p>
        <p className="card-date-time text">Дата: {card.date} | Время: {card.time}</p>
        <div className="button-container">
            <button className="button edit-button text" onClick={() => onEdit(card)}>Редактировать</button>
            <button className="button delete-button text" onClick={() => onDelete(card.id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
