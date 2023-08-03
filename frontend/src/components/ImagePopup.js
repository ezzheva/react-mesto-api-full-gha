import React from "react";
import { usePopupClose } from "../hook/usePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card?.link, onClose);

  return (
    <div
      className={`popup popup_full-screen 
    ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container-full-screen">
        <img className="popup__full-img" src={card.link} alt={card.name} />
        <p className="popup__full-text">{card.name}</p>
        <button
          type="button"
          className="popup__close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
