class SignInError extends Error {
    _message;

    constructor(message) {
        super(message);
        this.name = 'SignInError';
        this._message = message;
    }

    get message() { return this._message; }
}

export default SignInError;