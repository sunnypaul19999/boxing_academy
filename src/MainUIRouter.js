import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';

import SignUp from "routes/SignUp/SignUp.js";
import SignIn from "routes/SignIn/SignIn.js";

import MainUI from "components/MainUI/MainUI.js";
import MainStore from "store/Main/MainStore.js";
import AdminDashboard from "components/AdminDashboard/AdminDashboard.js";
import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";

//<SignUp />
function MainUIRouter(props) {

  return (
    <Provider store={MainStore.store}>
      <MainUI>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path='/admin' element={<AdminDashboard />}>
              <Route path='viewInstitutes' element={
                <>
                  <SearchBar academy />
                  <CardContainer list fetch={{ admin: true, academy: true }} />
                </>
              }></Route>
              <Route path='viewInstitutes/:instituteId' element={
                <>
                  <SearchBar course />
                  <CardContainer list fetch={{ admin: true, course: true }} />
                </>
              }></Route>
              <Route path='viewCourse' element={
                <>
                  <SearchBar course />
                  <CardContainer list fetch={{ admin: true, course: true }} />
                </>
              }></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MainUI>
    </Provider>
  );
}

export default MainUIRouter;
