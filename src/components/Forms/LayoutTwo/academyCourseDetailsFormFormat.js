export let academyCourseDetailsFormFormat = {
    academy: {
        add: {
            input: {
                academy_name: {
                    id: 'academyName',
                    name: 'academy_name',
                    label: 'Academy Name',

                    placeholder: '',
                    errorMsg: 'Name be 10-30 characters long',
                    required: true,
                },
                academy_contact_number: {
                    id: 'contactNumber',
                    name: 'academy_contact_number',
                    label: 'Phone Number',
                    regex: '^[0-9]{10}$',
                    placeholder: '',
                    errorMsg: 'Please enter valid phone number',
                    required: true,
                },
                academy_image_url: {
                    id: 'imageUrl',
                    name: 'academy_image_url',
                    label: 'Image Url',
                    regex: '(https?:\/\/.*\.(?:png|jpg))',
                    placeholder: '',
                    errorMsg: 'Must be png or jpg format',
                    required: true,
                },
                academy_location: {
                    id: 'academyLocation',
                    name: 'academy_location',
                    label: 'Address',
                    regex: '^[a-z\sA-Z]{3,}$',
                    placeholder: '',
                    errorMsg: 'Please enter valid address',
                    required: true,
                },
                academy_email: {
                    id: 'emailId',
                    name: 'academy_email',
                    label: 'Email',
                    regex: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}',
                    placeholder: '',
                    errorMsg: 'Please enter valid email',
                    required: true,
                },
                academy_description: {
                    id: 'academyDescription',
                    name: 'academy_description',
                    label: 'Description',
                    regex: '^[0-9]{10}$',
                    placeholder: '',
                    errorMsg: 'Please enter a description',
                    required: true,
                },
            },
            button: {
                add_academy: {
                    name: 'add_academy',
                    id: 'addAcademy',
                    text: 'Add Academy'
                },
            },
        },
        edit: {
            input: {
                academy_name: {
                    id: 'editAcademyName',
                    name: 'academy_name',
                    label: 'Academy Name',
                    placeholder: '',
                    errorMsg: 'Name be 10-30 characters long',
                    disabled: true,
                },
                academy_contact_number: {
                    id: 'editContactNumber',
                    name: 'academy_contact_number',
                    label: 'Phone Number',
                    regex: '^[0-9]{10}$',
                    placeholder: '',
                    errorMsg: 'Please enter valid phone number',
                    required: true,
                },
                academy_image_url: {
                    id: 'editImageUrl',
                    name: 'academy_image_url',
                    label: 'Image Url',
                    regex: '(https?:\/\/.*\.(?:png|jpg))',
                    placeholder: '',
                    errorMsg: 'Must be png or jpg format',
                    required: true,
                },
                academy_location: {
                    id: 'editAcademyLocation',
                    name: 'academy_location',
                    label: 'Address',
                    regex: '^[a-z\sA-Z]{3,}$',
                    placeholder: '',
                    errorMsg: 'Please enter valid address',
                    required: true,
                },

                academy_email: {
                    id: 'editEmailId',
                    name: 'academy_email',
                    label: 'Email',
                    regex: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}',
                    placeholder: '',
                    errorMsg: 'Please enter valid email',
                    disabled: true,
                },
                academy_description: {
                    id: 'editAcademyDescription',
                    name: 'academy_description',
                    label: 'Description',
                    regex: '^[0-9]{10}$',
                    placeholder: '',
                    errorMsg: 'Please enter a description',
                    required: true,
                },
            },
            button: {
                update_academy: {
                    name: 'update_academy',
                    id: 'updateAcademy',
                    text: 'Update Academy'
                },
            }
        }
    },
    course: {
        add: {
            input: {
                course_name: {
                    name: 'course_name',
                    id: 'courseName',
                    type: 'text',
                    placeholder: 'Course Name',
                    required: true,
                },
                course_duration: {
                    name: 'course_duration',
                    id: 'courseDuration',
                    type: 'text',
                    placeholder: 'Course Duration',
                    required: true,
                },
                course_timing: {
                    name: 'course_timing',
                    id: 'courseTiming',
                    type: 'text',
                    placeholder: 'Course Timing',
                    required: true,
                },
                course_total_students: {
                    name: 'course_total_students',
                    id: 'courseEnrolled',
                    type: 'text',
                    placeholder: 'Total Students',
                    required: true,
                },
                course_description: {
                    name: 'course_description',
                    id: 'courseDescription',
                    type: 'textarea',
                    cols: "30",
                    rows: "10",
                    placeholder: 'Description...',
                    required: true,
                },
            },
            button: {
                add_course: {
                    name: 'add_course',
                    id: 'addCourse',
                    text: 'Add Course',
                }
            },

        },
        edit: {
            input: {
                course_name: {
                    name: 'course_name',
                    id: 'editCourseName',
                    type: 'text',
                    placeholder: 'Course Name',
                    required: true,
                },
                course_duration: {
                    name: 'course_duration',
                    id: 'editCourseDuration',
                    type: 'text',
                    placeholder: 'Course Duration',
                },
                course_timing: {
                    name: 'course_timing',
                    id: 'editCourseTiming',
                    type: 'text',
                    placeholder: 'Course Timing',
                },
                course_total_students: {
                    name: 'course_total_students',
                    id: 'editCourseEnrolled',
                    type: 'text',
                    placeholder: 'Total Students',
                },
                course_description: {
                    name: 'course_description',
                    id: 'editCourseDescription',
                    type: 'textarea',
                    cols: "30",
                    rows: "10",
                    placeholder: 'Description...',
                },
            },
            button: {
                update_course: {
                    name: 'update_course',
                    id: 'updateCourse',
                    text: 'Update Course',
                },
            }
        },
    },
};