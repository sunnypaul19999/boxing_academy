import { editCard, deleteCard } from "components/AcademyCourseCard/Actions/Admin/Toolbar/cardToolbarAdminAction";

//props: cardOf(academy | course)
//authorityType: admin | course
export default function CardToolbar(props) {
    let idStore = {
        admin: {
            academy: {
                edit: 'editAcademy',
                delete: 'deleteAcademy',
            },
            course: {
                edit: 'editCourse',
                delete: 'deleteCourse',
            },
        },
        user: {
            course: {
                enroll: 'enrollCourse',
            }
        }
    };


    let adminButtons = () => {
        let editButtonId = (props.cardOf === 'academy') ? idStore.admin.academy.edit : idStore.admin.course.edit;
        let delButtonId = (props.cardOf === 'academy') ? idStore.admin.academy.delete : idStore.admin.course.delete;
        return (
            <>
                <span class="toolbar-item one">
                    <button
                        id={editButtonId}
                        type="button"
                        class="btn btn-primary"
                        onClick={(event) => { editCard(event) }}>Edit</button>
                </span>
                <span class="toolbar-item two">
                    <button
                        id={delButtonId}
                        type="button"
                        class="btn btn-primary"
                        onClick={(event) => { deleteCard(event) }}>Delete</button>
                </span>
            </>
        );
    };

    let userCourseEnrollButton = () => {
        return (
            <span class="toolbar-item one">
                <button
                    id={idStore.user.course.enroll}
                    type="button"
                    class="btn btn-primary">Enroll Course
                </button>
            </span>
        );
    };

    let getButtons = () => {
        if (props.authorityType === 'admin') {
            return adminButtons();
        } else if (props.authorityType === 'user') {
            if (props.cardOf === 'course') {
                return userCourseEnrollButton();
            }
        } else {
            return (<></>);
        }
    };

    return (
        <section class="sec three">
            <div class="level one">
                {getButtons()}
            </div>
        </section>
    );
}