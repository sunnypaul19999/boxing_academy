import axios from "axios";

import { serverURL } from "server/config";

export default class SignUpAPI {

  static async createUser(credentials) {

    let response = {
      isCreated: false,
      msg: null,
    };

    try {
      let { username, password, email, mobileNumber } = credentials;
      let msgPacket =
        await axios
          .post(`${serverURL}/user/`, {
            username: username,
            password: password,
            email: email,
            //mobileNo: mobileNumber,
          }).then(
            (res) => {
              //console.log(res.data);
              //let authority = res.data.authorities[0].authority;
              response.isCreated = true;
              response.msg = 'Welcome to Boxing Academy';

              return response;
            }
          ).catch((err) => {
            let status = err['response'].status;
            let msg = 'Unhandled Status Code in SignUpAPI';

            if (status === 500) {
              msg = 'OOPS! Network Error';
            }

            response.msg = msg;

            console.log(`SignInAPI: Failed ${status}`);
            return response;
          });

      return msgPacket;
    } catch (err) {
      response.msg = 'Please try again';
      
      console.log(err);
      return response;
    }
  }
}