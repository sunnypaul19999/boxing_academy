import React, { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import CardToolbar from 'components/AcademyCourseCard/CardMakingTools/CardToolbar.js';
import CardInfoOne from 'components/AcademyCourseCard/CardMakingTools/CardInfoOne.js';
import CardInfoTwo from 'components/AcademyCourseCard/CardMakingTools/CardInfoTwo.js';
import { cardAcademyUserOnClickAction } from 'components/AcademyCourseCard/Actions/User/Card/cardUserOnClickAction';
import { cardAcademyAdminOnClickAction } from 'components/AcademyCourseCard/Actions/Admin/Card/cardAdminOnClick';
import { adminCourseEditCardEvent, adminEditCardEvent } from 'components/AcademyCourseCard/Actions/Admin/Card/cardAdminOnEdit';
import { adminAcademyDeleteCardEvent, adminCourseDeleteCardEvent } from 'components/AcademyCourseCard/Actions/Admin/Card/cardAdminOnDelete';
import { cardUserOnEnrollCourseAction } from 'components/AcademyCourseCard/Actions/User/Card/cardUserOnEnrollAction';
import { useDispatch } from 'react-redux';


//--------props--------------------------------------->
//grid | list
//admin | user & academy | course
//srsIDCount
//  ---------cardProp-------
//id (id received from server must be passed here)
//url (if academy pass image url)
//title, description, duration, timing, strength, location, cost, rating
//  --------------------------
//checkSourceTrue(id) --[id is card id]
//------------------------------------------------------>
//only toolbar depends on authoritytype


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

    if (url) {
        return (
            <div className="display-card-image">
                <img src={url} alt="" />
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
        <div className="card-body">
            <div className="details">
                <CardInfoOne
                    title={cardProp.title}
                    description={cardProp.description} />
                <CardInfoTwo
                    fullCardId={getFullCardId(authorityType, cardOf, srsIDCount)}
                    duration={cardProp.duration}
                    timing={cardProp.timing}
                    location={cardProp.location}
                    strength={cardProp.strength}
                    cost={cardProp.cost}
                    rating={cardProp.rating} />
                <CardToolbarWrapper authorityType={authorityType} cardOf={cardOf} />
            </div>
        </div>
    );
}

export default function AcademyCourseCard(props) {
    let cardProp = props.cardProp;

    let param = useParams();

    let nav = useNavigate();

    let mainStoreDispatch = useDispatch();

    let [state] = useState({
        authorityType: (props.admin) ? 'admin' : 'user',
        cardOf: (props.course) ? 'course' : 'academy',
        cardType: (props.grid) ? 'grid' : 'list',
        srsIDCount: props.srsIDCount,
        cardProp: cardProp,
    });

    let cardRef = useRef({ observer: null });

    useEffect(() => {
        let cardElement = cardRef.current;
        //if (props.observer) props.observer.observe(cardRef.current);
        installObserver();
        cardElement.addEventListener('editCardEvent', onEditCardEvent);
        cardElement.addEventListener('deleteCardEvent', onDeleteCardEvent);
        cardElement.addEventListener('enrollCardEvent', onEnrollCardEvent);


        return () => {
            cardElement.removeEventListener('editCardEvent', onEditCardEvent);
            cardElement.removeEventListener('deleteCardEvent', onDeleteCardEvent);
            cardElement.removeEventListener('enrollCardEvent', onEnrollCardEvent);
        };
    });

    let installObserver = () => {
        cardRef.current.observer = new IntersectionObserver((entries) => {
            entries.forEach(async (card) => {
                if (card.isIntersecting) {
                    //console.log(state.cardProp.id);
                    await props.checkSourceTrue(state.cardProp.id);
                }
            });
        }, {
            root: document.getElementById('cardContainer'),
            rootMargin: '0px',
            threshold: 1.0
        });

        cardRef.current.observer.observe(cardRef.current);
    }

    let getViewClassName = () => {
        if (state.cardType === 'list') {
            return 'view-display-card-list';
        }
        return 'view-display-card-grid';
    }

    let cardOnClickHandler = (event) => {
        if (state.cardOf === 'academy') {
            if (state.authorityType === 'admin') {
                cardAcademyAdminOnClickAction(event, state, nav);
            }
            if (state.authorityType === 'user') {
                cardAcademyUserOnClickAction(event, state, nav);
            }
        }
    }

    let onEditCardEvent = (event) => {
        if (state.authorityType === 'admin') {
            if (state.cardOf === 'academy') {
                adminEditCardEvent(event, state, nav);
            }
            if (state.cardOf === 'course') {
                adminCourseEditCardEvent(event, state, nav);
            }
        }

    }

    let onDeleteCardEvent = async (event) => {
        if (state.authorityType === 'admin') {
            if (state.cardOf === 'academy') {
                let response = await adminAcademyDeleteCardEvent(event, state, nav);
                if (response.payload) {
                    //console.log(state.cardProp.id);
                    mainStoreDispatch({ type: 'deleteAcademyDetail', payload: state.cardProp.id });
                }
            }
            if (state.cardOf === 'course') {
                let response = await adminCourseDeleteCardEvent(event, state, nav);
                if (response.payload) {
                    //console.log(state.cardProp.id);
                    mainStoreDispatch({ type: 'deleteCourseDetail', payload: { academyId: param.academyId, cardPropId: state.cardProp.id } });
                }
            }
        }
    }

    let onEnrollCardEvent = (event) => {
        if (state.authorityType === 'user') {
            cardUserOnEnrollCourseAction(event, state, nav);
        }
    }

    let columnClass = () => {
        if (state.cardType === 'list') {
            return 'col-12 col-md-10';
        }

        //when grid
        return 'col-auto';
    }

    return (
        <div className={columnClass()}>
            <div
                id={getFullCardId(state.authorityType, state.cardOf, state.srsIDCount)}
                className={`${getViewClassName()} display-card p-2`}>
                <div
                    ref={cardRef}
                    className="card"
                    onClick={cardOnClickHandler}>
                    <CardImage url={state.cardProp.url} />
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