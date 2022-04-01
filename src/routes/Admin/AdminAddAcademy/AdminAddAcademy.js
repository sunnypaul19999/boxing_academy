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
        <Formxvi>
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_name.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_name.placeholder}
                defValue='previous academy name'
                disabled />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_contact_number.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_contact_number.placeholder}
                regex='^[0-9]{10}$'
                errorMsg='Please enter valid phone number'
                required />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_image_url.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_image_url.placeholder}
                errorMsg='Image url invalid'
                required />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_email.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_email.placeholder}
                regex='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                errorMsg='Please enter valid email' />
            <FxTextarea
                id={academyCourseDetailsFormFormat.academy.add.input.academy_description.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_description.placeholder}
                errorMsg='Please enter a description' />
        </Formxvi>
    );

    /*
    <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_name.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_name.placeholder}
                required
                defValue='previous academy name'
                regex='^[a-z\sA-Z]{10,30}$'
                errorMsg='Must be 10-30 characters long' disabled/>
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_contact_number.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_contact_number.placeholder}
                required
                regex='^[0-9]{10}$'
                errorMsg='Please enter valid phone number' />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_image_url.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_image_url.placeholder}
                required
                regex='(https?:\/\/.*\.(?:png|jpg))'
                errorMsg='Image url invalid' />
            <FxInput
                id={academyCourseDetailsFormFormat.academy.add.input.academy_email.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_email.placeholder}
                required
                regex='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                errorMsg='Please enter valid email' />
            <FxTextarea
                id={academyCourseDetailsFormFormat.academy.add.input.academy_description.id}
                label={academyCourseDetailsFormFormat.academy.add.input.academy_description.placeholder}
                required
                errorMsg='Please enter a description' />

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
        </AcademyCourseDetailsForm>*/
}