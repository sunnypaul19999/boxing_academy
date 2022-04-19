import axios from "axios";

import StudentView from "components/StudentView/StudentView";

import Database from "database/Database";

export default function AdminAllStudents() {

    let getData = async () => {
        let view = [];
        try {
            view = await axios.get(`http://localhost:8080/Student/adminStudentView`, {
                headers: {
                    Authorization: `Bearer ${await Database.getToken()}`
                }
            }).then((resposne) => { return resposne.data });
            //console.log(view);
            return view;
        } catch (err) { }
        return [
            [
                "userId",
                "courseId",
                "studentId",
                "firstName",
                "lastName",
                "mobileNumber",
                "enrolledCourseName"
            ],
            [
                1,
                20,
                18,
                "First",
                "Name",
                "9475929195*",
                "Judo Pro"
            ],
            [
                1,
                30,
                18,
                "First",
                "Name",
                "9475929195*",
                "Master Defense "
            ]
        ];
    }

    return (<StudentView getData={getData} />)
}