import produce from 'immer';
import { useEffect, useRef } from 'react';
import { formDisableSubmitButton, formEnableSubmitButton, formReset } from './FormEvent';

import 'assets/css/formxvi/formxvi-layout.css';
import FxInput from './FxInput';
import FxTextarea from './FxTextarea';
import FxSelect from './FxSelect';

//--------props-------
//title [form title]
//FxElements
//--------------------

class FxInputFieldState {
    static state = {};
}

function useFxInputValidator(formElementRef, fxchildren, isChild) {
    //let [state, setState] = useState({});


    useEffect(() => {
        //console.log('FxInputFieldState rendered');
        if (!isChild) {
            let formElement = getFormElement();
            formElement.addEventListener('formxviInputInvalidEvent', onFormInvalidEvent);
            formElement.addEventListener('formxviInputValidEvent', onFormValidEvent);

            setTimeout(inputValidation, 0);

            /*setState(
                produce(state, draft => {
                    for (const fxchild of fxchildren) {
                        draft[`${fxchild.props.id}`] = false;
                    }
                })
            );*/

            FxInputFieldState.state = produce(FxInputFieldState.state, draft => {
                for (const fxchild of fxchildren) {
                    if (fxchild.type === FxInput || fxchild.type === FxSelect || fxchild.type === FxTextarea) {
                        draft[`${fxchild.props.id}`] = false;
                    }
                }
            });

            //console.log(FxInputFieldState.state);

            return (function release() {
                formElement.removeEventListener('formxviInputInvalidEvent', onFormInvalidEvent);
                formElement.removeEventListener('formxviInputValidEvent', onFormValidEvent);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let getFormElement = () => { return formElementRef.current; }

    let onFormInvalidEvent = (event) => {
        //console.log('invalid event caught');
        event.stopPropagation();
        if (event.detail) {
            let invalidInputId = event.detail.payload.id;

            /*
            console.log(FxInputFieldState.state);
            setState(
                produce(state, draft => {
                    draft[`${invalidInputId}`] = false;
                })
            );*/

            FxInputFieldState.state = produce(FxInputFieldState.state, draft => {
                draft[`${invalidInputId}`] = false;
            });
            formDisableSubmitButton(getFormElement());
        }
    }

    let onFormValidEvent = (event) => {
        //console.log('valid event caught');
        event.stopPropagation();

        if (event.detail) {
            let validInputId = event.detail.payload.id;
            //console.log(validInputId);

            /*
            setState(
                produce(state, draft => {
                    draft[`${validInputId}`] = true;
                })
            );
            console.log(state);
            */

            FxInputFieldState.state = produce(FxInputFieldState.state, draft => {
                draft[`${validInputId}`] = true;
            });

            inputValidation();

            //console.log(FxInputFieldState.state);

        }

    }

    let inputValidation = () => {
        if (isAllInputFieldValid()) {
            console.log('all fields are valid');
            formEnableSubmitButton(getFormElement());
        } else {
            formDisableSubmitButton(getFormElement());
        }
    }

    let isAllInputFieldValid = () => {
        let flag = true;

        for (const isValid of Object.values(FxInputFieldState.state)) {
            if (!isValid) { flag = false; break; }
        }

        //console.log(FxInputFieldState.state);

        return flag;
    }

}

export default function Formxvi(props) {
    let formxviContainerRef = useRef(null);
    let formElementRef = useRef(null);
    let formSubmitButtonRef = useRef(null);
    let formResetButtonRef = useRef(null);

    let isFormChild = () => { return Boolean(props.child); }

    useFxInputValidator(formElementRef, (props.children[Symbol.iterator]) ? props.children : [props.children], isFormChild());

    useEffect(() => {
        //console.log('Formxvi rendered');
        let formElement = getFormElement();

        if (!isFormChild()) {
            formElement.addEventListener('formxviEnableSubmitButton', enableFormSubmitButton);
            formElement.addEventListener('formxviDisableSubmitButton', disableFormSubmitButton);

            return (function release() {
                formElement.removeEventListener('formxviEnableSubmitButton', enableFormSubmitButton);
                formElement.removeEventListener('formxviDisableSubmitButton', disableFormSubmitButton);
            });
        }
    });

    let getFormElement = () => { return formElementRef.current; }


    let enableFormSubmitButton = (event) => {
        //console.log('enable submit button');
        event.stopPropagation();
        if (formSubmitButtonRef.current.hasAttribute('disabled')) {
            formSubmitButtonRef.current.removeAttribute('disabled');
        }
    }

    let disableFormSubmitButton = (event) => {
        //console.log('disable submit button');
        event.stopPropagation();
        if (!formSubmitButtonRef.current.hasAttribute('disabled')) {
            formSubmitButtonRef.current.setAttribute('disabled', '');
        }
    }

    let onFormSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let formData = new FormData(getFormElement());
        formData.forEach((value) => { console.log(value); });
    }

    let onSubmitButtonClick = (event) => {
        event.stopPropagation();
        console.log('submit form');
        getFormElement().requestSubmit();
    }

    let onResetForm = (event) => {
        event.stopPropagation();
        let inputField = document.querySelectorAll('.formxvi-container .formxvi-layout .input-fields');
        inputField.forEach((inputField) => { formReset(inputField); });
        //formReset(inputField);
    }



    let getFormButtons = () => {
        if (isFormChild()) return (<></>);
        return (
            <div className="formxvi-buttons">
                <button
                    ref={formResetButtonRef}
                    type="button"
                    className="btn btn-danger btn-sm" onClick={onResetForm}>RESET</button>
                <button
                    ref={formSubmitButtonRef}
                    type="button"
                    className="btn btn-primary btn-sm" onClick={onSubmitButtonClick}>SUBMIT</button>
            </div>
        );
    }

    let getFormLayout = () => {
        return (
            <div className={isFormChild() ? "formxvi-layout child" : "formxvi-layout"}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{props.title}</div>


                        <div className="input-fields">
                            {props.children}
                        </div>

                        {getFormButtons()}

                    </div>
                </div>
            </div>
        );
    }

    let getFormContainer = () => {
        return (
            <div
                className={isFormChild() ? "formxvi-container child" : "formxvi-container"}
                ref={formxviContainerRef}>

                {getFormLayout()}

            </div>
        );
    }

    let getForm = () => {
        if (isFormChild()) {
            return getFormContainer();
        }
        return (
            <form
                ref={formElementRef}
                className="formxvi-form" onSubmit={onFormSubmit}>

                {getFormContainer()}

            </form>
        )
    }

    return getForm();
}