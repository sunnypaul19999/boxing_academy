import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import * as Input from "components/LoginInputField/InputField.js";

import "assets/css/login.css";

function SignIn(props) {
  //akshdfjl@gmail.com
  let formRef = useRef(null);
  let navigate = useNavigate();

  /*const [state, setState] = useState({
    email: null,
    password: null,
  });*/

  let onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formData = new FormData(formRef.current);
    let credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(Object.values(credentials));
  };

  let signUpRedirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/");
  };

  return (
    <form id="loginForm" ref={formRef} onSubmit={onSubmit.bind(this)}>
      <h3 className="text-white">Login</h3>
      <div className="form-item">
        <div className="form-group">
          <div className="form-group">{<Input.Email />}</div>
          <div className="form-group">{<Input.Password />}</div>
          <div className="text-center">
            <input
              type="submit"
              id="loginButton"
              className="btn btn-primary"
              value="Login"
              onChange={() => { }}
            />
          </div>
          <div className="signupRedirection text-center text-black">
            New user?{" "}
            <span id="signupLink" onClick={signUpRedirection.bind(this)}>
              Register
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
