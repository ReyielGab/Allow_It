

/**
 * Field is Required
 * 
 * @export
 * @param {any} value 
 * @returns 
 */
export function required(value) { 
    return value == null || value === '' ? '*Required' : undefined;
}


/**
 * Accept Numbers Only
 * 
 * @export
 * @param {any} value
 * @returns
 */
export function number(value) {
    return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
}

export function confirmPassword(values, allValues) {
    return allValues.confirmpassword !== allValues.password ? '*Password isn\'t match' : undefined;
}