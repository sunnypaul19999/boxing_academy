import axios from "axios";

import { serverURL } from "config/serverConfig";
import Database from "database/Database";

export default class FetchCourseAPI {
    _response = {
        payload: null,
        message: null,
    };

    constructor(token, id) {
        this._token = token;
        //id is academy id
        this._id = id;
    }

    //fetches all courses
    _createFetchAllCourseRequest() {
        let req = axios.get(`${serverURL}/course/viewCourse`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
        return req;
    }

    _createFetchCourseByAcademyIdReq = () => {
        return axios.get(`${serverURL}/course/institute/${this._id}`, {
            headers: {
                Authorization: `Bearer ${this._token}`
            }
        });
    }

    _onFetchAllCourseSuccess(res) {
        this._response.payload = { academy: res.data };
        this._response.message = 'All Course Fetched';

        return this._response;
    }

    _onFetchCourseByAcademyIdSuccess(res) {
        //console.log(this._id);
        this._response.payload = {
            academy: res.data,
            statusCode: res.status
        };
        this._response.message = 'Course Fetched';

        return this._response;
    }

    _onFetchAllCourseError(err) {
        let message;
        let status = err['response'].status;
        message = 'OPPS! Network error';

        //payload is kept null
        this._response.message = message;

        console.log(`FetchAllCourseError: ${status}`);
        return this._response;
    }

    _onFetchCourseByAcademyIdError(err) {
        let message;
        //console.log(err);
        let status = err['response'].status;

        if (status === 404) {
            message = 'Course Not Found !'
        } else {
            message = 'OPPS! Network error';
        }

        this._response.payload = { statusCode: status };
        this._response.message = message;

        console.log(`FetchCourseByAcademyIdError: ${status}`);
        return this._response;
    }


    static async fetchAllCourse() {
        let token = await Database.getToken();
        let api = new FetchCourseAPI(token);
        try {
            let httpRes = await api._createFetchAllCourseRequest();
            let response = api._onFetchAllCourseSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`FetchCourseAPI: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchAllCourseError(err);
            return errResponse;
        }
    }


    static async fetchCourseByAcademyId(id) {
        let token = await Database.getToken();
        let api = new FetchCourseAPI(token, id);
        try {
            let httpRes = await api._createFetchCourseByAcademyIdReq();
            let response = api._onFetchCourseByAcademyIdSuccess(httpRes);
            return response;
        } catch (err) {
            //console.log(`FetchCourseAPI by Id: Error Occured\n`); //console.log(err);
            let errResponse = api._onFetchCourseByAcademyIdError(err);
            return errResponse;
        }
    }

}