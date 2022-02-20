import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "routes/SignUp/SignUp.js";
import SignIn from "routes/SignIn/SignIn.js";

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
