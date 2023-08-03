import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onDeleteCard,
  onPopupConfirm,
}) {
  const currentUser = useContext(CurrentUserContext);
  // console.log("Cards:", cards);
  const cardsElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onDeleteCard}
      onPopupConfirm={onPopupConfirm}
    />
  ));

  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-box" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватарка"
            />
          </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__button-edit"
                type="button"
                aria-label="Edit"
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__button-add"
            type="button"
            aria-label="Add"
          ></button>
        </section>

        <section className="cards">{cardsElements}</section>
      </main>
    </div>
  );
}

export default Main;
