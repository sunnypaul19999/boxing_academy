import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";


export default function AdminAllCourse(props) {
    return (
        <>
            <SearchBar course />
            <CardContainer admin course />
        </>
    );
}