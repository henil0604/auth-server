import helpers from './helpers';

let interfaces = {};

interfaces.Auth = (config) => {

    if (!helpers.validators.isObject(config)) {
        config = {};
    }

    config = helpers.validators.setDefault(config, "baseUrl", "http:/localhost:3001");

    config = helpers.validators.setDefault(config, "UI", interfaces.UI(config.UI));

    return config;
}

interfaces.UI = (config) => {

    if (!helpers.validators.isObject(config)) {
        config = {};
    }

    config = helpers.validators.setDefault(config, "themeColor", "#337AF1");

    config = helpers.validators.setDefault(config, "closable", true);

    return config;
}











export default interfaces;