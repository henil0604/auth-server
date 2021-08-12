import Progress from './Progress';
import delayer from './delayer';
import setDialog from './setDialog';
import request from './request';
import ChangeScreen from './ChangeScreen';
import tempStore from './tempStore';

export default async function (data) {
    Progress();

    data.redirectWhenVerify = `@current?to=emailverified`;

    try {
        let res = await request.post(
            "@api/register",
            data
        );

        if (res.status == "error" && res.err != null && res.data == null) {
            setDialog("OOPS!", `
                Something Really Went Wrong!
            `)
            Progress(false);
            return;
        }

        if (res.data.status != "success") {
            setDialog("OOPS!", `
                <br />
                <p> Message: ${res.data.message} </p>
                <p> Code: <i>${res.data.code}</i> </p>
            `)
            Progress(false);
            return;
        }

        if (res.data.status == "success" && res.data.code == "user_created") {
            tempStore.set("signup.done.email", res.data.data.email);
            tempStore.set("signup.done.id", res.data.data.id);
            ChangeScreen("confirmemail")
        }

    } catch (e) {
        console.warn(e)
        setDialog("OOPS!", `
            Something Really Went Wrong!
        `)
    }

    await delayer(300);
    Progress(false);
}