import { state } from '../stores/index';

export default function (bool = true) {
    state.update(data => {
        Object.assign(data, { isProgressing: bool });
        return data;
    })
}