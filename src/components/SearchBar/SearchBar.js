import 'assets/css/search/search.css';

//------------props-----------
//academy | course | students
//----------------------------
export default function SearchBar(props) {

    let idStore = {
        academy: {
            searchInput: 'searchButton',
            placeholder: 'search academy...',
        },
        course: {
            searchInput: 'searchCourse',
            placeholder: 'search course...',
        },
        students: {
            searchInput: 'searchStudents',
            placeholder: 'search students...',
        }
    }

    let searchSetup = () => {
        if (props.academy) {
            return (
                <>
                    <input class="form-control search" type="text" placeholder={idStore.academy.placeholder} />
                    <span id={idStore.academy.searchInput} class="material-icons search-icon">search</span>
                </>
            );
        } else if (props.course) {
            return (
                <>
                    <input class="form-control search" type="text" placeholder={idStore.course.placeholder} />
                    <span id={idStore.course.searchInput} class="material-icons search-icon">search</span>
                </>
            );
        } else {
            if (props.students) {
                return (
                    <>
                        <input class="form-control search" type="text" placeholder={idStore.students.placeholder} />
                        <span id={idStore.students.searchInput} class="material-icons search-icon">search</span>
                    </>
                );
            }
        }
    }

    let viewChangers = () => {
        return (
            <>
                <span id='academyCourseCardAsList' class="material-icons list-view">view_list</span>
                <span id='academyCourseCardAsGrid' class="material-icons grid-view">grid_view</span>
            </>
        )
    }

    return (
        <div class="search-bar">
            <div class="search-container">
                {searchSetup()}
            </div>
            <div class="view-change">
                {viewChangers()}
            </div>
        </div>
    );
}