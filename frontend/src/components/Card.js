import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete, onPopupConfirm }) {
  const currentUser = useContext(CurrentUserContext);

  /**корзина удаления */
  const isOwn = card.owner === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  // const cardDeleteButtonClassName =
  //   `card__delete ${isOwn ? 'card__delete_active' : ''}`; // Создаём переменную, которую после зададим в `className` для кнопки корзины

  /**лaйк */
  const isLiked = card.likes.some((i) => i === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`; // Создаём переменную, которую после зададим в `className` для кнопки лайка

  /**функция карточка на весь экран */
  function handleCardClick() {
    onCardClick(card);
  }

  /**функция лайк */
  function handleLikeClick() {
    onCardLike(card);
  }

  /**функция удаления */
  function handleDeleteClick() {
    onCardDelete(card);
    onPopupConfirm(true);
  }

  return (
    <div className="card">
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__block">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-counter">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="like"
            onClick={handleLikeClick}
          ></button>
          <p className="card__number-likes">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="card__delete"
          aria-label="delete"
          onClick={handleDeleteClick}
        ></button>
      )}
    </div>
  );
}
export default Card;
