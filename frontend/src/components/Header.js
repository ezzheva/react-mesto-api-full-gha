import React from "react";
import headerLogo from "../images/Vector.svg";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Header({ userEmail, setLoggedIn, loggedIn }) {
  const navigate = useNavigate();

  function singOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  const location = useLocation();

  return (
    <div className="Header">
      <header className="header">
        <img
          className="header__logo"
          src={headerLogo}
          alt="логотип места Росиии"
        />
        <ul className="header__nav">
          {location.pathname === "/sign-in" && (
            <li>
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </li>
          )}
          {location.pathname === "/sign-up" && (
            <li>
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <div className="header__box">
                <p className="header__email">{userEmail}</p>
                <Link to="/sign-in" className="header__link" onClick={singOut}>
                  Выйти
                </Link>
              </div>
            </li>
          )}
        </ul>

        {/* <Route path="/sign-up"
        element={
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        }/>

        <Route path="/"
        element={
          <div className="header__box">
            <p className="header__email">{userEmail}</p>
            <Link to="/sign-in" className="header__link" onClick={singOut}>
              Выйти
            </Link>
          </div>
        }/>

        </Routes> */}
      </header>
    </div>
  );
}

export default Header;
