<script>

    import { fly } from 'svelte/transition';
    import ChangeScreen from '../helpers/ChangeScreen';
    import Textfield from '@smui/textfield';
    import Button, { Label } from '@smui/button';
    import OAuth from './OAuth.svelte';
    import getGoogleOAuthClientId from '../helpers/getGoogleOAuthClientId';
    import { onMount } from 'svelte';
    import SignIn from '../helpers/SignIn';

    let data = {
        email: "henilmalaviya06@gmail.com",
        password: "123",
        method: "auth",
        isValid: false,
        invalidEmail: true,
    };
    
    
    onMount(async () => {
        data.password = "";

        OnInput();
    })

    
    function handleOAuth({detail}){
        SignIn({
            email: detail.data.email,
            method: detail.method,
            authid: detail.data.authId
        })
    }

    function handleSubmit(){
        if(!isValidData()) return;
        
        SignIn({
            email: data.email,
            method: "auth",
            password: data.password
        })
    }
    
    function OnInput(e){
        let valid = isValidData();
        data.isValid = valid;
    }
    
    function isValidData(){
        let valid = [
            data.email != "",
            data.password != "",
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email),
            (/^[a-z0-9_]+$/i.test(data.username)),
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
        Sign In
    </header>

    <div>
        <Textfield 
            bind:value={data.email}
            class="w-full my-2"
            label="Email"
            type="email"
            on:input={OnInput}
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
        </Textfield>
    </div>

    
    <div class="submitBtn flex justify-center items-center mt-4">

        <Button on:click={handleSubmit} disabled={!data.isValid} variant="outlined">
            <Label>Login</Label>
        </Button>

    </div>

    {#if getGoogleOAuthClientId() != null}

        <hr class="my-5 w-full">

        <OAuth on:authorize={handleOAuth}/>

    {/if}

    
    <div class="flex justify-center items-center flex-col mt-4">

        <div class="flex justify-center items-center">
            Don't Have an account?
            <a class="mx-3" href="#" on:click={(e)=>{
                e.preventDefault();
                ChangeScreen("signup")
            }}>
                Sign Up
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


</style>