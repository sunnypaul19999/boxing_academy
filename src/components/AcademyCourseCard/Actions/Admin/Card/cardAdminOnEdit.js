import AcademyAPI from "server/AcademyAPI/AcademyAPI";

export function adminEditCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    AcademyAPI.fetchById(state.cardProp.id).then((res) => {
        nav(`${state.cardProp.id}/edit`, { state: res.payload.academy });
    });
}