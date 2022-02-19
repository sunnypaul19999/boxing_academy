import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "components/SignUp/SignUp.js";
import SignIn from "components/SignIn/SignIn.js";

function MainUI(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainUI;
