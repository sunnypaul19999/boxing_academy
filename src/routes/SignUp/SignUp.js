import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";

import SignUpAPI from "server/SignUpAPI/SignUpAPI.js";

import { signInHandler } from 'routes/SignIn/SignInHandler.js';

import * as Input from "../../components/LoginInputField/InputField.js";
import "assets/css/login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SignUp(props) {
  //akshdfjl@gmail.com
  let formRef = useRef(null);
  let navigate = useNavigate();

  /*const [state, setState] = useState({
    email: null,
    username: null,
    mobileNumber: null,
    password: null,
    confirmPassword: null,
  });*/

  let onSubmit = async (event) => {
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
    if (credentials.password === credentials.confirmPassword) {
      let signUpMsgPacket = await SignUpAPI.createUser(credentials);
      toast(signUpMsgPacket.msg);
      if (signUpMsgPacket.isCreated) {
        let signInMsgPacket = await signInHandler(credentials);
        //toast(signInMsgPacket.msg);
        if (signInMsgPacket.token) {
          //navigate to proper dashboard
          console.log(`SignIn token generated in SignUp \n${signInMsgPacket.token}`);
        }
      }
    } else {
      toast('password and confirm password does not match');
    }
  };

  let signInRedirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/signIn");
  };

  return (
    <>
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
              onChange={() => { }}
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

export default SignUp;
