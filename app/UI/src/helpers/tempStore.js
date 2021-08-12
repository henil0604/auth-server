import { state } from '../stores/index';
let temp = {};


temp.set = (key, val) => {
    state.update(data => {
        data.temp[key] = val;
        return data;
    })
};

temp.get = (key) => {
    return state.temp[key];
}


export default temp;