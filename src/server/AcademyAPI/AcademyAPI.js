import AddAcademyAPI from "./AddAcademyAPI";
import UpdateAcademyAPI from "./UpdateAcademyAPI";


export default class AcademyAPI {

    static async add(token, reqBody) {
        let response = await AddAcademyAPI.addAcademy(token, reqBody);
        return response;
    }

    static async update(token, reqBody) {
        let response = await UpdateAcademyAPI.updateAcademy(token, reqBody);
        return response;
    }
}

