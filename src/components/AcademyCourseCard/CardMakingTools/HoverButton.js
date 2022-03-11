//props:
//id
//text (button name)
//color='brown' (for brown button, default is green)
export default function HoverButton(props) {
    return (
        <span class='hover-button'>
            <button
                id={props.buttonId}
                type="button"
                class={`btn ${props.color ?? ''}`}>
                <b>{props.text}</b>
            </button>
        </span>
    );
}