import Database from "database/Database";
import { toast } from "react-toastify";

import EnrolledCourseAPI from "server/EnrolledCourseAPI/EnrolledCourseAPI.js";

export async function cardUserOnEnrollCourseAction(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();

    let cardProp = state.cardProp;

    try {
        let courseId = cardProp.id;
        let enrollmentStatus = await EnrolledCourseAPI.getEnrollmentStatus(await Database.getUserId(), courseId);
        nav(`${courseId}/enroll`, { state: { email: await Database.getCurrUserEmail(), isEnrolled: enrollmentStatus } });
    } catch (err) {
        toast('Try again later');
    }

}