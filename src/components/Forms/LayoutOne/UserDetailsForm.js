import { useRef } from "react";

import HoverButton from "components/AcademyCourseCard/CardMakingTools/HoverButton";
import { userDetailsFormFormat } from "components/Forms/LayoutOne/UserDetailsFormFormat.js";

import 'assets/css/form/form-layout-one.css';


//---------------props----------------
//student(optional for now)
//add | edit
//handleFormData (to pass form data on form submitted)
//-------------------------------------
export default function UserDetailsForm(props) {

    let formRef = useRef(null);
    let inputFormFormat = (props.add) ? userDetailsFormFormat.student.add.input : userDetailsFormFormat.student.edit.input;
    let buttonFormFormat = (props.add) ? userDetailsFormFormat.student.add.button : userDetailsFormFormat.student.edit.button;

    let formData = () => {
        let data = new FormData(formRef.current);
        return {
            firstName: data.get("first_name"),
            fatherName: data.get("father_name"),
            motherName: data.get("mother_name"),
            emailId: data.get("email_id"),
            age: data.get("age"),
            lastName: data.get("last_name"),
            gender: data.get("gender"),
            phoneNumber: data.get("phone_number"),
            alternateNumber: data.get("alternate_number"),
            houseNo: data.get("house_no"),
            streetName: data.get("street_name"),
            areaName: data.get("area_name"),
            pincode: data.get("pincode"),
            state: data.get("state"),
            nationality: data.get("nationality"),
        };
    }

    let onFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        props.handleFormData(formData());
    }

    let onButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        formRef.current.requestSubmit();
    }

    let formButtonFormat = (type) => {
        return (buttonFormFormat[type]);
    }

    return (
        <>
            <div className="form-layout">
                <form action="" ref={formRef} onSubmit={onFormSubmit}>
                    <div className="form-field">
                        <div className="form-field-left">
                            <input {...inputFormFormat['first_name']} />
                            <input {...inputFormFormat['father_name']} />
                            <input {...inputFormFormat['mother_name']} />
                            <input {...inputFormFormat['email_id']} />
                            <input {...inputFormFormat['age']} />
                        </div>
                        <div className="form-field-right">
                            <div className="form-field-right-top">
                                <input {...inputFormFormat['last_name']} />
                                <input {...inputFormFormat['gender']} />
                            </div>
                            <div className="form-field-right-middle">
                                <input {...inputFormFormat['phone_number']} />
                                <input   {...inputFormFormat['alternate_number']} />
                            </div>
                            <div className="form-field-right-bottom">
                                <fieldset>
                                    <legend>Address Information</legend>
                                    <label htmlFor="house_no">House No: </label>
                                    <input  {...inputFormFormat['house_no']} />
                                    <br />
                                    <label htmlFor="street_name">Street Name: </label>
                                    <input {...inputFormFormat['street_name']} />
                                    <br />
                                    <span className="span-label">
                                        <label htmlFor="area_name">Area name: </label>
                                        <input  {...inputFormFormat['area_name']} />
                                        <label htmlFor="pincode">Pincode : </label>
                                        <input  {...inputFormFormat['pincode']} />
                                        <br />
                                    </span>
                                    <span className="span-label">
                                        <label htmlFor="state">State : </label>
                                        <input {...inputFormFormat['state']} />
                                        <label htmlFor="nationality">Nationality : </label>
                                        <input {...inputFormFormat['nationality']} />
                                        <br />
                                    </span>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <HoverButton
                {...formButtonFormat((props.add) ? 'add_student' : 'edit_academy')}
                onClick={onButtonClick} />
        </>
    );
}