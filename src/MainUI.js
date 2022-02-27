import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';

import SignUp from "routes/SignUp/SignUp.js";
import SignIn from "routes/SignIn/SignIn.js";

import MainStore from "store/Main/MainStore";

function MainUI(props) {

  return (
    <Provider store={MainStore.store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default MainUI;
