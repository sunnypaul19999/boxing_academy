import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";


import SearchBar from "components/SearchBar/SearchBar.js";
import CardContainer from "components/AcademyCourseCard/CardContainer.js";
import HoverButton from 'components/AcademyCourseCard/CardMakingTools/HoverButton.js';
import CourseAPI from "server/CourseAPI/CourseAPI";
import EnrolledCourseAPI from "server/EnrolledCourseAPI/EnrolledCourseAPI";
import Database from "database/Database";

function cardPropFormat(course, { toolbarConfig, breadCrumb }) {
    let propFormat = {
        id: course.courseId,
        title: course.courseName,
        description: course.courseDesc,
        duration: `${course.courseDuration} days`,
        cost: course.courseCost,
        timing: course.courseTimings,
        rating: course.rating,
        toolbarConfig: toolbarConfig,
    };

    if (breadCrumb) {
        propFormat.breadCrumb = breadCrumb;
    }

    return propFormat;
}

/*
admin
user
allCourses
allEnrolledCourse
*/

export default function CourseView(props) {

    let nav = useNavigate();

    let param = useParams();

    let mainStoreDispatch = useDispatch();

    let getAcademyId = () => { return param.academyId; }

    let onAddCourseClicked = () => {
        nav('add');
    }

    let fetchAllCourse = async () => {
        let cardPropsData = [];
        let payload;
        if (props.allCourses) {
            payload = await CourseAPI.fetchAll().then((response) => { console.log(response.payload); return response.payload; });
        } else {
            payload = await CourseAPI.fetchByAcadmeyId(getAcademyId()).then((response) => { return response.payload; });
        }

        let isEnrolled = async (courseId) => {
            let userId = await Database.getUserId();
            return EnrolledCourseAPI.getEnrollmentStatus(userId, courseId).then((res) => { return res.payload; });
        }
        //console.log(getAcademyId());
        let toolbarConfig;
        if (payload.course[Symbol.iterator]) {

            for (const course of payload.course) {
                toolbarConfig = null;
                if (await isEnrolled(course.courseId)) { toolbarConfig = { disable: { button: { enroll: true } } } }

                if (props.admin) { 
                    
                }
                cardPropsData.push(cardPropFormat(course, {
                    toolbarConfig: toolbarConfig,
                    breadCrumb: {
                        crumb: course.institute.instituteName,
                        onClick: () => { nav(`admin/academy/${course.institute.instituteId}`); }
                    }
                }));
            }

            return cardPropsData;
        } else {
            let course = payload.course;

            if (props.allEnrolledCourse) {
                if (await isEnrolled(course.courseId)) { toolbarConfig = { disable: { button: { enroll: true } } } }
            }

            cardPropsData.push(cardPropFormat(course), {
                toolbarConfig: toolbarConfig,
                breadCrumb: { onClick: () => { nav(`admin/academy/${course.institute.instituteId}`); } }
            });
        }

        return cardPropsData;
    }

    let fetchAllEnrolledCourse = async () => {
        let cardPropsData = [];
        let payload = await EnrolledCourseAPI.fetchByUserId(await Database.getUserId()).then((response) => { return response.payload; });

        if (payload.course[Symbol.iterator]) {

            payload.course.forEach((details) => {
                console.log(details);
                let courseDetails = details.course;

                cardPropsData.push(cardPropFormat(courseDetails));
            });

            return cardPropsData;
        } else {
            cardPropsData.push(cardPropFormat(payload.course.course));
        }

        return cardPropsData;
    }

    let checkSourceTrue = async (id) => {
        try {
            await CourseAPI.fetchById(id)
        } catch (err) {
            if (err.statusCode === 404) {
                console.log(id);
                mainStoreDispatch({ type: 'deleteCourseDetail', payload: id });
            }
        }
    }

    let getView = () => {
        if (props.admin) {
            if (props.allCourses) {
                return (
                    <CardContainer admin course fetch={fetchAllCourse} checkSourceTrue={checkSourceTrue} />
                );
            }
            return (
                <>
                    <CardContainer admin course fetch={fetchAllCourse} checkSourceTrue={checkSourceTrue} />
                    <HoverButton
                        id='addCourseHoverButton'
                        text='Add Course'
                        onClick={onAddCourseClicked} />
                </>
            );
        } else {
            if (props.allEnrolledCourse) {
                return (<CardContainer user course={{ type: { allEnrolledCourse: true } }} fetch={fetchAllEnrolledCourse} checkSourceTrue={() => { return true; }} />);
            } else {
                return (<CardContainer user course fetch={fetchAllCourse} checkSourceTrue={checkSourceTrue} />);
            }
        }
    }

    return (
        <>
            <SearchBar course />
            {getView()}
        </>
    );
}