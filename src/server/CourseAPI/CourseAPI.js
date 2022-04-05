import AddCourseAPI from "./AddCourseAPI";
import DeleteCourseAPI from "./DeleteCourseAPI";
import FetchCourseAPI from "./FetchCourseAPI";
import UpdateCourseAPI from "./UpdateCourseAPI";


export default class CourseAPI {

    static fetchAll() {
        return FetchCourseAPI.fetchAllCourse();
    }

    static fetchById(id) {
        return FetchCourseAPI.fetchCourseByAcademyId(id);
    }

    static async add(reqBody) {
        return AddCourseAPI.addCourse(reqBody);
    }

    static async update(reqBody) {
        return UpdateCourseAPI.updateCourse(reqBody);
    }

    static async delete(id) {
        return DeleteCourseAPI.delCourse(id);
    }

}

