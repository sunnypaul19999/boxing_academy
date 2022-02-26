import SignInAPI from "server/SignInAPI/SignInAPI";

export function signInHandler(credentials) {
    let signInMsgPacket = SignInAPI.signIn(credentials);
    return signInMsgPacket;
}