
<script>

import LinearProgress from '@smui/linear-progress';
import { onMount } from 'svelte';

onMount(()=>{
    let all = document.querySelectorAll("*");

    for(let d of all){
        d.blur();
    }
})


</script>


<div class="absolute top-0 left-0 w-full h-full">

    <div class="w-full h-full relative main">
        <LinearProgress indeterminate />
    </div>

</div>

<style>

div{
    background-color: rgba(255, 255, 255, 0.6);
    user-select: none;
    z-index: 3;
}


</style>