import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//props: admin | user
//academy, course
function ToolbarMenu(props) {

    let idStore = {
        admin: {
            academy: 'adminAcademy',
            courses: 'adminCourse',
            students: 'adminStudents',
        },
        student: {
            academy: 'userAcademy',
            enrolledCourse: 'userEnrolledCourse',
        }
    };

    let loc = useLocation();

    let nav = useNavigate();

    useEffect(() => {
        if (loc.pathname.includes('academy')) {

        }
    });

    let toogleSelectStateMenuItem = (element) => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
        }
    }

    let toogleOffIfActiveMenuItem = (element) => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
    }

    let adminAcademyOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.courses));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.students));
        nav('academy');
    };

    let adminCourseOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.students));
        nav('courses');
    };

    let adminStudentsOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.academy));
        toogleOffIfActiveMenuItem(document.getElementById(idStore.admin.courses));
        nav('students');
    };

    let userAcademyOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.student.enrolledCourse));
        nav('academy');
    };

    let userEnrolledCourseOnClick = (event) => {
        toogleSelectStateMenuItem(event.currentTarget);
        toogleOffIfActiveMenuItem(document.getElementById(idStore.student.academy));
        nav('courses');
    };


    let menuItems = () => {
        if (props.admin) {
            return (
                <>
                    <span className="menu-item active" id={idStore.admin.academy} onClick={adminAcademyOnClick}><b>Academy</b></span>
                    <span className="menu-item" id={idStore.admin.courses} onClick={adminCourseOnClick}><b>Courses</b></span>
                    <span className="menu-item" id={idStore.admin.students} onClick={adminStudentsOnClick}><b>Students</b></span>
                </>
            );
        } else {
            if (props.user) {
                return (
                    <>
                        <span className="menu-item active" id={idStore.student.academy} onClick={userAcademyOnClick}><b>Academy</b></span>
                        <span className="menu-item" id={idStore.student.enrolledCourse} onClick={userEnrolledCourseOnClick}><b>EnrolledCourse</b></span>
                    </>
                );
            }
        }
    };

    return (
        <span className="menu">
            {menuItems()}
        </span>
    );
}

export default ToolbarMenu;