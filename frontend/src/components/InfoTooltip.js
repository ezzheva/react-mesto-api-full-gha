import React from "react";
import imageSuccess from "../images/regOk.svg";
import imageFatal from "../images/regNo.svg";
import { usePopupClose } from "../hook/usePopupClose";

function InfoTooltip({ isOpen, onClose, isSuccess, messageSuccess, messageFatal }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup  popup-success ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__conteiner">
        <img
          src={isSuccess ? imageSuccess : imageFatal}
          alt="Изображение статуса регистрации"
          className="popup__infoTooltip"
        />
        <p className="popup__title popup__title_auth">
          {isSuccess
            ? messageSuccess
            : messageFatal}
        </p>
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
export default InfoTooltip;
