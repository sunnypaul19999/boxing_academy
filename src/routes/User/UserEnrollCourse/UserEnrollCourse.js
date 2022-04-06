import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxSelect, { FxSelectOption } from "components/Form/FxSelect";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";

export default function AdminAddStudent(props) {

    let inputIdOb = userDetailsFormFormat.student.add.input;

    let handleFormData = (formData) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formData);
        let sFormat = serverFormat(formData);
    }

    let serverFormat = (formData) => {
        let formFormat = userDetailsFormFormat.student.add;
        return {
        };
    }

    let getAddressInfromationForm = () => {
        return (
            <Formxvi title='Address Infromation' child>
                <FxInput {...inputIdOb.house_no} />
                <FxInput {...inputIdOb.street_name} />
                <FxInput {...inputIdOb.area_name} />
                <FxInput {...inputIdOb.pincode} />
                <FxSelect {...inputIdOb.state} >
                    <FxSelectOption disabled value='Choose Gender' />
                    <FxSelectOption value='Male' />
                    <FxSelectOption value='Female' />
                    <FxSelectOption value='Others' />
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
        <Formxvi title='Enrollment Form'>

            {getBasicInfo().props.children}

            {getAddressInfromationForm()}

        </Formxvi>
    );
}