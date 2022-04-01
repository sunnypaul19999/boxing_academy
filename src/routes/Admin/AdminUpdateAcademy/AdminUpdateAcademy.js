import { useNavigate, useParams } from "react-router-dom";

import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxTextarea from "components/Form/FxTextarea";

import AcademyAPI from "server/AcademyAPI/AcademyAPI";

export default function AdminUpdateAcademy(props) {

    let navigate = useNavigate();

    let params = useParams();

    let formInputFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.edit.input[type]);
    }

    let formButtonFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.edit.button[type]);
    }

    let onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        //let sformat = serverFormat(new FormData(event.target));
        //console.log(sformat);
        updateAcademy(serverFormat(new FormData(event.target)));
        console.log('AdminUpdateAcademy submitted');
    }

    let serverFormat = (formData) => {
        let formFormat = academyCourseDetailsFormFormat.academy.edit.input;
        return {
            "instituteId": params.academyId,
            "instituteName": formData.get(formFormat.academy_name.name),
            "imageURL": formData.get(formFormat.academy_image_url.name),
            "instituteAddress": formData.get(formFormat.academy_location.name),
            "instituteMobile": formData.get(formFormat.academy_contact_number.name),
            "instituteEmail": formData.get(formFormat.academy_email.name),
            "instituteDesc": formData.get(formFormat.academy_description.name),
            //"rating": formData.get(formFormat.academy_rating),
        };
    }

    let updateAcademy = async (sformat) => {
        let response = await AcademyAPI.update(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
    }

    return (
        <Formxvi title='Update Academy'>
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
                label={academyCourseDetailsFormFormat.academy.add.input.academy_description.placeholder}
                errorMsg='Please enter a description'
                required />
        </Formxvi>
    );
}