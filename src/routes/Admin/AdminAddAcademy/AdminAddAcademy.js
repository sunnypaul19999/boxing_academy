import AcademyCourseDetailsForm from "components/Forms/LayoutTwo/AcademyCourseDetailsForm";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";


export default function AdminAddAcademy(props) {

    let navigate = useNavigate();

    useEffect(() => {
        console.log('AdminAddAcademy rendered');
    });

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
        console.log('AdminAddAcademy submitted');
        event.preventDefault();
        event.stopPropagation();
        addAcademy(
            token,
            serverFormat(new FormData(event.target))
        );
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

    let addAcademy = async (token, sformat) => {
        let response = await AcademyAPI.add(token, sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate('../');
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