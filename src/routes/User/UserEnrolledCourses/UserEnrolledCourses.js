import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";


export default function UserEnrolledCourses(props) {

    return (
        <>
            <SearchBar course />
            <CardContainer user course />
        </>
    );
}