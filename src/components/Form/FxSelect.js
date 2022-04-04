import { useEffect, useRef, useState } from 'react';
import { formInputValidEvent } from './FormEvent';
import { markInputFieldError, markInputFieldNeutral, markInputFieldValid } from './FxInputFieldMarker';

//-----------props-----------
//id [id for input]
//label [input label]
/*
options: [
            {
                id: props.options[0].value,
                value: props.options[0].value,
                selected: props.options[0].selected,
                disabled: props.options[0].disabled,
            }
        ]
*/
//required [optional]
//disabled [optional]
//errorMsg [on input invalid error msg]
//---------------------------

export function FxSelectOption(props) {
    //-----------props-----------
    //id [id for input optional]
    //value
    //selected [optional]
    //disabled [optional]
    //---------------------------
    let option = () => {
        let optionalProps = {};
        if (props.selected) { optionalProps.selected = true; }
        if (props.disabled) { optionalProps.disabled = true; }

        return (<option {...optionalProps}>{props.value}</option>);
    }

    return option();
}

export default function FxSelect(props) {
    let iRef = useRef(null);

    let [state] = useState({
        id: props.id,
        label: props.label,
        options: props.options,
        required: (props.required) ? true : false,
        disabled: (props.disabled) ? true : false,
        errorMsg: props.errorMsg,
    });

    useEffect(() => {
        let inputElement = iRef.current;
        if (state.disabled || isInputNotRequired()) {
            setTimeout(() => {
                //markInputFieldNeutral(iRef, inputElement.classList);
                formInputValidEvent(inputElement, { id: inputElement.id });
            }, 0);
        }

        umbrellaParent().addEventListener('formxviResetEvent', onEventResetInputField);

        return (function clean() {
            umbrellaParent(inputElement).removeEventListener('formxviResetEvent', onEventResetInputField);
        });
    });

    let isValid = () => {
        if (iRef.current.hasAttribute('required')) {
            let optionElements = iRef.current.selectedOptions;
            if (optionElements.length === 0 || optionElements[0].hasAttribute('disabled')) { return false; }
        }
        return true;
    }

    let umbrellaParent = (inputElement) => {
        //input-fields
        return getParent(inputElement).parentElement;
    }

    let getParent = (inputElement) => {
        //input-field
        if (inputElement) { return inputElement.parentElement; }
        return iRef.current.parentElement;
    }

    let isInputNotRequired = () => { return !state.required; }


    let doValidation = () => {
        let elementClassList = getParent().classList;

        if (isValid()) {
            markInputFieldValid(iRef, elementClassList);
        } else {
            if (isInputNotRequired()) {
                markInputFieldNeutral(iRef, elementClassList);
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
            setValue(0);
            doValidation();
        }
    }

    //let getValue = () => { return iRef.current.value; }

    let setValue = (index) => { iRef.current.selectedIndex = index; }

    let getSelectElement = () => {
        let selectElementOptionalProps = {};
        if (state.disabled) {
            selectElementOptionalProps.disabled = true;
        } else {
            if (state.required) {
                selectElementOptionalProps.required = true;
            }
            selectElementOptionalProps.onInput = onInput;
        }

        /*let selectOptionElements = [];
        for (const optionProps of state.options) {
            selectOptionElements.push(
                <option {...optionProps}>{optionProps.value}</option>
            );
        }*/

        return (
            <select
                ref={iRef}
                id={state.id}
                className="form-select" {...selectElementOptionalProps}>
                {/*selectOptionElements*/}
                {props.children}
            </select>
        );
    }

    return (
        <span className="input-field">
            <label htmlFor={state.id} className="form-label">{state.label}</label>
            {getSelectElement()}
            <div className="inline-error-msg">{state.errorMsg}</div>
        </span>
    );
}