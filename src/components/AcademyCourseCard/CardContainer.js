import GridAcademyCourseCard from './GridAcademyCourseCard';
import ListAcademyCourseCard from './ListAcademyCourseCard';

import 'assets/css/card-container/card-container.css';
import AcademyCourseCard from './AcademyCourseCard';

//-----------props----------
//grid | list
//cardProps (card properties mentioned in AcademyCourseCard)
//--------------------------
export default function CardContainer(props) {
    /*let getCards = () => {
        let cards = [];

        if (props.grid) {

            for (const cardProp of props.cardProps) {
                //console.log(cardProp);
                cards.push(
                    <GridAcademyCourseCard
                        key={`academy${cardProp.id}`}
                        cardProp={cardProp} />);
            }
        } else {
            if (props.list) {
                for (const cardProp of props.cardProps) {
                    cards.push(
                        <ListAcademyCourseCard
                            key={`course${cardProp.id}`}
                            cardProp={cardProp} />);
                }
            }
        }
        console.log('cards');
        console.log(cards);
    };*/

    let cardProp = {
        id: '1',
        admin: true,
        academy: true,
        url: 'https://images.indianexpress.com/2020/06/the-matrix-759.jpg',
        title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
        description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                      Thymeleaf, JPA & Hibernate`,
        duration: '3 months',
        timing: '6pm - 8pm',
        strength: '103',
        location: 'Hyderabad',
        zipcode: '721305',
        rating: '3',
    };

    return (
        <div class="card-container">
            <AcademyCourseCard cardProp={cardProp} />
        </div>
    );
}