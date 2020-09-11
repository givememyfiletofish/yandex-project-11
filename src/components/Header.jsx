import React from "react";
import ReactDOM from "react-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header page__section">
      <img className="header__logo" src={logo} alt="header logo" />
    </header>
  );
}

export default Header;
