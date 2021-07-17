const toolBox = require("@henil0604/toolbox");


module.exports = (template, data = {}) => {


    try {
        let html = toolBox.fs.sync.readFile(
            `${__dirname}/../templates/${template}.html`
        );

        html = html.toString();

        for (key of Object.keys(data)) {
            let regex = new RegExp(`{${key}}`, "g");
            html = html.replace(regex, data[key]);
        }

        return html;
    } catch (e) {
        return '';
    }
}