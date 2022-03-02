import axios from "axios";

import { serverURL } from "server/config";

export default class SignInAPI {

  static async signIn({ email, password }) {
    let response = {
      payload: null,
      msg: null,
      hasInternalError: false,
    };

    try {
      let token = await axios
        .post(`${serverURL}/generate-token`, {
          email: email,
          password: password,
        }).then((req) => {
          let token = req.data.token;

          response.payload = {
            token: token,
            email: email,
          };

          response.msg = 'Welcome to boxing academy';

          return response;
        }).catch((err) => {
          let status = err['response'].status;
          let msg = 'Unhandled Status Code in SignInAPI';

          if (err['response'].status === 401) {
            msg = 'Invalid Credentials'
          } else {
            msg = 'OPPS! Network error';
          }

          //payload is kept null
          response.msg = msg;

          console.log(`SignInAPI: Failed ${status}`);
          return response;
        });

      return token;
    } catch (err) {
      console.log(`Error occurred at 42 SignInAPI\n${err}`);

      //payload is kept null
      response.msg = 'Internal Error occurred!';
      response.hasInternalError = true;
      
      return response;
    }
  }
}
