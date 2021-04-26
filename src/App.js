import "./App.css";
import { useState, useEffect } from "react";
import Login from "./program/Login";
import SignUp from "./program/SignUp";
import Header from "./program/Header";
import Feed from "./program/Feed";
import Profile from "./program/Profile";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { db, auth, fbProvider } from "./program/firebase";
import ImageUploader from "./program/ImageUploader";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [userfullname, setUserfullname] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [userImage, setUserImage] = useState("");

  /*
   *  Authentication.
   */

  // Creates a new user.
  const signUpBtn = (userInfo, event) => {
    event.preventDefault();
    setUsername(userInfo.userName);
    setUserfullname(userInfo.fullName);
    auth
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((authUser) => {
        setUserImage("");
        return authUser.user.updateProfile({
          displayName: userInfo.userName + ";" + userInfo.fullName,
        });
      })
      .catch((error) => alert(error.message));
  };

  // Log in with an existing user.
  const logInBtn = (userInfo, event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(setUserImage(""))
      .catch((error) => alert(error.message));
  };

  // Log in with Facebook
  const facebookBtnClicked = () => {
    auth
      .signInWithPopup(fbProvider)
      .then((result) => {
        // console.log("result: ", result);
        // console.log(
        //   "url: ",
        //   result.additionalUserInfo.profile.picture.data.url
        // );
        setUserImage(result.additionalUserInfo.profile.picture.data.url);
      })
      .catch((error) => alert(error));
  };

  // Log out
  const logOutBtn = () => {
    auth.signOut().catch((error) => alert(error));
  };

  // Updates the user data when it has changed in the backend.
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        const name = authUser.displayName.split(";", 2);
        setUsername(name[0]);
        setUserfullname(name[1]);
      } else setUser(null);
    });
  }, []);

  /*
   *  Database - cloud firestore.
   *  Updates the frontend data when it has changed in the backend.
   */

  // Updates the posts of all users.
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  // Updates only the posts of the logged in user.
  useEffect(() => {
    if (username) {
      db.collection("posts")
        .where("username", "==", username)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setUserPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [username]);

  return (
    <div className="app">
      <div className="app__body">
        {user ? (
          <Router>
            <Route>
              <Header logout={logOutBtn} userImage={userImage} />

              <Switch>
                <Route path="/profile">
                  <Profile
                    fullname={userfullname}
                    username={username}
                    posts={userPosts}
                    userImage={userImage}
                  />
                </Route>

                <Route path="/">
                  <Route path="/upload">
                    <ImageUploader username={username} userImgUrl={userImage} />
                  </Route>
                  <Feed currUserName={username} allPosts={posts} />
                </Route>
              </Switch>
            </Route>
          </Router>
        ) : (
          <Router>
            <Switch>
              <Route path="/Signup">
                <SignUp
                  btnClicked={signUpBtn}
                  fbBtnClicked={facebookBtnClicked}
                />
              </Route>

              <Route path="/">
                <Login
                  btnClicked={logInBtn}
                  fbBtnClicked={facebookBtnClicked}
                />
              </Route>
            </Switch>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
