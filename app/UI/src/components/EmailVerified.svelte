<script>
    
    import { fly } from 'svelte/transition';
    import { state }from '../stores';
    import Button, { Label } from '@smui/button';
    import ChangeScreen from '../helpers/ChangeScreen';



</script>


<div
    class="flex flex-col items-center w-full h-full px-6 py-3 relative"
    in:fly="{{ x: 400, duration: 200 }}"
    out:fly="{{x: -400, duration: 200}}"
>


    
    <div class="icon flex justify-center items-center">
        <i class="fas fa-check-circle"></i>
    </div>

    
    <span class="mt-5">
        Your Email has Successfully been verified. You can Close this Window now.
    </span>

    <span class="flex mt-8 justify-center items-center">
        Want to Signin?
        
        <Button class="mx-3" on:click={()=>{ChangeScreen("signin")}} variant="outlined">
            <Label>Signin</Label>
        </Button>

    </span>



</div>

<style>

    .icon {
        width: 100%;
        height: fit-content;
    }

    .icon i{
        font-size: 17rem;
        color: #1ED760;
    }


</style>