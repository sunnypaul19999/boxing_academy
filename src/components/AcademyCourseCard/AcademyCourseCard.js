import CardToolbar from './CardToolbar.js';
import CardInfoOne from './CardInfoOne.js';
import CardInfoTwo from './CardInfoTwo.js';

//--------props----------------
//id (id received from server must be passed here)
//grid | list
//admin | user & academy | course
//url (if academy pass image url)
//title & description
//duration & timing & strength & location & zipcode & rating
//-------------------------------
export default function AcademyCourseCard(props) {

    let cardProp = props.cardProp;

    let cardImage = () => {
        if (cardProp.academy) {
            return (
                <div class="display-card-image">
                    <img src={cardProp.url} alt="ss" />
                </div>
            );
        }
        return (<></>);
    }

    let toolbar = () => {
        if (cardProp.admin) {
            if (cardProp.academy) {
                return (<CardToolbar admin academy />);
            } else {
                if (cardProp.course) {
                    return (<CardToolbar admin course />);
                }
            }
        } else {
            if (cardProp.user) {
                if (cardProp.course) {
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

    let getViewClassName = () => {
        if (props.list) {
            return 'view-display-card-list';
        } else {
            return 'view-display-card-grid';
        }
    }

    return (
        <div class="col-auto">
            <div id={getFullCardId()} class={`${getViewClassName()} display-card p-2`}>
                <div class="card">
                    {cardImage()}
                    {cardBody()}
                </div>
            </div>
        </div>
    );
}