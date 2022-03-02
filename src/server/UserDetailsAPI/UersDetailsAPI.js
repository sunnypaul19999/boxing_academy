import axios from "axios";

import { serverURL } from "server/config";
import MainStore from "store/Main/MainStore";

export default class UserDetailsAPI {
  _email;
  _response = {
    payload: null,
    msg: null,
    hasError: false,
  };

  static _userDetailsAPI;

  constructor(email) {
    this._email = email;
  }

  get _token() {
    return MainStore.store.getState()['token'];
  }

  static _api(email) {
    if (!UserDetailsAPI._userDetailsAPI) {
      console.log('UserDetailsAPI: Creating UserDetailsAPI object');
      UserDetailsAPI._userDetailsAPI = new UserDetailsAPI(email);
    }

    return UserDetailsAPI._userDetailsAPI;
  }

  _createRequest() {
    let res = axios.get(`${serverURL}/user/${this._email}`, {
      headers: {
        Authorization: `Bearer ${this._token}`
      }
    });

    return res;
  }

  _onFetchSuccess(res) {
    let msgPacket = {
      id: null,
      name: null,
      email: null,
      authority: null,
      mobileNo: null,
    };

    msgPacket.id = res.data.id;
    msgPacket.name = res.data.user_name;
    msgPacket.email = res.data.email;
    msgPacket.authority = res.data.authorities[0].authority;
    msgPacket.mobileNo = res.data.mobileNo;

    this._response.payload = msgPacket;
    this._response.msg = 'Fetched User details';

    console.log(`UserDetailsAPI: User details`);
    console.log(this._response);
    return this._response;
  }

  _onFetchError(err) {
    let status = err['response'].status;
    let msg = 'Failed to fetch User details';

    this._response.msg = msg;
    this._response.hasError = true;

    console.log(`UserDetailsAPI: Failed to fetch details ${status}`);
    return this._response;
  }

  static async fetch(email) {
    let api = UserDetailsAPI._api(email);
    try {
      let httpRes = await api._createRequest();
      let response = api._onFetchSuccess(httpRes);
      return response;
    } catch (err) {
      console.log(`UserDetailsAPI: Error Occured`);
      console.log(err);
      let errResponse = api._onFetchError(err);
      return errResponse;
    }
  }

}