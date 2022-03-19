import AcademyCourseDetailsForm from "components/Forms/LayoutTwo/AcademyCourseDetailsForm";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";


export default function AdminUpdateAcademy(props) {

    let navigate = useNavigate();

    let params = useParams();

    let token = useSelector((state) => {
        return state.userDetails.token;
    });

    let formInputFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.edit.input[type]);
    }

    let formButtonFormat = (type) => {
        return (academyCourseDetailsFormFormat.academy.edit.button[type]);
    }

    let onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let sformat = serverFormat(new FormData(event.target));
        console.log(sformat);
        updateAcademy(token, sformat);
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

    let updateAcademy = async (token, sformat) => {
        let response = await AcademyAPI.update(token, sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
    }

    return (
        <AcademyCourseDetailsForm
            submitButton={
                {
                    ...formButtonFormat('update_academy'),
                    onSubmit: onFormSubmit,
                }}>
            <input {...formInputFormat('academy_name')} />
            <input {...formInputFormat('academy_image_url')} />
            <input {...formInputFormat('academy_location')} />
            <input {...formInputFormat('academy_contact_number')} />
            <input {...formInputFormat('academy_email')} />
            <textarea {...formInputFormat('academy_description')}></textarea>
        </AcademyCourseDetailsForm>
    );
}