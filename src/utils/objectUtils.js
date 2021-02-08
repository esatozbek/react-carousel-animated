export function isObject(obj) {
    return typeof obj === "object";
}

export function hasKeys(obj, ...keys) {
    return Object.keys(obj).every((key) => keys.includes(key));
}
