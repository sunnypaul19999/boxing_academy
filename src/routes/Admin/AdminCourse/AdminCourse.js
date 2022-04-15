import CourseView from "components/CourseView/CourseView";


export default function AdminCourse() {
    let onSearch = (searchElement) => {
        console.log(searchElement.value);
    }

    return (<CourseView admin onSearch={onSearch} />)
}