import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Segment } from "semantic-ui-react";
import React, { useState } from "react";
import "./Login.css";
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
    marginTop: 10,
    fontSize: 14,
    padding: 10,
  },
});

function Login({ btnClicked, fbBtnClicked }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <img className="login__image" src="./images/Instagram_logo.png" alt="" />

      <Segment basic textAlign="center">
        <form className="login__form">
          <input
            className="login__input"
            label="Email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login__input"
            label="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={(e) => {
              btnClicked({ email, password }, e);
            }}
            classes={{ root: classes.button }}
          >
            Log In
          </Button>
        </form>

        <Divider className="login__divider" horizontal>
          {" "}
          OR{" "}
        </Divider>

        <Link onClick={fbBtnClicked} class="login__facebookBtn" to="/">
          <i class="facebook icon"></i>
          Log in with Facebook
        </Link>
      </Segment>

      <div className="login__signUp">
        Don't have an account?{" "}
        <Link className="login__link" to="/Signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
