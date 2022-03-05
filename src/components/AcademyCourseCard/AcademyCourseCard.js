import AdminToolbar from './AdminToolbar.js';
import CardInfoOne from './CardInfoOne.js';
import CardInfoTwo from './CardInfoTwo.js';



import 'assets/css/card/grid-card-display-details.css';
//--------props----------------
//id (id received from server must be passed here)
//admin | user & academy | course
//url (if academy pass image url)
//title & description
//duration & timing & strength & location & zipcode & rating
//-------------------------------
export default function AcademyCourseCard(props) {

    let cardProp = props.cardProp;

    let cardImage = () => {
        if (cardProp.academy) {
            console.log('card image')
            /*return (
                <div class="display-card-image">
                    <img src={cardProp.url} alt="ss" />
                </div>
            );*/
        }
        return (<></>);
    }

    let toolbar = () => {
        if (cardProp.admin) {
            if (cardProp.academy) {
                return (<AdminToolbar academy />);
            } else {
                if (cardProp.course) {
                    return (<AdminToolbar course />);
                }
            }
        } else {
            return (<></>);
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
                        duration='3 months'
                        timing='6pm -8pm'
                        location='Hyderabad'
                        strength='103'
                        zipcode='721305'
                        rating={cardProp.rating} />
                    {toolbar()}
                </div>
            </div>
        );
    }

    let getFullCardId = () => {
        if (cardProp.admin) {
            if (cardProp.academy) {
                return `adminAcademyGrid${cardProp.id}`;
            } else {
                if (cardProp.course) {
                    return `courseGrid${cardProp.id}`;
                }
            }
        } else {
            if (cardProp.user) {
                if (cardProp.academy) {
                    return `userAcademyGrid${cardProp.id}`;
                } else {
                    if (cardProp.course) {
                        return `userCourseGrid${cardProp.id}`;
                    }
                }
            }
        }
    }

    return (
        <div id={getFullCardId()} class="display-card p-2">
            <div class="card">
                {<div class="display-card-image">
                    <img src={cardProp.url} alt="ss" />
                </div>}
                {cardBody()}
            </div>
        </div>
    );
}