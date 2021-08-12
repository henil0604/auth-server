import Progress from './Progress';
import request from './request';
import setDialog from './setDialog';
import delayer from './delayer';
import sendAuthorize from './sendAuthorize';


export default async function (data) {
    Progress();

    try {
        let res = await request.post(
            "@api/login",
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

        if (res.data.status == "success" && res.data.code == "logged_in") {
            sendAuthorize(res.data.data)
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