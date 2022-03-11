import React from "react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { Provider } from 'react-redux';

import SignUp from "routes/SignUp/SignUp.js";
import SignIn from "routes/SignIn/SignIn.js";

import MainUI from "components/MainUI/MainUI.js";
import MainStore from "store/Main/MainStore.js";

import { UserRoute } from "components/RouteElements/UserRoute";

import AdminDashboard from "components/Dashboard/AdminDashboard/AdminDashboard";
import AdminAcademy from "routes/Admin/AdminAcademy/AdminAcademy";
import AdminAddAcademy from "routes/Admin/AdminAddAcademy/AdminAddAcademy";
import AdminUpdateAcademy from "routes/Admin/AdminUpdateAcademy/AdminUpdateAcademy";
import AdminCourse from "routes/Admin/AdminCourse/AdminCourse";
import AdminAddCourse from "routes/Admin/AdminAddCourse/AdminAddCourse";
import AdminUpdateCourse from "routes/Admin/AdminUpdateCourse/AdminUpdateCourse";
import AdminAllCourse from "routes/Admin/AdminAllCourses/AdminAllCourses";
import AdminAllStudents from "routes/Admin/AdminAllStudents/AdminAllStudents";
import AdminAddStudent from "routes/Admin/AdminAddStudent/AdminAddStudent";
import AdminUpdateStudent from "routes/Admin/AdminUpdateStudent/AdminUpdateStudent";


function MainUIRouter(props) {

  return (
    <Provider store={MainStore.store}>
      <MainUI>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path='/admin' element={<AdminDashboard />}>
              <Route path='academy' element={<Outlet />}>
                <Route index element={<AdminAcademy />}></Route>
                <Route path='add' element={<AdminAddAcademy />}></Route>
                <Route path=':id/edit' element={<AdminUpdateAcademy />}></Route>
                <Route path=':id/courses' element={<AdminCourse />}></Route>
                <Route path=':id/courses/add' element={<AdminAddCourse />}></Route>
                <Route path=':id/courses/:id/edit' element={<AdminUpdateCourse />}></Route>
              </Route>
              <Route path='courses' element={<AdminAllCourse />}></Route>
              <Route path='students' element={<Outlet />}>
                <Route index element={<AdminAllStudents />}></Route>
                <Route path='add' element={<AdminAddStudent />}></Route>
                <Route path=':id/edit' element={<AdminUpdateStudent />}></Route>
              </Route>
            </Route>
            <Route path='/user' element={UserRoute.userElement}>
              <Route path='academy' element={<Outlet />}>
                <Route index element={UserRoute.academyElement}></Route>
                <Route path=':id/courses' element={UserRoute.academyCoursesElement}></Route>
              </Route>
              <Route path='courses' element={UserRoute.enrolledCourses}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MainUI>
    </Provider>
  );
}

export default MainUIRouter;
