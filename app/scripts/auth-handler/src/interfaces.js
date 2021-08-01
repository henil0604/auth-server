import helpers from './helpers';

let interfaces = {};

interfaces.Auth = (config) => {

    if (!helpers.validators.isObject(config)) {
        config = {};
    }

    config = helpers.validators.setDefault(config, "baseUrl", "http://localhost:3001");


    return config;
}











export default interfaces;