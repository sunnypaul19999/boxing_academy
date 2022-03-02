import SignInAPI from "server/SignInAPI/SignInAPI";
import UserDetailsAPI from "server/UserDetailsAPI/UersDetailsAPI";
import SignInError from "./SignInError";

function signIn(credentials) {
    let signInMsgPacket = SignInAPI.signIn(credentials);
    return signInMsgPacket;
}

async function signInHandler(credentials, onSuccess) {
    let signInMsgPacket = await signIn(credentials);

    if (signInMsgPacket.payload) {
        onSuccess(signInMsgPacket);
        UserDetailsAPI.fetch(credentials.email);
    } else {
        throw new SignInError(signInMsgPacket.msg);
    }
}

export default signInHandler;