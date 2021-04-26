import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Icon, Popup } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import "./Header.css";
import PopupProfile from "./PopupProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Header({ logout, userImage }) {
  const classes = useStyles();
  const [uploadBtn, setUploadBtn] = useState(0);
  const [next, setNext] = useState("/upload");

  const uploadClicked = () => {
    setNext(uploadBtn % 2 === 0 ? "/" : "/upload");
    setUploadBtn(uploadBtn + 1);
  };

  const iconClicked = () => {
    if (uploadBtn % 2 === 1) {
      uploadClicked();
    }
  };

  return (
    <div className="header">
      <img className="header__image" src="./images/Instagram_logo.png" alt="" />

      <div className="header__icons">
        <div onClick={uploadClicked}>
          <Link to={next}>
            <Icon name="attach" color="grey" size="large" />
          </Link>
        </div>

        <Link to="/">
          <HomeIcon
            onClick={iconClicked}
            className="header__feed"
            fontSize="large"
          />
        </Link>

        <Link>
          <Popup
            trigger={
              <Avatar src={userImage} className={classes.small}></Avatar>
            }
            content={
              <PopupProfile profileClicked={iconClicked} logout={logout} />
            }
            on="click"
            position="bottom right"
          ></Popup>
        </Link>
      </div>
    </div>
  );
}

export default Header;
