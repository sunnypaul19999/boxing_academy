import UserDetailsForm from "components/Forms/LayoutOne/UserDetailsForm";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";


export default function AdminAddStudent(props) {

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


    return (
        <UserDetailsForm add handleFormData={handleFormData} />
    );
}