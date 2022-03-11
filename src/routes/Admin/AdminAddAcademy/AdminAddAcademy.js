import AcademyCourseDetailsForm from "components/Forms/LayoutTwo/AcademyCourseDetailsForm";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";


export default function AdminAddAcademy(props) {

    let formInputFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.add.input[type]);
    }

    let formButtonFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.add.button[type]);
    }

    let onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('AdminAddAcademy submitted');
    }

    return (
        <AcademyCourseDetailsForm
            submitButton={
                {
                    ...formButtonFormat('add_academy'),
                    onSubmit: onFormSubmit,
                }}>
            <input {...formInputFormat('academy_name')} />
            <input {...formInputFormat('academy_image_url')} />
            <input {...formInputFormat('academy_location')} />
            <input {...formInputFormat('academy_contact_number')} />
            <input {...formInputFormat('academy_email')} />
            <textarea {...formInputFormat('academy_description')} />
        </AcademyCourseDetailsForm>
    );
}