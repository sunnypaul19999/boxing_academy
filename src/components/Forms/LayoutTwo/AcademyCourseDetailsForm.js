import { useRef } from "react";
import HoverButton from "components/AcademyCourseCard/CardMakingTools/HoverButton";

import 'assets/css/form/form-layout-two.css';

//---------------props------------------
//input(4-5)
//submitButton: {name, text, id, onSubmit}
//--------------------------------------
export default function AcademyCourseDetailsForm(props) {

    let formRef = useRef(null);

    let onButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        formRef.current.requestSubmit();
    }

    return (
        <>
            <div class="form-layout">
                <form ref={formRef} action="" onSubmit={props.submitButton.onSubmit}>
                    <div class="form-field">
                        <div class="form-field-left">
                            {props.children[0] ?? (<></>)}
                            {props.children[1] ?? (<></>)}
                            {props.children[2] ?? (<></>)}
                        </div>
                        <div class="form-field-right">
                            {props.children[3] ?? (<></>)}
                            {props.children[4] ?? (<></>)}
                            {props.children[5] ?? (<></>)}
                        </div>
                    </div>
                </form>
            </div>
            <HoverButton id={props.submitButton.id} text={props.submitButton.text} onClick={onButtonClick} />
        </>
    );
}