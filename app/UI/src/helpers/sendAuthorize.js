import Progress from './Progress';
import ChangeScreen from './ChangeScreen';
import Users from './Users';
import request from './request';

export default async (tokens) => {

    let toReturn = {};

    toReturn.tokens = tokens;
    toReturn.methods = {};

    toReturn.tokens.accessToken.__proto__.renew = async () => {
        return (await Users.reNewAccessToken(toReturn.tokens.refreshToken)).data.data.accessToken || null;
    }

    toReturn.methods.setProgress = Progress;
    toReturn.methods.setScreen = ChangeScreen;
    toReturn.methods.logout = async () => {

        let res = await request.post(
            `@api/logout`,
            {
                refreshToken: tokens.refreshToken
            }
        )

        return res?.data?.code == "logout_successful" || false;
    }

    window.Config.onAuthorize(toReturn);
}