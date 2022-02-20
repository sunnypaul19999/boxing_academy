import axios from "axios";

import { serverURL } from "server/config";

export default class SignUpAPI {

  static async createUser({ username, password, email }) {
    let token = await axios
      .post(`${serverURL}/user/signup`, {
        username: username,
        password: password,
        email: email,
      }).then((res) => {
        let token = `${res.data.token}`.split('.');
        let tokenPayload = atob(token[1]);
        console.log(`signup successfull payload:  ${tokenPayload}`);
        return token;
      }).catch((err) => {
        console.log(`signup failed ${err['response'].status}`);
        return null;
      });
    return token;
  }
}