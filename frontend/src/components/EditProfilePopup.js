import React, { useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import { useForm } from "../hook/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  // const [name, setName] = useState("");
  // const [about, setAbout] = useState("");

  const { values, handleChange, setValues } = useForm({ name: "", about: "" });

  // function handleChangeName(evt) {
  //   setName(evt.target.value);
  // }
  // function handleChangeAbout(evt) {
  //   setAbout(evt.target.value);
  // }
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      // Передаём значения управляемых компонентов во внешний обработчик
      name: values.name,
      about: values.about,
    });
  }

  useEffect(() => {
    setValues({name: values.name, about: values.about});
  }, [ currentUser, isOpen, setValues ]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        type="text"
        id="popup__input-name"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Ваше Имя"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-name-error"></span>
      <input
        type="text"
        id="popup__input-about"
        className="popup__input popup__input_type_about"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-about-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
