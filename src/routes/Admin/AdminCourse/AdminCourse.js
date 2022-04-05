import { useNavigate, useParams } from "react-router-dom";
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

    let param = useParams();

    let mainStoreDispatch = useDispatch();

    let getAcademyId = () => { return param.academyId; }

    let onAddCourseClicked = () => {
        nav('add');
    }

    let fetchAllCourse = async () => {
        let cardPropsData = [];
        let payload = await CourseAPI.fetchById(getAcademyId()).then((response) => { return response.payload; });

        if (payload.course[Symbol.iterator]) {

            payload.course.forEach((course) => {
                cardPropsData.push(cardPropFormat(course));
            });

            return cardPropsData;
        } else {
            cardPropsData.push(cardPropFormat(payload.course));
        }

        return cardPropsData;
    }

    let checkSourceTrue = async (id) => {
        try {
            await CourseAPI.fetchById(id)
        } catch (err) {
            if (err['response'].status === 404) {
                console.log(id);
                mainStoreDispatch({ type: 'deleteCourseDetail', payload: id });
            }
        }
    }

    return (
        <>
            <SearchBar course />
            <CardContainer admin course fetch={fetchAllCourse} checkSourceTrue={checkSourceTrue} />
            <HoverButton
                id='addCourseHoverButton'
                text='Add Course'
                onClick={onAddCourseClicked} />
        </>
    );
}