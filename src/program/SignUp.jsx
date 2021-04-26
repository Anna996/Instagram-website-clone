import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import "./SignUp.css";
import { Divider, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    background: "#B2DFFC",
    borderRadius: 3,
    color: "white",
    height: 30,
    width: 260,
    textTransform: "initial",
    fontWeight: "bold",
    marginTop: 12,
    fontSize: 14,
    padding: 10,
    fontFamily:
      " -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
});

function Signup({ btnClicked, fbBtnClicked }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const getCurrentUser = () => {
    return {
      email: email,
      fullName: fullName,
      userName: userName,
      password: password,
    };
  };

  return (
    <div className="signUp">
      <img className="signUp__image" src="./images/instagram_logo.png" alt="" />

      <form className="signUp__form">
        <Segment basic textAlign="center">
          <div className="signUp__description">
            <div>Sign up to see photos and videos</div>
            <div>from your friends.</div>
          </div>

          <Link to="/">
            <button onClick={fbBtnClicked} class="ui facebook button ">
              <i class="facebook icon"></i>
              Log in with Facebook
            </button>
          </Link>

          <Divider horizontal className="signUp__divider">
            {" "}
            OR{" "}
          </Divider>

          <input
            className="signUp__input"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="signUp__input"
            placeholder="Full Name"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="signUp__input"
            placeholder="Username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            className="signUp__input"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            onClick={(e) => btnClicked(getCurrentUser(), e)}
            classes={{ root: classes.button }}
          >
            {" "}
            Sign up
          </Button>
        </Segment>
      </form>

      <div className="signUp__logIn">
        Have an account?{" "}
        <Link className="signUp__link" to="/">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Signup;
