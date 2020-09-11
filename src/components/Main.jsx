import React from "react";
import ReactDOM from "react-dom";
import api from "../utils/Api.js";
import Card from "./Card.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile page__section">
        <img className="profile__avatar" src={currentUser.avatar} alt="" />
        <button
          className="profile__avatar-button button"
          onClick={props.onEditAvatar}
        ></button>

        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-button button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements page__section">
        <ul className="elements__list">
          {props.cards.map((location, index) => {
            return (
              <Card
                api={api}
                key={index}
                location={location}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                onCardClick={(cardProps) => {
                  props.onCardClick(cardProps);
                }}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
