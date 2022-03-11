import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';


export default function AdminCourse(props) {
    return (
        <>
            <SearchBar course />
            <CardContainer admin course />
            <HoverButton id='addCourseHoverButton' text='Add Course' />
        </>
    );
}