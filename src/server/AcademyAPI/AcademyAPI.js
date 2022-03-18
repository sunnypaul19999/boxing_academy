import axios from "axios";

import { serverURL } from "config/serverConfig";
import { useSelector } from "react-redux";
import MainStore from "store/Main/MainStore";

class AddAcademyAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, reqBody) {
        this._reqBody = reqBody;
        this._token = token;
    }

    _createAddAcademyRequest() {
        let req = axios.post(`${serverURL}/institute/addInstitute`, this._reqBody, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onAddAcademySuccess(res) {
        this._response.payload = { academy: res.data };
        this._response.message = 'Academy Added  !';

        return this._response;
    }

    _onAddAcademyError(err) {
        let message;
        let status = err['response'].status;

        if (err['response'].status === 409) {
            message = 'Institute Already Present !'
        } else {
            message = 'OPPS! Network error';
        }

        //payload is kept null
        this._response.message = message;

        console.log(`Adding Academy: Failed ${status}`);
        return this._response;
    }


    static async addAcademy(token, reqBody) {
        let api = new AddAcademyAPI(token, reqBody);
        try {
            let httpRes = await api._createAddAcademyRequest();
            let response = api._onAddAcademySuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`AcademyAPI Add: Error Occured`);
            console.log(err);
            let errResponse = this._onAddAcademyError(err);
            return errResponse;
        }
    }
}


export default class AcademyAPI {

    static async add(token, reqBody) {
        let response = await AddAcademyAPI.addAcademy(token, reqBody);
        return response;
    }
}

