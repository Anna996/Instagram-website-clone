import React, { useState } from "react";
import { Button, Input, Progress } from "semantic-ui-react";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUploader.css";

function ImageUploader({ username, userImgUrl }) {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const updateFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const uploadImage = () => {
    // if image is null
    if (!image) {
      alert("Please choose an image");
      return;
    }

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    const next = (snapshot) => {
      const precent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(precent);
    };
    const error = (error) => {
      console.log("Error: ", error.message);
    };
    const complete = () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username,
            userImgUrl: userImgUrl,
            likes: 0,
          });
        });

      setCaption("");
      setProgress(0);
      setImage(null);
    };

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };

  return (
    <div className="ImageUploader">
      <Progress className="ImageUploader__info" percent={progress} indicating />
      <Input
        type="file"
        className="ImageUploader__info"
        onChange={updateFile}
      />
      <Input
        type="text"
        value={caption}
        placeholder="Enter a caption"
        className="ImageUploader__info"
        onChange={(e) => setCaption(e.target.value)}
      />
      <Button onClick={uploadImage} className="ImageUploader__info">
        Upload
      </Button>
    </div>
  );
}

export default ImageUploader;
