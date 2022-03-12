import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CardToolbar from 'components/AcademyCourseCard/CardMakingTools/CardToolbar.js';
import CardInfoOne from 'components/AcademyCourseCard/CardMakingTools/CardInfoOne.js';
import CardInfoTwo from 'components/AcademyCourseCard/CardMakingTools/CardInfoTwo.js';
import { cardUserOnClickAction } from 'components/AcademyCourseCard/Actions/User/Card/cardUserOnClickAction';
import { cardAdminOnClickAction } from 'components/AcademyCourseCard/Actions/Admin/Card/cardAdminOnClick';
import { adminEditCardEvent } from './Actions/Admin/Card/cardAdminOnEdit';
import { adminDeleteCardEvent } from './Actions/Admin/Card/cardAdminOnDelete';


//--------props--------------------------------------->
//grid | list
//admin | user & academy | course
//srsIDCount
//  ---------cardProp-------
//id (id received from server must be passed here)
//url (if academy pass image url)
//title, description, duration, timing, strength, location, zipcode, rating
//  --------------------------
//------------------------------------------------------>

let getFullCardId = (authorityType, cardOf, srsIDCount) => {
    if (authorityType === 'admin') {
        if (cardOf === 'academy') {
            return `adminAcademyGrid${srsIDCount}`;
        }
        if (cardOf === 'course') {
            return `courseGrid${srsIDCount}`;
        }
    } else {
        if (authorityType === 'user') {
            if (cardOf === 'academy') {
                return `userAcademyGrid${srsIDCount}`;
            }
            if (cardOf === 'course') {
                return `userCourseGrid${srsIDCount}`;
            }
        }
    }
}

function CardToolbarWrapper(props) {
    let authorityType = props.authorityType;
    let cardOf = props.cardOf;
    return <CardToolbar authorityType={authorityType} cardOf={cardOf} />
}

function CardImage(props) {
    let url = props.url;
    let cardOf = props.cardOf;

    if (cardOf === 'academy') {
        return (
            <div class="display-card-image">
                <img src={url} alt="ss" />
            </div>
        );
    }
    return (<></>);
}

function CardBody(props) {
    let authorityType = props.authorityType;//admin or user
    let cardOf = props.cardOf;//academy or course
    let srsIDCount = props.srsIDCount;//integer count
    let cardProp = props.cardProp;//card details

    return (
        <div class="card-body">
            <div class="details">
                <CardInfoOne
                    title={cardProp.title}
                    description={cardProp.description} />
                <CardInfoTwo
                    fullCardId={getFullCardId(authorityType, cardOf, srsIDCount)}
                    duration={cardProp.duration}
                    timing={cardProp.timing}
                    location={cardProp.location}
                    strength={cardProp.strength}
                    zipcode={cardProp.zipcode}
                    rating={cardProp.rating} />
                <CardToolbarWrapper authorityType={authorityType} cardOf={cardOf} />
            </div>
        </div>
    );
}

export default function AcademyCourseCard(props) {
    let cardProp = props.cardProp;
    let nav = useNavigate();


    let [state] = useState({
        authorityType: (props.admin) ? 'admin' : 'user',
        cardOf: (props.academy) ? 'academy' : 'course',
        cardType: (props.list) ? 'list' : 'grid',
        srsIDCount: props.srsIDCount,
        cardProp: cardProp,
    });

    let cardRef = useRef(null);

    useEffect(() => {
        let cardElement = cardRef.current;
        cardElement.addEventListener('editCardEvent', onEditCardEvent);
        cardElement.addEventListener('deleteCardEvent', onDeleteCardEvent);
        cardElement.addEventListener('enrollCardEvent', onEnrollCardEvent);

        return () => {
            cardElement.removeEventListener('editCardEvent', onEditCardEvent);
            cardElement.removeEventListener('deleteCardEvent', onDeleteCardEvent);
            cardElement.removeEventListener('enrollCardEvent', onEnrollCardEvent);
        };
    });

    let getViewClassName = () => {
        if (state.cardType === 'list') {
            return 'view-display-card-list';
        }
        return 'view-display-card-grid';
    }

    let cardOnClickHandler = (event) => {
        if (state.cardOf === 'academy') {
            if (state.authorityType === 'admin') {
                cardAdminOnClickAction(event, state, nav);
            }
            if (state.authorityType === 'user') {
                cardUserOnClickAction(event, state, nav);
            }
        }
    }

    let onEditCardEvent = (event) => {
        if (state.authorityType === 'admin') {
            adminEditCardEvent(event, state, nav);
        }
    }

    let onDeleteCardEvent = (event) => {
        if (state.authorityType === 'admin') {
            adminDeleteCardEvent(event, state, nav);
        }
    }

    let onEnrollCardEvent = (event) => {
        if (state.authorityType === 'user') {

        }
    }

    let columnClass = () => {
        if (state.cardType === 'list') {
            return 'col-12 col-md-10';
        }

        //when grid
        return 'col';
    }

    return (
        <div class={columnClass()}>
            <div
                id={getFullCardId(state.authorityType, state.cardOf, state.srsIDCount)}
                class={`${getViewClassName()} display-card p-2`}>
                <div
                    ref={cardRef}
                    class="card"
                    onClick={cardOnClickHandler}>
                    <CardImage url={state.cardProp.url} cardOf={state.cardOf} />
                    <CardBody
                        authorityType={state.authorityType}
                        cardOf={state.cardOf}
                        srsIDCount={state.srsIDCount}
                        cardProp={state.cardProp} />
                </div>
            </div>
        </div>
    );
}