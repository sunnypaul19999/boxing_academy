import Formxvi from "components/Form/Formxvi";
import FxInput from "components/Form/FxInput";
import FxSelect, { FxSelectOption } from "components/Form/FxSelect";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";

export default function AdminAddStudent(props) {

    let inputIdOb = userDetailsFormFormat.student.add.input;

    let onFormSubmit = (formState) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formState);
        let sFormat = serverFormat(formState);
    }

    let serverFormat = (formState) => {
        
        
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