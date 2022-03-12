import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";


export default function UserAcademy(props) {

    return (
        <>
            <SearchBar academy />
            <CardContainer user academy />
        </>
    );
}