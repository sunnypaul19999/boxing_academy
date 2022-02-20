import axios from "axios";

import { serverURL } from "server/config";

export default class SignInAPI {

  static async createUser(username, password, email) {
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
        console.log(`login failed ${err['response'].status}`);
        return false;
      });
    return token;
  }
}

/*axios
.post("http://localhost:8080/user/signup", {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
}).then((res) => {
  let token = `${res.data.token}`.split('.');
  let tokenPayload = atob(token[1]);
  console.log(tokenPayload);
  console.log('signup successfull');
}).catch((err) => {
  console.log(`login failed ${err['response'].status}`)
});

axios
.post("http://localhost:8080/user/login", {
  username: "Isai_Jones",
  password: "qp90tsNXnAgTshJ",
  email: "Kameron24@hotmail.com",
}).then(
  (res) => {
    let token = `${res.data.token}`.split('.');
    let tokenPayload = atob(token[1]);
    console.log(tokenPayload);
    console.log('login successfull');
  }
).catch((err) => {
  console.log(`login failed ${err['response'].status}`)
});
});*/