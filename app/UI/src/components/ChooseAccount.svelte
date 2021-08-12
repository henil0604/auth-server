<script>
import Button, { Label } from '@smui/button';
import {state} from '../stores/index';
import { fly } from 'svelte/transition';
import ChangeScreen from '../helpers/ChangeScreen';
import { onMount } from 'svelte';
import Users from '../helpers/Users';
import Progress from '../helpers/Progress';

let fetchedUsers = null;

onMount(async ()=>{
    fetchedUsers = await fetchUsers();
})

let fetchUsers = async ()=>{
    return await Users.fetch();
}

async function logout(email){
    Progress()
    let loggedOut = await Users.remove(email);
    if(loggedOut){
        fetchedUsers = await fetchUsers();
    }
    Progress(false);
}

function authorize(user, manager){
    Progress();

    let toReturn = {};

    try{
        delete user.exp;
        delete user.iat;
    }catch{}

    toReturn.user = user;
    toReturn.methods = {};
    toReturn.tokens = {
        refreshToken: manager.refreshToken,
        accessToken: manager.accessToken
    }

    toReturn.tokens.accessToken.__proto__.renew = async ()=>{
        let res = await Users.reNewAccessToken(toReturn.tokens.refreshToken);

        if(res.data.code != "access_token_generated"){
            return null;
        }

        return res.data.data.accessToken;
    }

    toReturn.methods.setProgress = Progress;
    toReturn.methods.setScreen = ChangeScreen;
    toReturn.methods.getUserInfo = Users.getUserInfo;

    if(typeof window.Config.onAuthorize == "function"){
        window.Config.onAuthorize(toReturn);
    }

    Progress(false);
}


</script>


<main 
    class="flex flex-col items-center w-full h-full px-10 py-7"
    in:fly="{{ x: 400, duration: 200 }}"
    out:fly="{{x: -400, duration: 200}}"
>

    <header>
        Choose Account
    </header>

    

    {#if Array.isArray(fetchedUsers)}
        {#each fetchedUsers as {user, manager}, i}
            <div class="user" on:click={(e)=>{
                authorize(user, manager);
            }}>

                <div class="info">
                    <div class="username">
                        {user.username}
                    </div>
                    <div class="email">
                        {user.email}
                    </div>
                </div>

                <div class="logout" on:click={(e)=>{
                        e.stopPropagation();
                        logout(user.email);
                    }}>
                    <i class="fas fa-times-circle"></i>
                </div>

            </div>
        {/each}
    {/if}


    <div class="user" on:click={()=>{ChangeScreen("signin")}}>
        <div class="avatar"><i class="fas fa-plus-circle"></i></div>

        Add Account
    </div>

    
</main>

<style>

    main > header{
        font-size: 30px;
        margin: 40px 0;
    }

    .user{
        width: 100%;
        height: fit-content;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        position: relative;
        padding: 6px 20px;
        transition: .1s;
        cursor: pointer;
    }

    .user > .avatar{
        width: 40px;
        height: 40px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
 
    .user > .info {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: column;
    }

    .user > .info > .username {
        font-size: 16px;
    }

    .user > .info > .email {
        font-size: 13px;
        font-weight: 800;
        color: #777;
    }

    .user > .logout{
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: 100%;
        position: absolute;
        right: 10px;
        font-size: 25px;
    }

    .user > .logout:hover {
        color: red;
    }

    .user:hover{
        background-color: #ddd;
    }


</style>