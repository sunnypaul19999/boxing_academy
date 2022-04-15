import axios from "axios";
import CourseView from "components/CourseView/CourseView";

import Database from "database/Database";

export default function AdminAllCourse(props) {

    let onSearch = async (searchTerm) => {
        console.log(searchTerm);
        searchTerm = searchTerm || '';
        let sResults = [];
        try {
            sResults = await axios.get(`http://localhost:8080/course/search/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${await Database.getToken()}`
                }
            }).then((resposne) => { return resposne.data });
            console.log(sResults);
            return sResults;
        } catch (err) { }
    }

    return (
        <CourseView admin allCourses onSearch={onSearch} />
    );
}