import React from 'react';

const EditCardForm = ({ formData, handleChange, handleSubmit, onCancel }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="modal-title text">Редактировать карточку</h2>
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
      <div className="modal-buttons">
        <button type="submit" className="modal-submit text">Сохранить</button>
        <button type="button" className="modal-cancel text" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default EditCardForm;