import axios from "axios";

import { serverURL } from "server/config";

export default class SignInAPI {

  static async signIn(username, password, email) {
    try {
      let token = await axios
        .post(`${serverURL}/user/signin`, {
          username: username,
          password: password,
          email: email,
        }).then((res) => {
          let token = `${res.data.token}`.split('.');
          let tokenPayload = atob(token[1]);
          console.log(`signin successfull payload:  ${tokenPayload}`);
          return res.data.token;
        }).catch((err) => {
          //console.log(`login failed ${err['response'].status}`);
          return null;
        });
      return token;
    } catch (err) {
      console.log(Object.define(err));
      return null;
    }
  }
}
