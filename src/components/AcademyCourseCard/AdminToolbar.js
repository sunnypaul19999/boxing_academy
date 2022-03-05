//props: academy | course
export default function AdminToolbar(props) {
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
    };

    let getButtons = () => {
        let editButtonId = (props.academy) ? idStore.admin.academy.edit : idStore.admin.course.edit;
        let delButtonId = (props.academy) ? idStore.admin.academy.delete : idStore.admin.course.delete;
        return (
            <>
                <span class="toolbar-item one">
                    <button id={editButtonId} type="button" class="btn btn-primary">Edit</button>
                </span>
                <span class="toolbar-item two">
                    <button id={delButtonId} type="button" class="btn btn-primary">Delete</button>
                </span>
            </>
        )
    };

    return (
        <section class="sec three">
            <div class="level one">
                {getButtons()}
            </div>
        </section>
    );
}