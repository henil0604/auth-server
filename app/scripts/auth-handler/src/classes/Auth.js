import interfaces from '../interfaces';
import Emitter from '../emitter';



export default class Auth {

    constructor(config = {}) {
        this.config = interfaces.Auth(config);
        this.state = {
            Users: []
        }

    }






};