import { useRef, useState } from 'react';
import { formInputValidEvent } from './FormEvent';

//-----------props-----------
//id [id for input]
//label [input label]
/*
options: [
            {
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

    let onInput = (event) => {
        event.stopPropagation();
        let parentClassList = iRef.current.parentElement.classNameList;
        if (parentClassList.contains('error')) {
            parentClassList.remove('error');
        }
        if (!parentClassList.contains('valid')) {
            parentClassList.add('valid');
        }

        formInputValidEvent({ id: iRef.current.id });
    }

    //let getValue = () => { return iRef.current.value; }

    let getSelectElement = () => {
        let selectElementOptionalProps = {};
        if (state.disabled) {
            selectElementOptionalProps.disabled = true;
        } else {
            if (state.required) {
                selectElementOptionalProps.required = true;
                selectElementOptionalProps.onInput = onInput;
            }
        }

        let selectOptionElements = [];
        for (const optionProps of state.options) {
            selectOptionElements.push(
                <option {...optionProps}>{optionProps.value}</option>
            );
        }

        return (
            <select
                ref={iRef}
                id={state.id}
                className="form-select" {...selectElementOptionalProps}>
                {selectOptionElements}
            </select>
        )
    }

    return (
        <span className="input-field error">
            <label htmlFor={state.id} className="form-label">{state.label}</label>
            {getSelectElement()}
            <div className="inline-error-msg">{state.errorMsg}</div>
        </span>
    );
}