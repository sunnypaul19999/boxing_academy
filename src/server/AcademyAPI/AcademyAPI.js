import AddAcademyAPI from "./AddAcademyAPI";


export default class AcademyAPI {

    static async add(token, reqBody) {
        let response = await AddAcademyAPI.addAcademy(token, reqBody);
        return response;
    }
}

