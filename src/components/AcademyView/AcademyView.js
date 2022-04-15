import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import { useNavigate } from "react-router-dom";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import { useDispatch } from "react-redux";
import MainStore from "store/Main/MainStore";

function cardPropFormat(academy) {
    return {
        id: academy.instituteId,
        url: academy.imageURL,
        title: academy.instituteName,
        description: academy.instituteDesc,
        location: academy.instituteAddress,
        strength: academy.instituteEmail,
        rating: academy.rating,
    };
}

function RealTimeAcademyFetchWrapper(props) {

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
        if (lId) {
            try {
                let nextAcademy = await AcademyAPI.fetchById(lId + 1).then((res) => { return res.payload.data; });
                let cardProp = cardPropFormat(nextAcademy);
                //console.log(cardProp.id);
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
    //getNext(lastInstituteId());

    return props.children;
}

export default function AcademyView(props) {
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
        try {
            await AcademyAPI.fetchById(id)
        } catch (err) {
            if (err['response'].status === 404) {
                console.log(id);
                mainStoreDispatch({ type: 'deleteAcademyDetail', payload: id });
            }
        }
    }

    let getView = () => {
        if (props.admin) {
            return (
                <>
                    <CardContainer admin academy fetch={fetchAllAcademy} checkSourceTrue={checkSourceTrue} />
                    <HoverButton
                        id='addAcademyHoverButton'
                        text='Add Academy'
                        onClick={onAddAcademyClicked} />
                </>
            );
        } else {
            return (
                <CardContainer user academy fetch={fetchAllAcademy} checkSourceTrue={checkSourceTrue} />
            );
        }
    }

    let onSearch = (searchElement) => {
        console.log(searchElement.value);
    }

    return (
        <>
            <SearchBar academy onSearch={onSearch} />
            <RealTimeAcademyFetchWrapper>
                {getView()}
            </RealTimeAcademyFetchWrapper>
        </>
    );
}