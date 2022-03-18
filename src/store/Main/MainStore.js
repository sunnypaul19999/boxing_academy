import { createStore } from 'redux';

export default class MainStore {
    _reduxTokenStore;
    static _mainStoreOb = null;

    constructor() {
        console.log('TokenStore class: Creating TokenStore object');
        this._reduxTokenStore = createStore(this.tokenStoreReducer);
    }

    tokenStoreReducer = (state, action) => {
        if (action.type === 'userDetails') {
            return {
                userDetails: {
                    token: action.payload.token,
                    name: action.payload.name,
                    email: action.payload.email,
                    authority: action.payload.authority,
                    mobileNo: action.payload.authority,
                },
            };
        } else if (action.type === 'academyDetails') {
            return {
                userDetails: (state.userDetails) ? state.userDetails : null,
                courseDetails: (state.courseDetails) ? state.courseDetails : null,
                academyDetails: action.payload,
            };
        } else if (action.type === 'courseDetails') {
            return {
                userDetails: (state.userDetails) ? state.userDetails : null,
                academyDetails: (state.academyDetails) ? state.academyDetails : null,
                courseDetails: action.payload,
            };
        }
    }

    static get store() {
        if (MainStore._mainStoreOb === null) {
            MainStore._mainStoreOb = new MainStore();
            return MainStore._mainStoreOb._reduxTokenStore;
        }
        return MainStore._mainStoreOb._reduxTokenStore;
    }
}