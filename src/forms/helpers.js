function checkFormChanges(form, initialFormState) {
    const updatedFields = {};

    for (const key in form) {
        if (form[key] !== initialFormState.value[key]) {
            updatedFields[key] = form[key];
        }
    }

    return updatedFields;
}

function createFormData(fields) {
    const formData = new FormData();
    for (const key in fields) {
        if (fields[key] !== null && fields[key] !== undefined) {
            formData.append(key, fields[key]);
        }
    }

    return formData;
}

export {
    checkFormChanges,
    createFormData
}