import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";



export default function UserCourse(props) {

    return (
        <>
            <SearchBar course />
            <CardContainer user course />
        </>
    );
}