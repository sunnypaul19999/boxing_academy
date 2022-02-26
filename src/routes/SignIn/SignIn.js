import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

import { signInHandler } from './SignInHandler.js';

//import TokenStore from 'store/Token/TokenStore.js';

import * as Input from "components/LoginInputField/InputField.js";
import "assets/css/login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignIn(props) {
  let formRef = useRef(null);

  let navigate = useNavigate();

  let tokenStoreDispatch = useDispatch();

  let jwtToken = useSelector((state) => {
    if (state) {
      return state.token;
    } else {
      return 'SignIn component: TokenStore is accessed using useSelector, state is null';
    }
  });

  useEffect(() => {
    console.log('SignIn component: updated');
    console.log(`SignIn component: jwtToken in TokenStore ---> ${jwtToken}`);
  });


  let onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formData = new FormData(formRef.current);
    let credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    let signInMsgPacket = await signInHandler(credentials);
    toast(signInMsgPacket.msg);
    if (signInMsgPacket.token) {
      //TODO: navigate to proper dashboard here
      //console.log(signInMsgPacket.token);
      tokenStoreDispatch({ type: 'saveAuthToken', payload: { token: signInMsgPacket.token } });
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
