import AcademyCourseDetailsForm from "components/Forms/LayoutTwo/AcademyCourseDetailsForm";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";


export default function AdminUpdateCourse(props) {

    let formInputFormat = (type) => {
        return (academyCourseDetailsFormFormat.course.edit.input[type]);
    }

    let formButtonFormat = (type) => {
        return (academyCourseDetailsFormFormat.course.edit.button[type]);
    }

    let onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let sformat = serverFormat(new FormData(event.target));
        console.log(sformat);
        console.log('AdminAddCourse submitted');
    }

    let serverFormat = (formData) => {
        let formFormat = academyCourseDetailsFormFormat.course.edit.input;
        return {
            "courseName": formData.get(formFormat.course_name.name),
            "courseDesc": formData.get(formFormat.course_description.name),
            "courseDuration": formData.get(formFormat.course_duration.name),
            "courseTiming": formData.get(formFormat.course_timing),
            //"maxCourseStudents": formData.get(formFormat.course_total_students),
        };
    }

    return (
        <AcademyCourseDetailsForm
            submitButton={
                {
                    ...formButtonFormat('update_course'),
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