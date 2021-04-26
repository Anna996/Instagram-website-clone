import React from "react";
import { Link } from "react-router-dom";
import "./PopupProfile.css";

function PopupProfile({ profileClicked, logout }) {
  return (
    <div className="popupProfile">
      <Link
        onClick={profileClicked}
        className="popupProfile__profile"
        to="/profile"
      >
        Profile
      </Link>
      <Link onClick={logout} className="popupProfile__logout" to="/">
        Log Out
      </Link>
    </div>
  );
}

export default PopupProfile;
