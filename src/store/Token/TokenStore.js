import { createStore } from 'redux';

export default class TokenStore {
    _reduxTokenStore;
    static _tokenStoreOb = null;

    constructor() {
        console.log('TokenStore class: Creating TokenStore object');
        this._reduxTokenStore = createStore(this.tokenStoreReducer);
    }

    tokenStoreReducer = (state, action) => {
        if (action.type === 'saveAuthToken') {
            return {
                token: action.payload.token,
            }
        }
    }

    static get store() {
        if (TokenStore._tokenStoreOb === null) {
            TokenStore._tokenStoreOb = new TokenStore();
            return TokenStore._tokenStoreOb._reduxTokenStore;
        }
        return TokenStore._tokenStoreOb._reduxTokenStore;
    }
}