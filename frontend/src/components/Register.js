import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";
import { useForm } from "../hook/useForm";

function Register({ setIsSuccess, setIsInfoTooltipPopupOpen }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  function handleSubmit(evt) {
    evt.preventDefault();
    Auth.register(values.email, values.password)
      .then((data) => {
        navigate("/sign-in");
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }
  
  useEffect(() => {
    setValues({ email: "", password: "" });
  }, [setValues]);

  return (
    <div className="authen">
      <h2 className="authen__title">Регистрация</h2>
      <form className="authen__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className="authen__input"
          placeholder="Email"
          name="email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="authen__input"
          placeholder="Пароль"
          name="password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <button type="submit" className="authen__submit-button">
          Зарегистрироваться
        </button>
        <p className="authen__text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="authen__text_link">
            {" "}
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
