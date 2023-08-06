import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupConfirm from "./PopupConfirm.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

import * as Auth from "../utils/Auth.js";
function App() {
  /**попап редактирование профиля */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  /**попап добавления карточки */
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  /**попап редактирования аватара */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  /** попап карточки */
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  /**  отслеживания состояния загрузки во время ожидания ответа от сервера*/
  const [isLoading, setIsLoading] = useState(false);

  /**попап удаления */
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [cardDelete, setCardDelete] = useState({});

  /**статус входа */
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  /**попап входа */
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleRegister() {
    setLoggedIn(true);
  }

  function handleTokenCheck() {
      const jwt = localStorage.getItem("token");
      if (jwt) {
      Auth.getContent(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate("/");
        })
        .catch(() => {
          setLoggedIn(false);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**попап редактирование профиля */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  /**попап добавления карточки */
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  /**попап редактирования аватара */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  /**функция закрытия попапов */
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setCardDelete({});
    setIsDeleteConfirmation(false);
    setIsInfoTooltipPopupOpen(false);
  }

  /**лайк */
  function handleCardLike(card) {
    const jwt = localStorage.getItem("token");
    const isLiked = card.likes.some((i) => i === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    if (!isLiked) {
      api
        .getLike(card._id, jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id, jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /**удаление карточки */
  function handleCardDelete(card) {
    function makeRequest() {
      const jwt = localStorage.getItem("token");
      return api.deleteCard(card._id, jwt).then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      });
    }
    handleSubmit(makeRequest);
  }
  /**универсальную функцию, которая принимает функцию запроса*/
  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setIsLoading(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      .catch(console.error)
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => setIsLoading(false));
  }
  /** формы профиля*/
  function handleUpdateUser(inputValues) {
    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
    function makeRequest() {
      const jwt = localStorage.getItem("token");
      // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
      return api.patchUserInfo(inputValues, jwt).then(setCurrentUser);
    }
    // вызываем универсальную функцию, передавая в нее запрос
    handleSubmit(makeRequest);
  }
  // function handleUpdateUser(data) {
  //   setIsLoading(true)
  //   api
  //     .patchUserInfo(data)
  //     .then((userInfo) => {
  //       setCurrentUser(userInfo)
  //       closeAllPopups()
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     })
  // }
  /**форма аватара */
  function handleUpdateAvatar(inputValues) {
    const jwt = localStorage.getItem("token");
    function makeRequest() {
      return api.patchAvatarInfo(inputValues, jwt).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }
  /**форма добавления карточки */
  function handleAddPlaceSubmit(inputValues) {
    const jwt = localStorage.getItem("token");
    function makeRequest() {
      return api.addNewCard(inputValues, jwt).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (loggedIn) {
      Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)])
        .then(([data, cardData]) => {
          setCurrentUser(data);
          setCards(cardData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            userEmail={userEmail}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegister={handleRegister}
                  setIsSuccess={setIsSuccess}
                  setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                />
              }
            />

            <Route
              path="/sign-in"
              element={
                <Login 
                  handleLogin={handleLogin}
                  setUserEmail={setUserEmail}
                  setIsSuccess={setIsSuccess}
                  setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}/>
              }
            />
            <Route path="*" element={<Navigate to="/sign-in" replace />} />

            <Route
              path="/react-mesto-auth"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onDeleteCard={setCardDelete}
                  cards={cards}
                  onPopupConfirm={setIsDeleteConfirmation}
                />
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <PopupConfirm
            onClose={closeAllPopups}
            isOpen={isDeleteConfirmation}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
            card={cardDelete}
          />
          <Footer />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccess}
            messageSuccess={"Вы успешно зарегистрировались!"}
            messageFatal={"Что-то пошло не так! Попробуйте ещё раз."}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
