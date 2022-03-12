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
//  ---------cardProp-------
//id (id received from server must be passed here)
//url (if academy pass image url)
//title, description, duration, timing, strength, location, zipcode, rating
//  --------------------------
//------------------------------------------------------>

export default function AcademyCourseCard(props) {
    let cardProp = props.cardProp;

    let nav = useNavigate();

    let [state] = useState({ cardProp: cardProp });

    let cardRef = useRef(null);

    useEffect(() => {
        let cardElement = cardRef.current;
        cardElement.addEventListener('editCardEvent', onEditCardEvent);
        cardElement.addEventListener('deleteCardEvent', onDeleteCardEvent);

        return () => {
            cardElement.removeEventListener('editCardEvent', onEditCardEvent);
            cardElement.removeEventListener('deleteCardEvent', onDeleteCardEvent);
        };
    })

    let cardImage = () => {
        //let cardProp = props.state.cardProp;

        if (props.academy) {
            return (
                <div class="display-card-image">
                    <img src={cardProp.url} alt="ss" />
                </div>
            );
        }
        return (<></>);
    }

    let toolbar = () => {
        if (props.admin) {
            if (props.academy) {
                return (<CardToolbar admin academy />);
            }
            if (props.course) {
                return (<CardToolbar admin course />);
            }
        } else {
            if (props.user) {
                if (props.course) {
                    return (<CardToolbar user course />);
                }
            }
        }
    }

    let cardBody = () => {
        return (
            <div class="card-body">
                <div class="details">
                    <CardInfoOne
                        title={cardProp.title}
                        description={cardProp.description} />
                    <CardInfoTwo
                        fullCardId={getFullCardId()}
                        duration={cardProp.duration}
                        timing={cardProp.timing}
                        location={cardProp.location}
                        strength={cardProp.strength}
                        zipcode={cardProp.zipcode}
                        rating={cardProp.rating} />
                    {toolbar()}
                </div>
            </div>
        );
    }

    let getFullCardId = () => {
        if (props.admin) {
            if (props.academy) {
                return `adminAcademyGrid${props.srsIDCount}`;
            }
            if (props.course) {
                return `courseGrid${props.srsIDCount}`;
            }
        } else {
            if (props.user) {
                if (props.academy) {
                    return `userAcademyGrid${props.srsIDCount}`;
                }
                if (props.course) {
                    return `userCourseGrid${props.srsIDCount}`;
                }
            }
        }
    }

    let getViewClassName = () => {
        if (props.list) {
            return 'view-display-card-list';
        }
        return 'view-display-card-grid';
    }

    let cardOnClickHandler = (event) => {
        if (props.academy) {
            if (props.admin) {
                cardAdminOnClickAction(event, state, nav);
            }
            if (props.user) {
                cardUserOnClickAction(event, state, nav);
            }
        }
    }

    let onEditCardEvent = (event) => {
        if (props.admin) {
            adminEditCardEvent(event, state, nav);
        }
    }

    let onDeleteCardEvent = (event) => {
        if (props.admin) {
            adminDeleteCardEvent(event, state, nav);
        }
    }

    return (
        <div class="col-auto">
            <div id={getFullCardId()} class={`${getViewClassName()} display-card p-2`}>
                <div ref={cardRef} class="card" onClick={cardOnClickHandler}>
                    {cardImage()}
                    {cardBody()}
                </div>
            </div>
        </div>
    );
}