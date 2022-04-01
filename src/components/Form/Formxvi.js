import produce from 'immer';
import { useEffect, useRef } from 'react';
import { formDisableSubmitButton, formEnableSubmitButton, formReset } from './FormEvent';

import 'assets/css/formxvi/formxvi-layout.css';

class FxInputFieldState {
    static state = {};
}

function useFxInputValidator(formElementRef, fxchildren) {
    //let [state, setState] = useState({});

    useEffect(() => {
        //console.log('FxInputFieldState rendered');
        let formElement = formElementRef.current;
        formElement.addEventListener('formxviInputInvalidEvent', onFormInvalidEvent);
        formElement.addEventListener('formxviInputValidEvent', onFormValidEvent);

        /*setState(
            produce(state, draft => {
                for (const fxchild of fxchildren) {
                    draft[`${fxchild.props.id}`] = false;
                }
            })
        );*/

        FxInputFieldState.state = produce(FxInputFieldState.state, draft => {
            for (const fxchild of fxchildren) {
                draft[`${fxchild.props.id}`] = false;
            }
        });

        //console.log(FxInputFieldState.state);

        return (function release() {
            formElement.removeEventListener('formxviInputInvalidEvent', onFormInvalidEvent);
            formElement.removeEventListener('formxviInputValidEvent', onFormValidEvent);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            formDisableSubmitButton(formElementRef.current);
        }
    }

    let onFormValidEvent = (event) => {
        //console.log('valid event caught');
        event.stopPropagation();
        let formElement = formElementRef.current;

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

            //console.log(FxInputFieldState.state);

            if (isAllInputFieldValid()) {
                console.log('all fields are valid');
                formEnableSubmitButton(formElement);
            } else {
                formDisableSubmitButton(formElement);
            }
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
    let formxviContainerRef = useRef();
    let formElementRef = useRef(null);
    let formSubmitButtonRef = useRef(null);
    let formResetButtonRef = useRef(null);

    useFxInputValidator(formElementRef, props.children);

    useEffect(() => {
        //console.log('Formxvi rendered');
        let formElement = formElementRef.current;

        formElement.addEventListener('formxviEnableSubmitButton', enableFormSubmitButton);
        formElement.addEventListener('formxviDisableSubmitButton', disableFormSubmitButton);

        return (function release() {
            formElement.removeEventListener('formxviEnableSubmitButton', enableFormSubmitButton);
            formElement.removeEventListener('formxviDisableSubmitButton', disableFormSubmitButton);
        });
    });


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
        let formData = new FormData(formElementRef.current);
        formData.forEach((value) => { console.log(value); });
    }

    let onSubmitButtonClick = (event) => {
        event.stopPropagation();
        console.log('submit form');
        formElementRef.current.requestSubmit();
    }

    let onResetForm = (event) => {
        event.stopPropagation();
        let inputField = document.querySelector('.formxvi-container .formxvi-layout .formxvi-form .input-fields');
        formReset(inputField);
    }

    return (
        <div className="formxvi-container" ref={formxviContainerRef}>
            <div className="formxvi-layout">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">Add Academy</div>
                        <form
                            ref={formElementRef}
                            className="formxvi-form" onSubmit={onFormSubmit}>

                            <div className="input-fields">
                                {props.children}
                            </div>

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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}