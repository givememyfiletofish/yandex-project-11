import React from "react";
import ReactDOM from "react-dom";
import PopupWithForm from "./PopupWithForm.jsx";
import InputField from "./InputField.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarLinkInput = React.useRef();

  const [avatarLink, setAvatarLink] = React.useState("");
  const [linkInputValidity, setLinkInputValidity] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      ...currentUser,
      avatar: avatarLinkInput.current.value,
    });
    setAvatarLink("");
    setLinkInputValidity(false);
  }

  function checkLinkInputValidity(inputValidity) {
    setLinkInputValidity(inputValidity);
  }

  const handleChange = (e) => {
    setAvatarLink(e.target.value);
  };

  function handleClose() {
    setAvatarLink("");
    setLinkInputValidity(false);
    props.onClose();
  }

  React.useEffect(() => {
    if (!props.isOpen) {
      setAvatarLink("");
      setLinkInputValidity(false);
    }
  }, [props]);

  return (
    <PopupWithForm
      onClosePopup={handleClose}
      type="profile-pic"
      isOpen={props.isOpen}
      title="Change profile picture"
      onSubmit={handleSubmit}
      isFormValid={linkInputValidity}
      buttonText={props.isSavingData ? "Saving" : "Save"}
    >
      {props.isOpen && (
        <InputField
          refs={avatarLinkInput}
          inputClassName="popup__input popup__input_margin_top-input popup__input_type_name"
          id="profile-pic-link"
          type="url"
          name="profile-pic"
          minLength="2"
          placeholder="Image Link"
          required
          onChange={handleChange}
          value={avatarLink || ""}
          checkInputValidity={checkLinkInputValidity}
          spanClassName="popup__input-error"
          spanId="profile-pic-link-error"
        />
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
