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
            firstName: data['first_name'],
            fatherName: data['father_name'],
            motherName: data['mother_name'],
            emailId: data['email_id'],
            age: data['age'],
            lastName: data['last_name'],
            gender: data['gender'],
            phoneNumber: data['phone_number'],
            alternateNumber: data['alternate_number'],
            houseNo: data['house_no'],
            streetName: data['street_name'],
            areaName: data['area_name'],
            pincode: data['pincode'],
            state: data['state'],
            nationality: data['nationality'],
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
        formRef.current.submit();
    }


    let formInputFormat = (type) => {
        return (inputFormFormat[type]);
    }

    let formButtonFormat = (type) => {
        return (buttonFormFormat[type]);
    }

    return (
        <>
            <div class="form-layout">
                <form action="" key={formRef} onSubmit={onFormSubmit}>
                    <div class="form-field">
                        <div class="form-field-left">
                            <input {...inputFormFormat['first_name']} />
                            <input {...inputFormFormat['father_name']} />
                            <input {...inputFormFormat['mother_name']} />
                            <input {...inputFormFormat['email_id']} />
                            <input {...inputFormFormat['age']} />
                        </div>
                        <div class="form-field-right">
                            <div class="form-field-right-top">
                                <input {...inputFormFormat['last_name']} />
                                <input {...inputFormFormat['gender']} />
                            </div>
                            <div class="form-field-right-middle">
                                <input {...inputFormFormat['phone_number']} />
                                <input   {...inputFormFormat['alternate_number']} />
                            </div>
                            <div class="form-field-right-bottom">
                                <fieldset>
                                    <legend>Address Information</legend>
                                    <label for="house_no">House No: </label>
                                    <input  {...inputFormFormat['house_no']} />
                                    <br />
                                    <label for="street_name">Street Name: </label>
                                    <input {...inputFormFormat['street_name']} />
                                    <br />
                                    <span class="span-label">
                                        <label for="area_name">Area name: </label>
                                        <input  {...inputFormFormat['area_name']} />
                                        <label for="pincode">Pincode : </label>
                                        <input  {...inputFormFormat['pincode']} />
                                        <br />
                                    </span>
                                    <span class="span-label">
                                        <label for="state">State : </label>
                                        <input {...inputFormFormat['pincode']} />
                                        <label for="nationality">Nationality : </label>
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