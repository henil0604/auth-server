<script>
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text/index';
    import CharacterCounter from '@smui/textfield/character-counter/index';
    import { fly } from 'svelte/transition';
    import ChangeScreen from '../helpers/ChangeScreen';
    import Button, { Label } from '@smui/button';
    import { onMount } from 'svelte';
    import getGoogleOAuthClientId from '../helpers/getGoogleOAuthClientId';
    import OAuth from './OAuth.svelte';
    import SignUp from '../helpers/SignUp';
    
    let data = {
        username: "123",
        email: "henilmalaviya06@gmail.com",
        password: "123",
        confirmPassword: "123",
        method: "auth",
        isValid: false,
        invalidEmail: true,
    };
    
    onMount(async () => {
        data.password = "";
        data.confirmPassword = "";

        OnInput();
    })

    function OnInput(e){

        let valid = isValidData();

        data.isValid = valid;

    }

    function handleOAuth({detail}){
        SignUp({
            email: detail.data.email,
            username: detail.data.username,
            avatar: detail.data.imageUrl,
            method: detail.method,
            authid: detail.data.authId
        })
    }
    
    function handleSubmit(){
        if(!isValidData()) return;

        SignUp({
            email: data.email,
            username: data.username,
            avatar: null,
            method: data.method,
            password: data.password
        })
    }


    function isValidData(){
        let valid = [
            data.username != "",
            data.email != "",
            data.password != "",
            data.confirmPassword != "",
            data.password == data.confirmPassword,
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email),
            (/^[a-z0-9_]+$/i.test(data.username)),
            data.username.length < 15
        ]

        if(valid.indexOf(false) > -1){
            return false
        }else{
            return true;
        }
    }

</script>

<div
    class="flex flex-col items-center w-full h-full px-6 py-3 relative"
    in:fly="{{ x: 400, duration: 200 }}"
    out:fly="{{x: -400, duration: 200}}"
>

    <header>
        Sign Up
    </header>

    <div>
        <Textfield 
            bind:value={data.username}
            class="w-full my-2"
            label="Username"
            type="text"
            input$maxlength="15"
            on:input={OnInput}
            required
        >
            <CharacterCounter slot="helper"></CharacterCounter>
        </Textfield>
    </div>

    <div>
        <Textfield 
            bind:value={data.email}
            class="w-full my-2" 
            label="Email"
            type="email"
            on:input={OnInput}
            bind:invalid={data.invalidEmail}
            updateInvalid
            required 
        >

        </Textfield>
    </div>

    <div>
        <Textfield 
            bind:value={data.password}
            class="w-full my-2" 
            label="Password"
            type="password"
            on:input={OnInput}
            required 
        >
            <div slot="helper">
                <HelperText>Make it Strong :)</HelperText>
            </div>
        </Textfield>
    </div>

    <div>
        <Textfield 
            bind:value={data.confirmPassword}
            class="w-full my-2" 
            label="Confirm Password"
            type="password"
            input$minlength="6"
            on:input={OnInput}
            required 
        >
        </Textfield>
    </div>

    <div class="createBtn mt-4">

        <Button on:click={handleSubmit} disabled={!data.isValid} variant="outlined">
            <Label>Create Account</Label>
        </Button>

    </div>

    {#if getGoogleOAuthClientId() != null}

        <hr class="my-5 w-full">

        <OAuth on:authorize={handleOAuth}/>

    {/if}

    <div class="flex justify-center items-center flex-col mt-4">

        <div class="flex justify-center items-center">
            Already Have an account?
            <a class="mx-3" href="#" on:click={(e)=>{
                e.preventDefault();
                ChangeScreen("signin")
            }}>
                Sign In
            </a>
        </div>

    </div>

</div>


<style>

    div header{
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
        width: 100%;
        height: fit-content;
    }

    div div{
        width: 100%;
        height: fit-content;
    }

    div.createBtn{
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>