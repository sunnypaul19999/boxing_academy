import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";

import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxTextarea from "components/Form/FxTextarea";
import { academyCourseDetailsFormFormat } from "components/Forms/LayoutTwo/academyCourseDetailsFormFormat.js";
import CourseAPI from "server/CourseAPI/CourseAPI";




export default function AdminAddCourse(props) {

    let navigate = useNavigate();

    let courseFormInput = academyCourseDetailsFormFormat.course.add.input;

    useEffect(() => {
        console.log('AdminAddCourse rendered');
    });


    let onFormSubmit = (formState) => {
        console.log('AdminAddCourse submitted');
        addCourse(serverFormat(formState));
    }

    let serverFormat = (formState) => {
        console.log(formState);
        return {
            "courseName": formState[courseFormInput.academy_name.id].value,
            "courseDuration": formState[courseFormInput.academy_location.id].value,
            "courseCost": formState[courseFormInput.academy_contact_number.id].value,
            "courseTimings": formState[courseFormInput.academy_email.id].value,
            "courseDesc": formState[courseFormInput.academy_description.id].value,
        };
    }

    let addCourse = async (sformat) => {
        let response = await CourseAPI.add(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
    }



    return (
        <Formxvi
            id='addCourse'
            title='Add Course'
            onFormSubmit={onFormSubmit}>
            <FxInput {...courseFormInput.academy_name} />
            <FxInput {...courseFormInput.academy_contact_number} />
            <FxInput {...courseFormInput.academy_image_url} />
            <FxInput {...courseFormInput.academy_location} />
            <FxInput {...courseFormInput.academy_email} />
            <FxTextarea {...courseFormInput.academy_description} />
        </Formxvi>
    );

}

/*id = { courseFormInput.academy_contact_number.id }
name = { courseFormInput.academy_contact_number.name }
label = { courseFormInput.academy_contact_number.placeholder }
regex = '^[0-9]{10}$'
errorMsg = 'Please enter valid phone number'
required*/