import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import { useNavigate } from "react-router-dom";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import { useSelector } from "react-redux";


export default function AdminAcademy(props) {
    let nav = useNavigate();

    let onAddAcademyClicked = () => {
        nav('add');
    }

    let token = useSelector((state) => { return state.userDetails.token });

    let fetchAllAcademy = async () => {
        let ctoken = token;
        let payload = await AcademyAPI.fetchAll(ctoken).then((response) => { return response.payload; });

        //returns card prop
        console.log(payload.academy);
        if (payload.academy[Symbol.iterator]) {
            console.log('is iterator ;;;;;;;;;;;;;;')
            let cardPropsData = [];
            payload.academy.forEach((academy) => {
                cardPropsData.push({
                    id: academy.instituteId,
                    url: academy.imageURL,
                    title: academy.instituteName,
                    description: academy.instituteDesc,
                    location: academy.instituteAddress,
                    rating: academy.rating,
                });
            });

            return cardPropsData;
        } else {
            return {
                id: payload.academy.instituteId,
                url: payload.academy.imageURL,
                title: payload.academy.instituteName,
                description: payload.academy.instituteDesc,
                location: payload.academy.instituteAddress,
                rating: payload.academy.rating,
            };
        }
    }

    return (
        <>
            <SearchBar academy />
            <CardContainer admin academy fetch={fetchAllAcademy} />
            <HoverButton
                id='addAcademyHoverButton'
                text='Add Academy'
                onClick={onAddAcademyClicked} />
        </>
    );
}