import React, { useEffect, useState } from "react";
import "./PostBottom.css";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import firebase from "firebase";

function PostBottom({ postId, numOfLikes, username, caption, currUserName }) {
  const [heartBtn, setHeartBtn] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(numOfLikes);

  /*
   *   Database.
   *   Each time the comment section of a particular post is changing in the firestore ,
   *   we uptade the frontend data.
   */
  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [postId]);

  const postClicked = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: currUserName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setComment("");
  };

  const heartClicked = () => {
    const currLikes = heartBtn % 2 === 0 ? likes + 1 : likes - 1;
    setLikes(currLikes);
    setHeartBtn(heartBtn + 1);
    db.collection("posts").doc(postId).update({
      likes: currLikes,
    });
  };

  return (
    <div>
      <div className="postBottom__info">
        <div className="postBottom__icons">
          <Link className="postBottom__icons" onClick={heartClicked}>
            {heartBtn % 2 === 0 ? (
              <Icon name="heart outline" size="large" />
            ) : (
              <Icon name="like" color="red" size="large" />
            )}
          </Link>

          <Link className="postBottom__icons">
            <Icon name="comment outline" size="large" />
          </Link>

          <Link className="postBottom__icons">
            <Icon name="paper plane outline" size="large" />
          </Link>
        </div>

        <div>{likes > 0 ? likes + " likes" : "No likes"} </div>

        <div className="postBottom__caption">
          <b>{username} </b> {caption}
        </div>

        <div className="postBottom__comments">
          {comments.map((comment) => (
            <div key={comment.id}>
              <b>{comment.data.username}</b> {comment.data.text}
            </div>
          ))}
        </div>
      </div>

      <div>
        <form className="postBottom__addComment">
          <input
            type="text"
            value={comment}
            placeholder="Add a comment..."
            className="postBottom__addCommentInput"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            type="submit"
            className="postBottom__addCommentBtn"
            onClick={postClicked}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostBottom;
