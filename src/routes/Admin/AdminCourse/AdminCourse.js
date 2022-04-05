import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import CourseAPI from "server/CourseAPI/CourseAPI";

function cardPropFormat(course) {
    return {
        id: course.courseId,
        title: course.courseName,
        description: course.courseDesc,
        duration: course.courseDuration,
        cost: course.courseCost,
        timing: course.courseTimings,
        rating: course.rating,
    };
}



export default function AdminCourse(props) {

    let nav = useNavigate();

    let mainStoreDispatch = useDispatch();

    let onAddCourseClicked = () => {
        nav('add');
    }

    let fetchAllAcademy = async () => {
        let cardPropsData = [];
        let payload = await CourseAPI.fetchAll().then((response) => { return response.payload; });

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
            await CourseAPI.fetchById(id)
        } catch (err) {
            if (err['response'].status === 404) {
                console.log(id);
                mainStoreDispatch({ type: 'deleteAcademyDetail', payload: id });
            }
        }
    }

    return (
        <>
            <SearchBar course />
            <CardContainer admin course />
            <HoverButton
                id='addCourseHoverButton'
                text='Add Course'
                onClick={onAddCourseClicked} />
        </>
    );
}