import { useEffect, useState } from 'react';

import GridAcademyCourseCard from './GridAcademyCourseCard';
import ListAcademyCourseCard from './ListAcademyCourseCard';

import 'assets/css/card-container/card-container.css';


//-----------props----------
//admin | user & academy | course
//cardProps (card properties mentioned in AcademyCourseCard)
//--------------------------

//card container fetches data
function fetch() {
    return [
        {
            id: '1',
            url: 'https://img-b.udemycdn.com/course/480x270/3274392_be32_2.jpg',
            title: 'Boxing Training Course, Complete Workout Set',
            description: `Learn boxing from beginner to pro. Learn throw punch like pro boxer, get best body shape ever with raw boxing.`,
            duration: '6 months',
            timing: '7am - 9am',
            strength: '303',
            location: 'Bangalore',
            zipcode: '621305',
            rating: '4',
        },
        {
            id: '2',
            url: 'https://img-b.udemycdn.com/course/480x270/3902270_9850_5.jpg',
            title: 'Solo Boxing Programme - For Fitness/Self-Defence',
            description: `Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2,
                        Thymeleaf, JPA & Hibernate`,
            duration: '3 months',
            timing: '6pm - 8pm',
            strength: '103',
            location: 'Kolkata',
            zipcode: '721305',
            rating: '3',
        },
        {
            id: '3',
            url: 'https://img-c.udemycdn.com/course/480x270/901086_8c5e.jpg',
            title: 'Boxing Masterclass - Boxing Foundation',
            description: `Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, build real projects`,
            duration: '1 year',
            timing: '6pm - 8pm',
            strength: '103',
            location: 'Chennai',
            zipcode: '721305',
            rating: '3',
        },
        {
            id: '4',
            url: 'https://img-c.udemycdn.com/course/480x270/1678698_cb56_4.jpg',
            title: 'Ultimate Boxing Training: Professional Boxing Techniques',
            description: `Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, build real projects`,
            duration: '1 year',
            timing: '10am - 12am',
            strength: '103',
            location: 'Delhi',
            zipcode: '721305',
            rating: '3',
        },
        {
            id: '5',
            url: 'https://img-c.udemycdn.com/course/480x270/2323508_0852.jpg',
            title: 'Boxing For Self Defense Fitness and Martial Arts',
            description: `Learn how to punch for self defense fitness and competition`,
            duration: '1 year',
            timing: '6pm - 8pm',
            strength: '45',
            location: 'Lucknow',
            zipcode: '721305',
            rating: '3',
        },
    ];
}
export default function CardContainer(props) {
    let cardProps = fetch();

    let [state, setState] = useState({ viewType: 'list' });

    let onGridViewChangeClick = () => {
        console.log('grid view clicked');
        setState({ viewType: 'grid' });
    }

    let onListViewChangeClick = () => {
        console.log('list view clicked');
        setState({ viewType: 'list' });
    }

    useEffect(() => {
        let gridViewChangeButton = document.getElementById('academyCourseCardAsGrid');
        let listViewChangeButton = document.getElementById('academyCourseCardAsList');
        gridViewChangeButton.addEventListener('click', onGridViewChangeClick);
        listViewChangeButton.addEventListener('click', onListViewChangeClick);
        return () => {
            gridViewChangeButton.removeEventListener('click', onGridViewChangeClick);
            listViewChangeButton.removeEventListener('click', onListViewChangeClick);
        };
    });

    let getCards = () => {
        let cards = [];
        let srsIDCount = 1;

        if (state.viewType === 'grid') {
            for (const cardProp of cardProps) {
                cards.push(
                    <GridAcademyCourseCard
                        {...props}
                        key={`displayCard_grid_${Math.random() * 10}`}
                        srsIDCount={srsIDCount++}
                        cardProp={cardProp} />);
            }
        } else {
            for (const cardProp of cardProps) {
                cards.push(
                    <ListAcademyCourseCard
                        {...props}
                        key={`displayCard_list_${Math.random() * 10}`}
                        srsIDCount={srsIDCount++}
                        cardProp={cardProp} />);
            }
        }
        return cards;
    };


    return (
        <div class="row row-col-5 justify-content-center card-container">
            {getCards()}
            <div class="extra-scroll"></div>
        </div>
    );
}