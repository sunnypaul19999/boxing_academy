import CourseView from "components/CourseView/CourseView";


export default function AdminAllCourse(props) {

    let onSearch = (searchElement) => {
        console.log(searchElement.value);
    }

    return (
        <CourseView admin allCourses onSearch={onSearch} />
    );
}