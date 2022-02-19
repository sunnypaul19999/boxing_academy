import React, { useRef, useState } from "react";

import * as Input from "./InputField.js";

import "assets/css/login.css";

function SignUp(props) {
  //akshdfjl@gmail.com
  let formRef = useRef(null);

  /*const [state, setState] = useState({
    email: null,
    username: null,
    mobileNumber: null,
    password: null,
    confirmPassword: null,
  });*/

  let onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formData = new FormData(formRef.current);
    let credentials = {
      email: formData.get("email"),
      username: formData.get("username"),
      mobileNumber: formData.get("mobileNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    console.log(Object.values(credentials));
  };

  let signInRedirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <form id="loginForm" ref={formRef} onSubmit={onSubmit.bind(this)}>
      <h3 className="text-white">Register</h3>
      <div className="form-item">
        <div className="form-group">{<Input.Email />}</div>
        <div className="form-group">{<Input.Username />}</div>
        <div className="form-group">{<Input.MobileNumber />}</div>
        <div className="form-group">{<Input.Password />}</div>
        <div className="form-group">{<Input.ConfirmPassword />}</div>
        <div className="text-center">
          <input
            type="Submit"
            className="btn btn-primary"
            id="submitButton"
            value="Submit"
            //onChange is added to suppress form uncontrollable due value provided in submit input
            onChange={() => {}}
          />
        </div>
        <div className="signinRedirection text-center text-black">
          Already a user?{" "}
          <span id="signinLink" onClick={signInRedirection.bind(this)}>
            Login
          </span>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
