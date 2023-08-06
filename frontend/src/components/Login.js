import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";
import { useForm } from "../hook/useForm";

function Login({ handleLogin, setUserEmail, setIsSuccess, setIsInfoTooltipPopupOpen }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();


  function handleSubmit(evt) {
    evt.preventDefault();
    Auth.authorize(values.email, values.password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setUserEmail(values.email)
        handleLogin();
        navigate("/");
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
      <h2 className="authen__title">Вход</h2>
      <form className="authen__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className="authen__input"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
          value={values.email || ""}
        />
        <input
          type="password"
          id="password"
          className="authen__input"
          placeholder="Пароль"
          name="password"
          required
          onChange={handleChange}
          value={values.password || ""}
        />
        <button type="submit" className="authen__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
