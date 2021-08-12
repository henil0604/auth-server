<script>
import Progressing from './Progressing.svelte';
import ChooseAccount from './ChooseAccount.svelte';
import SignUp from './SignUp.svelte';
import Dialog, { Title, Content, Actions } from '@smui/dialog';
import { state } from '../stores';
import Button, { Label } from '@smui/button';
import ConfirmEmail from './ConfirmEmail.svelte';
import ChangeScreen from '../helpers/ChangeScreen';
import EmailVerified from './EmailVerified.svelte';
import SignIn from './SignIn.svelte';
import { onMount } from 'svelte';
import Progress from '../helpers/Progress';

import ScriptLoader from './ScriptLoader.svelte';

let allScriptLoaded = false;

let toLoad = [
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
];

if(new URL(window.location.href).searchParams.get("to")){
    ChangeScreen(new URL(window.location.href).searchParams.get("to"));
}

onMount(()=>{
    Progress();
})


function allLoaded(){
    allScriptLoaded = true;
    Progress(false)
}



</script>

<ScriptLoader url={toLoad} on:loaded={allLoaded}/>

<main class="border border-gray-300 rounded relative overflow-hidden relative">

    {#if $state.temp.lastScreen != "" && $state.temp.lastScreen != undefined && $state.temp.lastScreen != $state.currentScreen}
        <div class="go-to-last-screen">
            <Button class="absolute top-0 left-0" on:click={()=>{ChangeScreen($state.temp.lastScreen, false)}}>
                <i class="fas fa-arrow-left"></i>
            </Button>
        </div>
    {/if}

    {#if $state.dialog.open}
        <Dialog style={{'z-index': 99999}} bind:open={$state.dialog.open}>
            <Title>{$state.dialog.title}</Title>
            <Content>
                    {@html $state.dialog.content}
            </Content>
            <Actions>
                {#if $state.dialog.buttons == undefined}
                    <Button on:click={() => ($state.dialog.open = false)}>
                        <Label>OK</Label>
                    </Button>
                {:else}
                    {#each $state.dialog.buttons as btn, i}
                         <Button on:click={btn.onclick}>
                            <Label>{btn.label}</Label>
                        </Button>
                    {/each}
                {/if}
            </Actions>
        </Dialog>
    {/if}

    {#if $state.isProgressing}
        <Progressing />
    {/if}

    {#if allScriptLoaded}

        <div class="p-2 main flex flex-col items-center w-full h-full">

            {#if $state.currentScreen == "signup"}
                <SignUp />
            {:else if $state.currentScreen == "confirmemail"}
                <ConfirmEmail />
            {:else if $state.currentScreen == "emailverified"}
                <EmailVerified />
            {:else if $state.currentScreen == "signin"}
                <SignIn />
            {:else}
                Something Went Wrong!
            {/if}

        </div>
    {/if}

</main>



<style>

    main{
        width: fit-content;
        height: fit-content;
        min-width: 400px;
        min-height: 500px;
    }

    main > .main{
        display: flex;
        align-items:center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    main > .go-to-last-screen{
        position: absolute;
        top: 0;
        left: 0;
        width: fit-content;
        height: fit-content;
        z-index: 2;
    }


    @media only screen and (max-width: 767px){
        main{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

</style>