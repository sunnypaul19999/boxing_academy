import axios from "axios";

import { serverURL } from "server/config";

export default class SignInAPI {

  static async signIn({ email, password }) {
    try {
      let token = await axios
        .post(`${serverURL}/generate-token`, {
          email: email,
          password: password,
        }, {
          headers: {
            Authorization: `Bearer`
          }
        }).then((req) => {
          console.log(req);
          let token = req.data.token;
          let tokenPayload = atob(`${token}`.split('.')[1]);
          console.log(`SignIn successfull payload:  ${tokenPayload}`);
          return {
            token: token,
            msg: 'Welcome to boxing academy',
          };
        }).catch((err) => {
          console.log(`SignIn failed ${err['response'].status}`);
          if (err['response'].status === 401) {
            return {
              token: null,
              msg: 'Invalid Credentials',
            };
          } else {
            return {
              token: null,
              msg: 'OPPS! Network error',
            };
          }
        });
      return token;
    } catch (err) {
      console.log(`Error occurred at 42 SignInAPI\n${err}`);
      return null;
    }
  }
}
