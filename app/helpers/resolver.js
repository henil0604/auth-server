let toolBox = require("@henil0604/toolbox");

module.exports = (res) => {

    // Setting the resolver
    let resolve = (data, statusCode = 200) => {
	if(data.code){
		toolBox.logger(`Sent With Code ${data.code}`, "success", "[RESPONSE]")
	}
        if (!res.headerSent) {
            res.status(statusCode).json(data);
            return data;
        }
    }

    return resolve;
}
