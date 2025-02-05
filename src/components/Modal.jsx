import React from 'react';
import '../index.css';

const Modal = ({ isOpen, onClose, formData, handleChange, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          <button type="button" className="modal-cancel text" onClick={onClose}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;