import AddAcademyAPI from "./AddAcademyAPI";
import DeleteAcademyAPI from "./DeleteAcademyAPI";
import FetchAcademyAPI from "./FetchAcademyAPI";
import UpdateAcademyAPI from "./UpdateAcademyAPI";


export default class AcademyAPI {

    static fetchAll(token) {
        return FetchAcademyAPI.fetchAllAcademy(token);
    }

    static async add(token, reqBody) {
        return AddAcademyAPI.addAcademy(token, reqBody);
    }

    static async update(token, reqBody) {
        return UpdateAcademyAPI.updateAcademy(token, reqBody);
    }

    static async delete(token, id) {
        return DeleteAcademyAPI.delAcademy(token, id);
    }

}

