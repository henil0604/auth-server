import { state } from '../stores/index';
import tempStore from './tempStore';
import Progress from './Progress';

export default function (screen = "chooseaccount", setLastScreen = true) {
    Progress(true);
    setTimeout(() => {
        state.update(data => {
            if (setLastScreen) {
                tempStore.set("lastScreen", data.currentScreen)
            }
            Object.assign(data, { currentScreen: screen });
            return data;
        })
        Progress(false);
    }, 400);
}