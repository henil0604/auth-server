

<script>
    
    import ScriptLoader from './ScriptLoader.svelte';
    import Progressing from './Progressing.svelte';
    import getGoogleOAuthClientId from '../helpers/getGoogleOAuthClientId';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let data = {
        loaded: {
            google: false
        },
        ref: {
            google: null
        },
        load: {
            google: null
        }
    };

    data.load.google = async ()=>{
        let profile = await data.ref.google.signIn();
        let basicProfile = profile.getBasicProfile();

        dispatch("authorize", {
            method: "google",
            data: {
                email: basicProfile.getEmail(),
                username: basicProfile.getName(),
                authId: basicProfile.getId(),
                imageUrl: basicProfile.getImageUrl()
            }
        });

    }


    function onLoad(){
        gapi.load('auth2', async function() {

            data.ref.google = gapi.auth2.init({
                client_id: getGoogleOAuthClientId()
            })

            data.loaded.google = true;
        })
    }

</script>

<ScriptLoader url="https://apis.google.com/js/platform.js" on:loaded={onLoad} />

<div class="flex justify-center items-center flex-col relative">

    <div class="google hover:shadow-md relative" on:click={data.load.google}>
        {#if !data.loaded.google}
            <Progressing />
        {/if}

        <i class="fab fa-google mx-3"></i>
        Continue With Google
    </div>

</div>

<style>
    

    div{
        width: fit-content;
        height: fit-content;
        padding: 6px 15px;
        background-color: #fff;
    }

    div.google{
        width: fit-content;
        height: fit-content;
        border: 1px solid #ccc;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items:center;
        cursor: pointer;
        transition: .3s;
    }


</style>