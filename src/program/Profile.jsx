import { Avatar, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./Profile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    marginBottom: 25,
  },
}));

function Profile({ fullname, username, posts, userImage }) {
  const classes = useStyles();

  return (
    <div>
      <div className="profile__header">
        <Avatar src={userImage} className={classes.large} />
        <div className="profile__userInfo">
          <div className="profile__username">{username}</div>
          <div className="profile__userfullname"> {fullname}</div>
          <div>{posts.length} posts</div>
        </div>
      </div>

      <Divider />

      <div className="profile__images">
        {posts.map((post) => (
          <img
            key={post.id}
            className="profile__image"
            src={post.data.imageUrl}
            alt="Not Available"
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
