export let academyCourseDetailsFormFormat = {
    academy: {
        add: {
            input: {
                academy_name: {
                    name: 'academy_name',
                    id: 'academyName',
                    type: 'text',
                    placeholder: 'Academy Name',
                    required: true,
                },
                academy_image_url: {
                    name: 'academy_image_url',
                    id: 'imageUrl',
                    type: 'text',
                    placeholder: 'Image URL',
                    required: true,
                },
                academy_location: {
                    name: 'academy_location',
                    id: 'academyLocation',
                    type: 'text',
                    placeholder: 'Location',
                    required: true,
                },
                academy_contact_number: {
                    name: 'academy_contact_number',
                    id: 'contactNumber',
                    type: 'text',
                    placeholder: 'Contact Number',
                    required: true,
                },
                academy_email: {
                    name: 'academy_email',
                    id: 'emailId',
                    type: 'email',
                    placeholder: 'Email Id',
                    required: true,
                },
                academy_description: {
                    name: 'academy_description',
                    id: 'academyDescription',
                    type: 'textarea',
                    cols: "30",
                    rows: "10",
                    placeholder: 'Description',
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
                    name: 'academy_name',
                    id: 'editAcademyName',
                    type: 'text',
                    placeholder: 'Academy Name',
                    required: true,
                },
                academy_image_url: {
                    name: 'academy_image_url',
                    id: 'editImageUrl',
                    type: 'text',
                    placeholder: 'Image URL',
                    required: true,
                },
                academy_location: {
                    name: 'academy_location',
                    id: 'editAcademyLocation',
                    type: 'text',
                    placeholder: 'Location',
                    required: true,
                },
                academy_contact_number: {
                    name: 'academy_contact_number',
                    id: 'editContactNumber',
                    type: 'text',
                    placeholder: 'Contact Number',
                    required: true,
                },
                academy_email: {
                    name: 'academy_email',
                    id: 'editEmailId',
                    type: 'email',
                    placeholder: 'Email Id',
                    required: true,
                },
                academy_description: {
                    name: 'academy_description',
                    id: 'editAcademyDescription',
                    type: 'textarea',
                    cols: "30",
                    rows: "10",
                    placeholder: 'Description',
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