import UserDetailsForm from "components/Forms/LayoutOne/UserDetailsForm";


export default function UserEnrollCourse(props) {

    let handleFormData = (formData) => {
        console.log('UserEnrollCourse: form data');
        console.log(formData);
    }


    return (
        <UserDetailsForm add handleFormData={handleFormData} />
    );
}