import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import SignInAPI from "server/SignInAPI/SignInAPI";

import * as Input from "components/LoginInputField/InputField.js";
import "assets/css/login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn(props) {
  //akshdfjl@gmail.com
  let formRef = useRef(null);
  let navigate = useNavigate();

  /*const [state, setState] = useState({
    email: null,
    password: null,
  });*/

  let onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formData = new FormData(formRef.current);
    let credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(Object.values(credentials));
    let loginToken = await SignInAPI.createUser(credentials);
    if (loginToken) {
      toast('Welcome to Boxing Academy');
    } else {
      toast('Invalid login credentials');
    }
  };

  let signUpRedirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/");
  };

  return (
    <>
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
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false} />
    </>
  );
}

export default SignIn;
