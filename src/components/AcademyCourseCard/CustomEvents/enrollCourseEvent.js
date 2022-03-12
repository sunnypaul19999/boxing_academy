export function editCardEvent() {

    return new CustomEvent('enrollCourseEvent', {
        cancelable: false,
        bubbles: true
    });
}