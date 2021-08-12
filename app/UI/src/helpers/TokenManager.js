import randomToken from './randomToken';

let TokenManager = {};


TokenManager.interface = (data = {}) => {

    if (typeof data != "object" || Array.isArray(data)) {
        data = {};
    }

    if (data.refreshToken == undefined) {
        throw new Error("Refresh Tokne must be Provided")
    }

    if (data.accessToken == undefined) {
        throw new Error("Access Tokne must be Provided")
    }

    data.managerId = randomToken(12);
    data.timeStamp = Date.now();

    return data;
}


TokenManager.add = (data) => {
    data = TokenManager.interface(data);

    let instance = TokenManager.instance();

    if (TokenManager.get({ email: data.email }).length != 0) {
        return "email_already_exists";
    }

    instance.update(d => {
        d.managers.push(data);
        return d;
    })

    return data.managerId;
}

TokenManager.edit = (managerId, data) => {

    let instance = TokenManager.instance();

    let found = TokenManager.get({ managerId });

    if (found.length == 0) {
        return "email_does_not_exists";
    }

    instance.update(d => {
        found.forEach((manager, index) => {

            for (let i = 0; i < Object.keys(data).length; i++) {
                let key = Object.keys(data)[i];
                let val = data[key];
                d.managers[index][key] = val;
            }

        })

        return d;
    })

    return found;
}

TokenManager.remove = (managerId) => {

    let instance = TokenManager.instance();

    let found = TokenManager.get({ managerId });

    console.log("Removing: ", found);

    if (found.length == 0) {
        return "email_does_not_exists";
    }

    instance.update(d => {
        found.forEach((manager, index) => {
            d.managers.splice(index, 1);
        })

        return d;
    })

    return found;
}

TokenManager.get = (data) => {
    let toReturn = [];
    let { instance } = TokenManager.instance();

    for (let i = 0; i < instance.managers.length; i++) {
        let manager = instance.managers[i];
        for (let j = 0; j < Object.keys(data).length; j++) {
            let key = Object.keys(data)[i];
            let value = data[key];

            if (manager[key] == value) {
                toReturn.push({ manager, index: i });
                continue;
            }
        }
    }

    return toReturn;
}

TokenManager.instance = () => {
    let instance = localStorage.getItem("__TM");

    let get = () => {
        return TokenManager.decrypt(localStorage.getItem("__TM"));
    }

    let set = (instance) => {
        localStorage.setItem("__TM", TokenManager.encrypt(instance));
    }

    if (instance == null) {
        let data = {
            managers: []
        }

        set(data);

        instance = get();
    }

    return {
        instance: get(),
        update: (func = () => { }) => {

            let run = func(get());

            if (run == undefined) {
                return false;
            }

            set(run);

            return run;
        }
    }
}

TokenManager.encrypt = (data) => {
    return btoa(JSON.stringify(data));
}

TokenManager.decrypt = (str) => {
    return JSON.parse(atob(str));
}





export default TokenManager;