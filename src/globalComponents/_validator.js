export function validateType(someThing) {
    return Object.prototype.toString.call(someThing).slice(8, -1)
}
export function isFunction(arg) {
    return ['Function', 'AsyncFunction'].includes(validateType(arg))
}
export function isObject(arg) {
    return validateType(arg) === 'Object'
}
export function isArray(arg) {
    return Array.isArray(arg) || validateType(arg) === 'Array'
}
export function isNumber(arg) {
    return validateType(arg) === 'Number' && isNaN(arg) !== true
}
export function isBoolean(arg) {
    return validateType(arg) === 'Boolean'
}
export function isString(arg) {
    return validateType(arg) === 'String'
}
export function isDate(arg) {
    return validateType(arg) === 'Date'
}
export function isBlank(arg) {
    const _type = validateType(arg);
    console.log(_type);
    if (["Null", "Undefined", "NaN"].includes(arg) === true) {
        return true;
    } else if (_type === "String" && arg.trim() === "") {
        return true;
    } else if (_type === "Object" && arg.toString() === "{}") {
        return true;
    }else if (_type === "Array" && arg.toString() === "[]") {
        return true;
    }
    return false;
}
