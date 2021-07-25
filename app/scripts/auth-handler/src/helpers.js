let helpers = {};

helpers.validators = {};

helpers.validators.isObject = (obj) => {
    return typeof obj == "object" && obj != undefined && obj != null;
}

helpers.validators.contains = (obj, key) => {
    return obj[key] != undefined
}

helpers.validators.setDefault = (obj, key, defaultVal) => {
    if (!helpers.validators.contains(obj, key)) {
        obj[key] = defaultVal;
    }
    return obj;
}





export default helpers;