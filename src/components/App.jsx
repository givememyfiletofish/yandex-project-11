import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeleteCardPopup from "./DeleteCardPopup.jsx";
import PopupWithImage from "./PopupWithImage.jsx";

import api from "../utils/Api.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopup] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [isSavingData, setIsSavingData] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    location: {
      link: "",
      name: "",
    },
  });
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const handleCardClick = (cardClicked) => {
    setImagePopup(true);
    setSelectedCard(cardClicked);
  };

  const handleClosePopups = () => {
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setImagePopup(false);
    setDeleteCardPopup(false);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      handleClosePopups();
    }
  };

  const handleAvatarUpdate = (updatedUserInfo) => {
    setCurrentUser(updatedUserInfo);
    setIsSavingData(true);
    return api.setUserAvatar(updatedUserInfo.avatar).then(() => {
      setIsSavingData(false);
      handleClosePopups();
    });
  };

  const handleUpdateUser = (updatedUserInfo) => {
    setCurrentUser(updatedUserInfo);
    setIsSavingData(true);

    return api
      .setUserInfo(updatedUserInfo.name, updatedUserInfo.about)
      .then(() => {
        setIsSavingData(false);
        handleClosePopups();
      });
  };

  function handleCardLike(card, likeState) {
    api.changeCardLikeState(card, likeState).then((result) => {
      setCards(
        cards.map((card, index) => {
          if (card._id === result._id) {
            return result;
          }
          return card;
        })
      );
    });
  }

  function handleCardDelete(card) {
    setDeleteCardPopup(true);
    setCardToDelete(card);
  }

  function confirmCardDelete() {
    setIsSavingData(true);

    return api
      .deleteCard(cardToDelete)
      .then(() => {
        setCards(
          cards.filter((card) => {
            if (card._id !== cardToDelete._id) {
              return card;
            }
          })
        );
      })
      .then(() => {
        setIsSavingData(false);
        handleClosePopups();
      });
  }

  function handleAddPlaceSubmit(imageName, imageLink) {
    setIsSavingData(true);

    return api
      .addNewCard(imageName, imageLink)
      .then((result) => {
        setCards([result, ...cards]);
      })
      .then(() => {
        setIsSavingData(false);
        handleClosePopups();
      });
  }

  React.useEffect(() => {
    function getUserInfo() {
      api.getUserInfo().then((result) => {
        setCurrentUser(result);
      });
    }
    getUserInfo();
  }, []);

  React.useEffect(() => {
    function getInitialCards() {
      api.getInitialCards().then((result) => {
        setCards(result);
      });
    }
    getInitialCards();
  }, []);

  document.addEventListener("keyup", handleEscKey);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={(cardClicked) => {
            handleCardClick(cardClicked);
          }}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
        />

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClosePopups}
          onSubmit={handleAvatarUpdate}
          isSavingData={isSavingData}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClosePopups}
          onSubmit={handleUpdateUser}
          isSavingData={isSavingData}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClosePopups}
          onSubmit={handleAddPlaceSubmit}
          isSavingData={isSavingData}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={handleClosePopups}
          onSubmit={confirmCardDelete}
          isSavingData={isSavingData}
        />

        <PopupWithImage
          isOpen={isImagePopupOpen}
          link={selectedCard.location.link}
          name={selectedCard.location.name}
          onClose={handleClosePopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
