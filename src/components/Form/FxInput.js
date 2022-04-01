import { useEffect, useRef, useState } from 'react';
import { formInputValidEvent } from './FormEvent';
import { markInputFieldError, markInputFieldNeutral, markInputFieldValid } from './FxInputFieldMarker';

//-----------props-----------
//id [id for input]
//label [input label]
//defValue [optional input value]
//placeholder [optional: input placeholder]
//required [is optional]
//disabled [to disable input]
//regex [to check validity of input]
//errorMsg [on input invalid error msg]
//---------------------------
export default function FxInput(props) {
    let iRef = useRef(null);

    let [state] = useState({
        id: props.id,
        label: props.label,
        defValue: props.defValue,
        placeholder: props.placeholder,
        required: (props.required) ? true : false,
        disabled: (props.disabled) ? true : false,
        regex: props.regex,
        errorMsg: props.errorMsg,
    });

    useEffect(() => {
        let inputElement = iRef.current;
        if (state.disabled || isInputNotRequired()) {
            setTimeout(() => {
                formInputValidEvent(inputElement, { id: inputElement.id });
            }, 100);
        }

        getParent().addEventListener('formxviResetEvent', onEventResetInputField);

        return (function clean() {
            getParent(inputElement).removeEventListener('formxviResetEvent', onEventResetInputField);
        });
    });

    let isValid = () => {
        if (state.regex) {
            return Boolean(getValue().match(state.regex))
        }
        return Boolean(getValue());
    }

    let getParent = (inputElement) => {
        if (inputElement) { return inputElement.parentElement.parentElement; }
        return iRef.current.parentElement.parentElement;
    }

    let isInputNotRequired = () => { return !state.required; }


    let doValidation = () => {
        let elementClassList = iRef.current.parentElement.classList;

        if (isValid()) {
            markInputFieldValid(iRef, elementClassList);
        } else {
            if (isInputNotRequired()) {
                if (!state.regex || getValue() === '') {
                    markInputFieldNeutral(iRef, elementClassList);
                    return;
                }
            }
            markInputFieldError(iRef, elementClassList);
        }
    }


    let onInput = (event) => {
        event.stopPropagation();
        doValidation();
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

    let getValue = () => { return iRef.current.value; }

    let setValue = (value) => { iRef.current.value = value; }

    let getInput = () => {
        let optionalProps = {};

        if (state.defValue) {
            optionalProps.value = state.defValue;
        }

        if (state.placeholder) {
            optionalProps.placeholder = state.placeholder;
        }

        if (state.disabled) {
            optionalProps.disabled = true;
        } else {
            if (state.required) {
                optionalProps.required = true;
            }

            optionalProps.onInput = onInput;
        }
        //console.log(optionalProps);

        let inputEl = (
            <input
                ref={iRef}
                id={state.id}
                name={props.label}
                type='text' className="form-control" {...optionalProps} />
        );

        if (state.disabled) { return inputEl; }

        return (
            <>
                {inputEl}
                <div className="inline-error-msg">{state.errorMsg}</div>
            </>
        );
    }


    return (
        <span className="input-field">
            <label htmlFor={state.id} className="form-label">{state.label}</label>
            {getInput()}
        </span>
    );
}