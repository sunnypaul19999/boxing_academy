import AddAcademyAPI from "./AddAcademyAPI";
import FetchAcademyAPI from "./FetchAcademyAPI";
import UpdateAcademyAPI from "./UpdateAcademyAPI";


export default class AcademyAPI {

    static fetchAll(token) {
        //return response
        return FetchAcademyAPI.fetchAllAcademy(token);
    }

    static async add(token, reqBody) {
        //return response
        let response = await AddAcademyAPI.addAcademy(token, reqBody);
        return response;
    }

    static async update(token, reqBody) {
        //return response
        return UpdateAcademyAPI.updateAcademy(token, reqBody);
    }
}

