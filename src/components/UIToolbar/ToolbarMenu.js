//props: admin | user
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

    let menuItems = () => {
        if (props.admin) {
            return (
                <>
                    <span class="menu-item" id={idStore.admin.academy}><b>Academy</b></span>
                    <span class="menu-item" id={idStore.admin.courses}><b>Courses</b></span>
                    <span class="menu-item" id={idStore.admin.students}><b>Students</b></span>
                </>
            );
        } else {
            if (props.user) {
                return (
                    <>
                        <span class="menu-item" id={idStore.student.academy}><b>Academy</b></span>
                        <span class="menu-item" id={idStore.student.enrolledCourse}><b>EnrolledCourse</b></span>
                    </>
                );
            }
        }
    };

    return (
        <span class="menu">
            {menuItems()}
        </span>
    );
}

export default ToolbarMenu;