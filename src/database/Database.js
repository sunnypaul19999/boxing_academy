import localforage from "localforage";

export default class Database {

    static setToken(token) {
        return localforage.setItem('token', token);
    }

    static getToken() {
        return localforage.getItem('token');
    }

    static setCurrUserEmail(email) {
        return localforage.setItem('currUseremail', email);
    }

    static getCurrUserEmail() {
        return localforage.getItem('currUseremail');
    }
}