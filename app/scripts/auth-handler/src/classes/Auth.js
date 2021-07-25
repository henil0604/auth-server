import interfaces from '../interfaces';
import UI from './UI';
import Emitter from '../emitter';



export default class Auth {

    constructor(config = {}) {
        this.config = interfaces.Auth(config);
        this.UI = new UI(config.UI);
    }







};