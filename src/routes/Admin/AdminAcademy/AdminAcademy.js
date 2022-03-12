import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import { useNavigate } from "react-router-dom";


export default function AdminAcademy(props) {
    let nav = useNavigate();

    let onAddAcademyClicked = () => {
        nav('add');
    }

    return (
        <>
            <SearchBar academy />
            <CardContainer admin academy />
            <HoverButton
                id='addAcademyHoverButton'
                text='Add Academy'
                onClick={onAddAcademyClicked} />
        </>
    );
}