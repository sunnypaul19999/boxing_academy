import axios from "axios";

import { serverURL } from "server/config";

export default class SignUpAPI {

  static async createUser(credentials) {
    try {
      let { username, password, email, mobileNumber } = credentials;
      let msgPacket =
        await axios
          .post(`${serverURL}/user/`, {
            username: username,
            password: password,
            email: email,
          }).then(
            (res) => {
              //console.log(res.data);
              let authority = res.data.authorities[0].authority;
              return {
                isCreated: true,
                authority: authority,
                msg: 'Welcome to Boxing Academy',
              };
            }
          ).catch((err) => {
            console.log(`signup failed ${err['response'].status}`);
            let status = err['response'].status;
            if (status === 500) {
              return {
                isCreated: false,
                msg: 'OOPS! Network Error',
              };
            }
            return {
              isCreated: false,
              msg: 'Unhandled status'
            }
          });
      //console.log(msgPacket);
      return msgPacket;
    } catch (err) {
      console.log(err);
      return {
        isCreated: false,
        msg: 'Please try again'
      }
    }
  }
}