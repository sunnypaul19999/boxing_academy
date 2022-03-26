import Database from "database/Database";
import AcademyAPI from "server/AcademyAPI/AcademyAPI";

export async function adminAcademyDeleteCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    try {
        let id = state.cardProp.id;
        return await AcademyAPI.delete(id);
    } catch (err) {
        nav('/signin');
    }
}

export function adminCourseDeleteCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    //TODO: send delete req to server
}