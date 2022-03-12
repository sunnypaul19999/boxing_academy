import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import { useNavigate } from "react-router-dom";


export default function AdminCourse(props) {

    let nav = useNavigate();

    let onAddCourseClicked = () => {
        nav('add');
    }

    return (
        <>
            <SearchBar course />
            <CardContainer admin course />
            <HoverButton
                id='addCourseHoverButton'
                text='Add Course'
                onClick={onAddCourseClicked} />
        </>
    );
}