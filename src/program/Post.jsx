import React from "react";
import PostBottom from "./PostBottom";
import { Avatar } from "@material-ui/core";
import "./Post.css";

function Post({ postId, postData, currUserName }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={postData.userImgUrl} alt={postData.username} />

        <div className="post__header__username">{postData.username} </div>
      </div>

      <img
        className="post__image"
        src={postData.imageUrl}
        alt="Not Available"
      />

      <PostBottom
        postId={postId}
        numOfLikes={postData.likes}
        username={postData.username}
        caption={postData.caption}
        currUserName={currUserName}
      />
    </div>
  );
}

export default Post;
