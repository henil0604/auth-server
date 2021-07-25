import interfaces from '../interfaces';
import Emitter from '../emitter';

function createDOM(config) {

    let DOMS = {};

    DOMS.main = null;
    DOMS.card = null;

    DOMS.main = document.createElement("div");
    DOMS.main.style.width = "100%";
    DOMS.main.style.height = "100%";
    DOMS.main.style.backgroundColor = config.themeColor;
    DOMS.main.id = "___AUTH_HANDLER_UI_DOM"
    DOMS.main.className = "absolute top-0 left-0 flex justify-center items-center"

    DOMS.card = document.createElement("div");
    DOMS.card.style.width = "fit-content";
    DOMS.card.style.height = "fit-content";
    DOMS.card.style.backgroundColor = "#ffffff";
    DOMS.card.className = "p-10 px-20 rounded-lg flex justify-center items-center flex-column";


    DOMS.card.appendChild(DOMS.card_tabs);
    DOMS.main.appendChild(DOMS.card);

    return DOMS.main;
}



export default class UI {

    constructor(config = {}) {
        this.config = interfaces.UI(config);
        this.state = {
            opened: false
        }

        this.DOM = createDOM(this.config);

    }

    open() {
        if (!this.state.opened) {
            document.body.append(this.DOM);

            this.state.opened = true;
        }
    }

    close() {
        if (this.state.opened) {
            document.getElementById("___AUTH_HANDLER_UI_DOM")?.remove()

            this.state.opened = false;
        }
    }



};