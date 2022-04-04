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

    let academyAddInput = academyCourseDetailsFormFormat.academy.add.input;

    useEffect(() => {
        console.log('AdminAddAcademy rendered');
    });


    let onFormSubmit = (formState) => {
        console.log('AdminAddAcademy submitted');
        addAcademy(serverFormat(formState));
    }

    let serverFormat = (formState) => {
        console.log(formState);
        return {
            "instituteName": formState[academyAddInput.academy_name.id].value,
            "imageURL": formState[academyAddInput.academy_image_url.id].value,
            "instituteAddress": formState[academyAddInput.academy_location.id].value,
            "instituteMobile": formState[academyAddInput.academy_contact_number.id].value,
            "instituteEmail": formState[academyAddInput.academy_email.id].value,
            "instituteDesc": formState[academyAddInput.academy_contact_number.id].value,
        };
    }

    let addAcademy = async (sformat) => {
        let response = await AcademyAPI.add(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
    }



    return (
        <Formxvi
            id='addAcademy'
            title='Add Academy'
            onFormSubmit={onFormSubmit}>
            <FxInput {...academyAddInput.academy_name} />
            <FxInput {...academyAddInput.academy_contact_number} />
            <FxInput {...academyAddInput.academy_image_url} />
            <FxInput {...academyAddInput.academy_location} />
            <FxInput {...academyAddInput.academy_email} />
            <FxTextarea {...academyAddInput.academy_description} />
        </Formxvi>
    );

}

/*id = { academyAddInput.academy_contact_number.id }
name = { academyAddInput.academy_contact_number.name }
label = { academyAddInput.academy_contact_number.placeholder }
regex = '^[0-9]{10}$'
errorMsg = 'Please enter valid phone number'
required*/