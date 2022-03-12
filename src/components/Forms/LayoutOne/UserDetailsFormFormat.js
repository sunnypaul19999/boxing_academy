export let userDetailsFormFormat = {
    student: {
        add: {
            input: {
                first_name: {
                    id: 'firstName',
                    name: 'first_name',
                    type: 'text',
                    placeholder: 'First Name',
                    required: true
                },
                father_name: {
                    id: 'fatherName',
                    name: 'father_name',
                    type: 'text',
                    placeholder: 'Father Name',
                    required: true
                },
                mother_name: {
                    id: 'motherName',
                    name: 'mother_name',
                    type: 'text',
                    placeholder: 'Mother Name',
                    required: true
                },
                email_id: {
                    id: 'emailId',
                    name: 'email_id',
                    type: 'email',
                    placeholder: 'Email',
                    required: true
                },
                age: {
                    id: 'age',
                    name: 'age',
                    type: 'number',
                    placeholder: 'Age',
                    required: true
                },
                last_name: {
                    id: 'lastName',
                    name: 'last_name',
                    type: 'text',
                    placeholder: 'Last Name',
                    required: true
                },
                gender: {
                    id: 'male/female',
                    name: 'gender',
                    type: 'text',
                    placeholder: 'Gender',
                    required: true
                },
                phone_number: {
                    id: 'phoneNumber1',
                    name: 'phone_number',
                    type: 'tel',
                    pattern: `^[0-9]{10}$`,
                    placeholder: 'Primary Phone Number',
                    required: true
                },
                alternate_number: {
                    id: 'phoneNumber2',
                    name: 'alternate_number',
                    type: 'tel',
                    pattern: `^[0-9]{10}$`,
                    placeholder: 'Alternate Phone Number'
                },
                house_no: {
                    id: 'houseNo',
                    name: 'house_no',
                    type: 'text',
                    placeholder: 'House No:',
                    required: true
                },
                street_name: {
                    id: 'streetName',
                    name: 'street_name',
                    type: 'text',
                    placeholder: 'Street Name',
                    required: true
                },
                area_name: {
                    id: 'areaName',
                    name: 'area_name',
                    type: 'text',
                    placeholder: 'Area Name',
                    required: true
                },
                pincode: {
                    id: 'pincode',
                    name: 'pincode',
                    type: 'text',
                    pattern: "^[1-9][0-9]{5}$",
                    placeholder: 'Pincode',
                    required: true
                },
                state: {
                    id: 'state',
                    name: 'state',
                    type: 'text',
                    placeholder: 'State',
                    required: true
                },
                nationality: {
                    id: 'nationality',
                    name: 'nationality',
                    type: 'text',
                    placeholder: 'Nationality',
                    required: true
                },
            },
            button: {
                add_student: {
                    id: 'addStudent',
                    name: 'add_student',
                    text: 'Add Student',
                }
            },
        },
        edit: {
            input: {
                first_name: {
                    id: 'editFirstName',
                    name: 'first_name',
                    type: 'text',
                    placeholder: 'First Name',
                    required: true
                },
                father_name: {
                    id: 'editFatherName',
                    name: 'father_name',
                    type: 'text',
                    placeholder: 'Father Name',
                    required: true
                },
                mother_name: {
                    id: 'editMotherName',
                    name: 'mother_name',
                    type: 'text',
                    placeholder: 'Mother Name',
                    required: true
                },
                email_id: {
                    id: 'editEmailId',
                    name: 'email_id',
                    type: 'email',
                    placeholder: 'Email',
                    required: true
                },
                age: {
                    id: 'editAge',
                    name: 'age',
                    type: 'number',
                    placeholder: 'Age',
                    required: true
                },
                last_name: {
                    id: 'editLastName',
                    name: 'last_name',
                    type: 'text',
                    placeholder: 'Last Name',
                    required: true
                },
                gender: {
                    id: 'male/female',
                    name: 'gender',
                    type: 'text',
                    placeholder: 'Gender',
                    required: true
                },
                phone_number: {
                    id: 'editPhoneNumber1',
                    name: 'phone_number',
                    type: 'tel',
                    pattern: `^[0-9]{10}$`,
                    placeholder: 'Primary Phone Number',
                    required: true
                },
                alternate_number: {
                    id: 'editPhoneNumber2',
                    name: 'alternate_number',
                    type: 'tel',
                    pattern: `^[0-9]{10}$`,
                    placeholder: 'Alternate Phone Number'
                },
                house_no: {
                    id: 'editHouseNo',
                    name: 'house_no',
                    type: 'text',
                    placeholder: 'House No:',
                    required: true
                },
                street_name: {
                    id: 'editStreetName',
                    name: 'street_name',
                    type: 'text',
                    placeholder: 'Street Name',
                    required: true
                },
                area_name: {
                    id: 'editAreaName',
                    name: 'area_name',
                    type: 'text',
                    placeholder: 'Area Name',
                    required: true
                },
                pincode: {
                    id: 'editPincode',
                    name: 'pincode',
                    type: 'text',
                    pattern: "^[1-9][0-9]{5}$",
                    placeholder: 'Pincode',
                    required: true
                },
                state: {
                    id: 'editState',
                    name: 'state',
                    type: 'text',
                    placeholder: 'State',
                    required: true
                },
                nationality: {
                    id: 'editNationality',
                    name: 'nationality',
                    type: 'text',
                    placeholder: 'Nationality',
                    required: true
                },
            },
            button: {
                edit_academy: {
                    id: 'updateStudent',
                    name: 'update_student',
                    text: 'Update Student',
                }
            },
        },
    },
};