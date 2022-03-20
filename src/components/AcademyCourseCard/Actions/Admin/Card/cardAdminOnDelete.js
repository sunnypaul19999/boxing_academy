import AcademyAPI from "server/AcademyAPI/AcademyAPI";
import MainStore from "store/Main/MainStore";

export async function adminAcademyDeleteCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    let id = state.cardProp.id;
    let token = MainStore.store.getState().userDetails.token;
    if (token) {
        return AcademyAPI.delete(token, id);
        //return { payload: true }
    } else {
        nav('/signin');
    }
}

export function adminCourseDeleteCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    //TODO: send delete req to server
}