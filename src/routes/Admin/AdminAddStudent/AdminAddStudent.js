import UserDetailsForm from "components/Forms/LayoutOne/UserDetailsForm";


export default function AdminAddStudent(props) {

    let handleFormData = (formData) => {
        console.log('AdminUpdateStudent: form data');
        console.log(formData);
    }


    return (
        <UserDetailsForm add handleFormData={handleFormData} />
    );
}