import { state } from '../stores/index';

export default function (title, content, buttons = undefined, open = true) {
    state.update(data => {

        if ((!title || !content) && (open != undefined || open != null)) {
            data.dialog.open = open;
            return data;
        }

        if ((title || content)) {
            data.dialog.title = title;
            data.dialog.content = content;
            data.dialog.open = open;
            data.dialog.buttons = buttons;
            return data;
        }

        return data;
    })
}