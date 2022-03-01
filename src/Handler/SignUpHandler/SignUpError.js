class SignUpError extends Error {
    _message;

    constructor(message) {
        super(message);
        this.name = 'SignUpError';
        this._message = message;
    }

    get message() { return this._message; }
}

export default SignUpError;