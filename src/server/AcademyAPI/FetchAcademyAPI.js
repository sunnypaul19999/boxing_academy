import axios from "axios";

import { serverURL } from "config/serverConfig";

export default class FetchAcademyAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, id) {
        this._token = token;
        this._id = id;
    }

    _createFetchAcademyRequest() {
        let req = axios.get(`${serverURL}/institute/viewInstitute`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _createfetchAcademyWithIdReq = () => {
        return axios.get(`${serverURL}/institute/${this._id}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
    }

    _onFetchAcademySuccess(res) {
        this._response.payload = { academy: res.data };
        this._response.message = 'All Academy Fetched';

        return this._response;
    }

    _onFetchAcademyByIdSuccess(res) {
        //console.log(this._id);
        this._response.payload = {
            academy: res.data,
            statusCode: res.status
        };
        this._response.message = 'Academy Fetched';

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

    _onFetchAcademyByIdError(err) {
        let message;
        console.log(err);
        let status = err['response'].status;

        if (status === 404) {
            message = 'Academy Not Found !'
        } else {
            message = 'OPPS! Network error';
        }

        this._response.payload = { statusCode: status };
        this._response.message = message;

        console.log(`FetchAcademyAPI by Id: Failed ${err}`);
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


    static async fetchAcademyById(token, id) {
        let api = new FetchAcademyAPI(token, id);
        try {
            let httpRes = await api._createfetchAcademyWithIdReq();
            let response = api._onFetchAcademyByIdSuccess(httpRes);
            return response;
        } catch (err) {
            console.log(`FetchAcademyAPI by Id: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchAcademyByIdError(err);
            return errResponse;
        }
    }

}