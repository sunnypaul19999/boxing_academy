import SearchBar from "components/SearchBar/SearchBar.js";
import UserDetailsForm from "components/Forms/LayoutOne/UserDetailsForm";


export default function AdminUpdateStudent(props) {

    let onFormData = (formData) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formData);
    }


    return (
        <UserDetailsForm edit handleFormData={onFormData} />
    );
}