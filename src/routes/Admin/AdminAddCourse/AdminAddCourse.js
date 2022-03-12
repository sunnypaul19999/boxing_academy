import AcademyCourseDetailsForm from "components/Forms/LayoutTwo/AcademyCourseDetailsForm";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";


export default function AdminAddCourse(props) {

    let formInputFormat = (type) => {
        return (academyCourseDetailsFormFormat.course.add.input[type]);
    }

    let formButtonFormat = (type) => {
        return (academyCourseDetailsFormFormat.course.add.button[type]);
    }

    let onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('AdminAddCourse submitted');
    }

    return (
        <AcademyCourseDetailsForm
            submitButton={
                {
                    ...formButtonFormat('add_course'),
                    onSubmit: onFormSubmit,
                }}>
            <input {...formInputFormat('course_name')} />
            <input {...formInputFormat('course_duration')} />
            <input {...formInputFormat('course_timing')} />
            <input {...formInputFormat('course_total_students')} />
            <textarea {...formInputFormat('course_description')}></textarea>
        </AcademyCourseDetailsForm>
    );
}