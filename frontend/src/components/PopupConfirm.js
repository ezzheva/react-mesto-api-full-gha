import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupConfirm({ onClose, onCardDelete, isOpen, card, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      name="trash"
      title="Вы уверенны?"
      buttonText={isLoading ? "Удаление..." : "Удалить"}
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    />
  );
}

export default PopupConfirm;
