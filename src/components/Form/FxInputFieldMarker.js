import { formInputInvalidEvent, formInputValidEvent } from "./FormEvent";

export let markInputFieldError = (iRef, elementClassList) => {
    if (elementClassList.contains('valid')) {
        elementClassList.remove('valid');
    }
    if (!elementClassList.contains('error')) {
        elementClassList.add('error');
        formInputInvalidEvent(iRef.current, { id: iRef.current.id });
    }
}

export let markInputFieldValid = (iRef, elementClassList) => {
    if (elementClassList.contains('error')) {
        elementClassList.remove('error');
    }
    if (!elementClassList.contains('valid')) {
        elementClassList.add('valid');
        formInputValidEvent(iRef.current, { id: iRef.current.id });
    }
}

export let markInputFieldNeutral = (iRef, elementClassList) => {
    if (elementClassList.contains('valid')) {
        elementClassList.remove('valid');
    }
    if (elementClassList.contains('error')) {
        elementClassList.remove('error');
    }
    formInputValidEvent(iRef.current, { id: iRef.current.id });
}