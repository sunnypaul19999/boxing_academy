import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import * as Input from "components/SignUp/InputField.js";

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
      <h3 class="text-white">Login</h3>
      <div class="form-item">
        <div class="form-group">
          <div class="form-group">{<Input.Email />}</div>
          <div class="form-group">{<Input.Password />}</div>
          <div class="text-center">
            <input
              type="submit"
              id="loginButton"
              class="btn btn-primary"
              value="Login"
              onChange={() => {}}
            />
          </div>
          <div class="signupRedirection text-center text-black">
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
