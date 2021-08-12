import { state } from '../stores';
import TokenManager from './TokenManager';
import setDialog from './setDialog';
import request from './request';

let Users = {};

Users.getUserInfo = (accessToken) => {
    return new Promise(async resolve => {

        let user = await request.post(
            `@api/user`,
            {
                accessToken
            }
        )

        resolve(user);
    });
}

Users.reNewAccessToken = async (refreshToken) => {
    return new Promise(async resolve => {

        let renew = await request.post(
            `@api/access`,
            {
                refreshToken
            }
        )

        resolve(renew);
    })
}

export default Users;