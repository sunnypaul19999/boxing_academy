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
                  <CardContainer
                    grid
                    cardProps={[
                      {
                        id: '1',
                        admin: true,
                        academy: true,
                        url: 'https://images.indianexpress.com/2020/06/the-matrix-759.jpg',
                        title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
                        description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                                      Thymeleaf, JPA & Hibernate`,
                        duration: '3 months',
                        timing: '6pm - 8pm',
                        strength: '103',
                        location: 'Hyderabad',
                        zipcode: '721305',
                        rating: '3',
                      }
                    ]} />
                </>
              }></Route>
              <Route path='viewInstitutes/:instituteId' element={<SearchBar course />}></Route>
              <Route path='viewCourse' element={<SearchBar course />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MainUI >
    </Provider >
  );
}

export default MainUIRouter;
