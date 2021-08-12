<script>

    import { fly } from 'svelte/transition';
    import { state }from '../stores';
    import Button, { Label } from '@smui/button';
    import Progress from '../helpers/Progress';
    import setDialog from '../helpers/setDialog';
    import request from '../helpers/request.js';
    import ChangeScreen from '../helpers/ChangeScreen';

    async function handleResendEmail(){
        Progress();

        let id = $state.temp["signup.done.id"];
        let email = $state.temp["signup.done.email"];

        let res  = await request.post(`@api/send-email-verification-mail/${id}?redirectWhenVerify=@current?to=emailverified`);

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
        
        if (res.data.status == "success") {
            setDialog("Success!", `
                Email has Been Resend to <b>${email}</b>
            `)
        }
        

        Progress(false);
    }

</script>

<div
    class="flex flex-col items-center w-full h-full px-6 py-3 relative"
    in:fly="{{ x: 400, duration: 200 }}"
    out:fly="{{x: -400, duration: 200}}"
>

    <div class="mail flex justify-center items-center">
        <i class="fas fa-envelope"></i>
    </div>

    <span class="mt-5">
        Please Check Inbox of <b>{$state.temp["signup.done.email"]}</b> to verify your account
    </span>

    <span class="flex mt-8 justify-center items-center">
        Didn't Received Email?
        
        <Button class="mx-3" on:click={handleResendEmail} variant="outlined">
            <Label>Resend</Label>
        </Button>

    </span>

    <span class="flex mt-8 justify-center items-center">
        Want to Signin?

        <Button class="mx-3" on:click={()=>{ChangeScreen("signin")}} variant="outlined">
            <Label>Signin</Label>
        </Button>

    </span>

</div>

<style>

    .mail {
        width: 100%;
        height: fit-content;
    }

    .mail i{
        font-size: 17rem;
    }


</style>