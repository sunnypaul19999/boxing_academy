export function adminEditCardEvent(event, state, nav) {
    event.preventDefault();
    event.stopPropagation();
    nav(`${state.cardProp.id}/edit`);
}