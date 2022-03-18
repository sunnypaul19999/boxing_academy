import AcademyCourseDetailsForm from "components/Forms/LayoutTwo/AcademyCourseDetailsForm";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import MainStore from "store/Main/MainStore";


export default function AdminAddAcademy(props) {

    let formInputFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.add.input[type]);
    }

    let formButtonFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.add.button[type]);
    }

    let token = useSelector((state) => {
        return state.userDetails.token;
    });

    let onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('AdminAddAcademy submitted');
        let sformat = serverFormat(new FormData(event.target));
        AcademyAPI.add(token, sformat);
    }

    let serverFormat = (formData) => {
        let formFormat = academyCourseDetailsFormFormat.academy.add.input;
        return {
            "instituteName": formData.get(formFormat.academy_name.name),
            "imageURL": formData.get(formFormat.academy_image_url.name),
            "instituteAddress": formData.get(formFormat.academy_location.name),
            "instituteMobile": formData.get(formFormat.academy_contact_number.name),
            "instituteEmail": formData.get(formFormat.academy_email.name),
            "instituteDesc": formData.get(formFormat.academy_description.name),
            //"rating": formData.get(formFormat.academy_rating),
        };
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