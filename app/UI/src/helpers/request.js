let request = {}

request.ajax = async (url, data = {}, method = "POST") => {
    return new Promise(async resolve => {
        var formData = new FormData();

        for (var key in data) {
            formData.append(key, data[key]);
        }

        data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        $.ajax({
            url: url,
            data: data,
            processData: false,
            contentType: false,
            type: method
        }).done(function (data, status) {
            resolve({ data, status, err: null })
        }).fail(function (xhr, status, err) {
            let d = null;

            try {
                d = JSON.parse(xhr.responseText);
            } catch {
                d = xhr.responseText;
            }

            resolve({ data: d, status, err })
        });

    })
}

request.post = (url, data = {}) => {
    return request.ajax(url, data, "POST");
}

request.get = (url, data = {}) => {
    return request.ajax(url, data, "GET");
}





export default request;