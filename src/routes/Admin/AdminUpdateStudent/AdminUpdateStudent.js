import UserDetailsForm from "components/Forms/LayoutOne/UserDetailsForm";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat";

export default function AdminUpdateStudent(props) {

    let onFormData = (formData) => {
        console.log('AdminUpdateStudent: form data');
        let sFormat = serverFormat(formData);
        console.log(formData);

    }

    let serverFormat = (formData) => {
        let formFormat = userDetailsFormFormat.student.add;
        return {
        };
    }

    return (
        <UserDetailsForm edit handleFormData={onFormData} />
    );
}