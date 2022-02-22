import axios from "axios";

import { serverURL } from "server/config";

export default class SignUpAPI {

  static async createUser({ username, password, email }) {
    try {
      let token = await axios
        .post(`${serverURL}/user/signup`, {
          username: username,
          password: password,
          email: email,
        }).then((res) => {
          let token = `${res.data.token}`.split('.');
          let tokenPayload = atob(token[1]);
          console.log(`signup successfull payload:  ${tokenPayload}`);
          return {
            token: token,
            msg: 'Welcome to boxing academy',
          };
        }).catch((err) => {
          console.log(`signup failed ${err['response'].status}`);
          return {
            token: null,
            msg: 'OPPS! Network error',
          };
        });
      return token;
    } catch (err) {
      console.log('error occured');
      //console.log(Object.keys(err));
      return {
        token: null,
        msg: 'Please try again',
      };
    }
  }
}