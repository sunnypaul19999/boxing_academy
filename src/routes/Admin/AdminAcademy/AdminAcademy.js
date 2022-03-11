import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';


export default function AdminAcademy(props) {
    return (
        <>
            <SearchBar academy />
            <CardContainer admin academy />
            <HoverButton id='addAcademyHoverButton' text='Add Academy' />
        </>
    );
}