import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxTextarea from "components/Form/FxTextarea";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import { useEffect } from "react";
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

    let onFormSubmit = (event) => {
        console.log('AdminAddAcademy submitted');
        event.preventDefault();
        event.stopPropagation();
        addAcademy(serverFormat(new FormData(event.target)));
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

    let addAcademy = async (sformat) => {
        let response = await AcademyAPI.add(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
    }

    return (
        <Formxvi id='addAcademy' title='Add Academy'>
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_name.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_name.placeholder}
                regex='^[a-z\sA-Z]{10,30}$'
                errorMsg='Must be 10-30 characters long'
                required />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_contact_number.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_contact_number.placeholder}
                regex='^[0-9]{10}$'
                errorMsg='Please enter valid phone number'
                required />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_image_url.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_image_url.placeholder}
                regex='(https?:\/\/.*\.(?:png|jpg))'
                errorMsg='Image url invalid'
                required />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_email.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_email.placeholder}
                regex='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
                errorMsg='Please enter valid email'
                required />
            <FxTextarea
                id={academyCourseDetailsFormFormat.academy.add.input.academy_description.id}
                form='addAcademy'
                label={academyCourseDetailsFormFormat.academy.add.input.academy_description.placeholder}
                errorMsg='Please enter a description'
                required />
        </Formxvi>
    );

}