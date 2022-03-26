import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import { useNavigate } from "react-router-dom";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverURL } from "config/serverConfig";
import MainStore from "store/Main/MainStore";
import Database from "database/Database";

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

    let mainStoreDispatch = useDispatch();

    let lastInstituteId = () => {
        let aList = MainStore.store.getState().academyDetails;
        //console.log(aList);
        if (aList) {
            if (aList[aList.length - 1]) {
                return aList[aList.length - 1].id;
            }
        }
        return null;
    }

    let getNext = async (lId) => {
        //let token = await Database.getToken();
        if (lId) {
            try {

                /*let serverResponse = await axios.get(`${serverURL}/institute/${lId + 1}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                let nextAcademy = serverResponse.data;*/
                let nextAcademy = await AcademyAPI.fetchById(lId + 1).then((res) => { return res.payload.data; });
                let cardProp = cardPropFormat(nextAcademy);
                console.log(cardProp.id);
                mainStoreDispatch({ type: 'addIntoAcademyDetails', payload: cardProp });
            } catch (err) { }
        }
        setTimeout(() => {
            let lId = lastInstituteId();
            if (lId) {
                getNext(lId);
            }
        }, 10000);
    };
    getNext(lastInstituteId());

    return props.children;
}

export default function AdminAcademy(props) {
    let nav = useNavigate();

    let mainStoreDispatch = useDispatch();

    let onAddAcademyClicked = () => {
        nav('add');
    }

    let fetchAllAcademy = async () => {
        let cardPropsData = [];
        let payload = await AcademyAPI.fetchAll().then((response) => { return response.payload; });

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

    let checkSourceTrue = async (id) => {
        let token = await Database.getToken();
        let createfetchAcademyWithIdReq = (id) => {
            return axios.get(`${serverURL}/institute/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        try {
            await createfetchAcademyWithIdReq(id);
        } catch (err) {
            if (err['response'].status === 404) {
                console.log(id);
                mainStoreDispatch({ type: 'deleteAcademyDetail', payload: id });
            }
        }
    }

    return (
        <>
            <SearchBar academy />
            <RealTimeFetchWrapper>
                <CardContainer admin academy fetch={fetchAllAcademy} checkSourceTrue={checkSourceTrue} />
                <HoverButton
                    id='addAcademyHoverButton'
                    text='Add Academy'
                    onClick={onAddAcademyClicked} />
            </RealTimeFetchWrapper>
        </>
    );
}