import axios from "axios";

import { serverURL } from "config/serverConfig";

export default class FetchAcademyAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token,) {
        this._token = token;
    }

    _createFetchAcademyRequest() {
        let req = axios.get(`${serverURL}/institute/viewInstitute`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _onFetchAcademySuccess(res) {
        this._response.payload = { academy: res.data };
        this._response.message = 'All Academy Fetched';

        return this._response;
    }

    _onFetchAcademyError(err) {
        let message;
        let status = err['response'].status;
        message = 'OPPS! Network error';

        //payload is kept null
        this._response.message = message;

        console.log(`FetchAcademyAPI: Failed ${status}`);
        return this._response;
    }


    static async fetchAllAcademy(token) {
        let api = new FetchAcademyAPI(token);
        try {
            let httpRes = await api._createFetchAcademyRequest();
            let response = api._onFetchAcademySuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`FetchAcademyAPI: Error Occured\n`); console.log(err);
            let errResponse = api._onFetchAcademyError(err);
            return errResponse;
        }
    }
}