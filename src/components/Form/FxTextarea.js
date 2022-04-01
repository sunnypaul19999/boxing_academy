import { useEffect, useRef, useState } from 'react';
import { formInputValidEvent } from './FormEvent';
import { markInputFieldError, markInputFieldNeutral, markInputFieldValid } from './FxInputFieldMarker';

//-----------props-----------
//id [id for input]
//label [input label]
//placeholder [input placeholder]
//required [is optional]
//errorMsg [on input invalid error msg]
//---------------------------
export default function FxTextarea(props) {
    let iRef = useRef(null);

    let [state] = useState({
        id: props.id,
        label: props.label,
        placeholder: props.placeholder,
        required: (props.required) ? true : false,
        disabled: (props.disabled) ? true : false,
        errorMsg: props.errorMsg,
    });

    useEffect(() => {
        let inputElement = iRef.current;
        if (state.disabled || isInputNotRequired()) {
            setTimeout(() => {
                formInputValidEvent(inputElement, { id: inputElement.id });
            }, 100);
        }

        umbrellaParent().addEventListener('formxviResetEvent', onEventResetInputField);

        return (function clean() {
            umbrellaParent(inputElement).removeEventListener('formxviResetEvent', onEventResetInputField);
        });
    });

    let isValid = () => {
        if (state.regex) {
            return Boolean(getValue().match(state.regex))
        }
        return Boolean(getValue());
    }

    let umbrellaParent = (inputElement) => {
        //input-fields
        return getParent(inputElement).parentElement;
    }

    let getParent = (inputElement) => {
        //input-field
        if (inputElement) { return inputElement.parentElement.parentElement; }
        return iRef.current.parentElement.parentElement;
    }

    let isInputNotRequired = () => { return !state.required; }


    let doValidation = () => {
        let parentClassList = getParent().classList;


        if (isValid()) {
            markInputFieldValid(iRef, parentClassList);
        } else {
            if (isInputNotRequired()) {
                if (!state.regex || getValue() === '') {
                    markInputFieldNeutral(iRef, parentClassList);
                    return;
                }
            }
            markInputFieldError(iRef, parentClassList);
        }
    }

    let onEventResetInputField = (event) => {
        event.stopPropagation();
        if (state.disabled) {
            return;
        } else {
            setValue('');
            doValidation();
        }
    }

    let onInput = (event) => {
        event.stopPropagation();
        doValidation();
    }

    let getValue = () => { return iRef.current.value; }

    let setValue = (value) => { iRef.current.value = value; }

    let getTextareaElement = () => {
        let textareaOptionalProps = {};
        if (state.placeholder) {
            textareaOptionalProps.placeholder = state.placeholder;
        }
        if (state.disabled) {
            textareaOptionalProps.disabled = true;
        } else {
            if (state.required) {
                textareaOptionalProps.required = true;
            }
            textareaOptionalProps.onInput = onInput;
        }
        return (
            <textarea
                ref={iRef}
                id={state.id}
                className="form-control"
                style={{ height: '100px' }} {...textareaOptionalProps}></textarea>);
    }

    return (
        <div className="input-field text-area">
            <div className="form-floating">
                {getTextareaElement()}
                <label htmlFor={state.id}>{state.label}</label>
                <div className="inline-error-msg">{state.errorMsg}</div>
            </div>
        </div>
    );
}