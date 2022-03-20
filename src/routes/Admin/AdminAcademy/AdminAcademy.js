import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import { useNavigate } from "react-router-dom";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "config/serverConfig";
import MainStore from "store/Main/MainStore";

function cardPropFormat(academy) {
    return {
        id: academy.instituteId,
        url: academy.imageURL,
        title: academy.instituteName,
        description: academy.instituteDesc,
        location: academy.instituteAddress,
        rating: academy.rating,
    };
}


function RealTimeFetchWrapper(props) {
    let token = useSelector((state) => { return state.userDetails.token });
    let mainStoreDispatch = useDispatch();

    let lastInstituteId = () => {
        let aList = MainStore.store.getState().academyDetails;
        console.log(aList);
        if (aList) {
            let lId = aList[aList.length - 1].id;
            getNext(lId);
        }
        return null;
    }

    let getNext = async (lId) => {
        if (lId) {
            try {

                let serverResponse = await axios.get(`${serverURL}/institute/${lId + 1}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                let nextAcademy = serverResponse.data;
                let cardProp = cardPropFormat(nextAcademy);
                console.log(cardProp.id);
                mainStoreDispatch({ type: 'addIntoAcademyDetails', payload: cardProp });
                //console.log(cardProp);
            } catch (err) {
                //on error do nothing
            }
        }
        setTimeout(() => {
            let lId = lastInstituteId();
            if (lId) {
                getNext(lId);
            }
        }, 30000);
    };

    getNext(lastInstituteId());

    return props.children;
}

export default function AdminAcademy(props) {
    let nav = useNavigate();

    let onAddAcademyClicked = () => {
        nav('add');
    }

    let token = useSelector((state) => { return state.userDetails.token });

    let fetchAllAcademy = async () => {
        let ctoken = token;
        let cardPropsData = [];
        let payload = await AcademyAPI.fetchAll(ctoken).then((response) => { return response.payload; });

        if (payload.academy[Symbol.iterator]) {

            payload.academy.forEach((academy) => {
                cardPropsData.push(cardPropFormat(academy));
            });

            return cardPropsData;
        } else {
            cardPropsData.push(cardPropFormat(payload.academy));
        }

        return cardPropsData;
    }


    return (
        <>
            <SearchBar academy />
            <RealTimeFetchWrapper>
                <CardContainer admin academy fetch={fetchAllAcademy} />
                <HoverButton
                    id='addAcademyHoverButton'
                    text='Add Academy'
                    onClick={onAddAcademyClicked} />
            </RealTimeFetchWrapper>
        </>
    );
}