import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxSelect, { FxSelectOption } from "components/Form/FxSelect";

import CardContainerNotifier from "store/CardContainerNotifier/CardContainerNotifier";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";

import ApplyCourseAPI from "server/CourseAPI/ApplyCourseAPI";
import CourseAPI from "server/CourseAPI/CourseAPI";


export default function AdminAddStudent(props) {

    let navigate = useNavigate();

    let param = useParams();

    let inputIdOb = userDetailsFormFormat.student.add.input;

    let userId = 1;

    let onFormSubmit = (formState) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formState);

        let stuPayload = addStudent(serverFormatAddStudent(formState));
        applyCourse(serverFormatApplyCourse(stuPayload.studentId, userId));
    }


    let serverFormatAddStudent = (formState) => {
        console.log(formState);

        return {
            course: {
                courseId: `${param.courseId}`,
            },
            student: {
                user: {
                    id: userId,
                },
                firstName: formState[inputIdOb.first_name],
                lastName: formState[inputIdOb.last_name],
                motherName: formState[inputIdOb.mother_name],
                fatherName: formState[inputIdOb.father_name],
                mobileNumber: `${formState[inputIdOb.mobileNumber]}*${formState[inputIdOb.alternate_number]}`,
                studentEmail: formState[inputIdOb.email_id],
                age: formState[inputIdOb.age],
                gender: formState[inputIdOb.gender],
                address: `${formState[inputIdOb.house_no]}*${formState[inputIdOb.street_name]}*${formState[inputIdOb.area_name]}*${formState[inputIdOb.pincode]}`,
                state: formState[inputIdOb.state],
            }
        }

    }

    let serverFormatApplyCourse = (stuId, userId) => {
        return {
            course: {
                courseId: `${param.courseId}`,
            },
            student: {
                studentId: stuId,
            },
            user: {
                id: userId,
            }
        }
    }

    let addStudent = async (sformat) => {
        console.log(sformat);
        let response = await CourseAPI.applyCourse(sformat);
        console.log(response.message);
        return response.payload;
    }

    let applyCourse = async (sformat) => {
        console.log(sformat);
        let response = await CourseAPI.applyCourse(sformat);
        console.log(response.message);
        CardContainerNotifier.update();
        navigate(-1);
        toast(response.message);
    }



    let getStateOptions = () => {
        let states = [
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"];
        let options = [];
        for (const state of states) {
            options.push(<FxSelectOption key={`state_name_${state}`} value={state} />);
        }

        return options;
    }

    let getAddressInfromationForm = () => {
        return (
            <Formxvi title='Address Infromation' child>
                <FxInput {...inputIdOb.house_no} />
                <FxInput {...inputIdOb.street_name} />
                <FxInput {...inputIdOb.area_name} />
                <FxInput {...inputIdOb.pincode} />
                <FxSelect {...inputIdOb.state} >
                    <FxSelectOption disabled value='Choose State' />
                    {getStateOptions()}
                </FxSelect>
                <FxInput {...inputIdOb.nationality} />
            </Formxvi>
        );
    }

    let getBasicInfo = () => {
        return (
            <>
                <FxInput {...inputIdOb.first_name} />
                <FxInput {...inputIdOb.last_name} />
                <FxInput {...inputIdOb.mother_name} />
                <FxInput {...inputIdOb.father_name} />
                <FxInput {...inputIdOb.phone_number} />
                <FxInput {...inputIdOb.alternate_number} />
                <FxInput {...inputIdOb.email_id} />
                <FxInput {...inputIdOb.age} />
                <FxSelect
                    id={inputIdOb.gender.id}
                    label={inputIdOb.gender.placeholder}
                    errorMsg='Please select gender'
                    required>
                    <FxSelectOption disabled value='Choose Gender' />
                    <FxSelectOption value='Male' />
                    <FxSelectOption value='Female' />
                    <FxSelectOption value='Others' />
                </FxSelect>
            </>
        );

    }




    return (
        <Formxvi
            id='addAcademy'
            title='Enrollment Form'
            onFormSubmit={onFormSubmit}>

            {getBasicInfo().props.children}

            {getAddressInfromationForm()}

        </Formxvi>
    );
}