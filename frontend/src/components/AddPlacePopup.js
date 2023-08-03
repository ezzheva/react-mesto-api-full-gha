import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hook/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({ name: "", link: "" });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({ name: "", link: "" });
  }, [isOpen, setValues]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        type="text"
        id="popup__input-title"
        className="popup__input popup__input_type_element-title"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.name}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-title-error"></span>
      <input
        type="url"
        id="popup__input-link"
        className="popup__input popup__input_type_element-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
