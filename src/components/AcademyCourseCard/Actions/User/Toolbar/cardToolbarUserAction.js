export function userViewCourses(event, nav) {
    event.preventDefault();
    event.stopPropagation();
    //TODO: navigation to academy of a course
    nav('1/courses');
}

export function userEnrollCourse(event, nav) {
    event.preventDefault();
    event.stopPropagation();
    //TODO: send erollment to server here
}

