
<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let url;
  let script;
  let loaded = [];

  function addLoad(){
    loaded.push(true);

    check()
  }

  function check(){
    if(loaded.length == url.length){
      dispatch('loaded');
    }
  }

  onMount(async () => {
    if(!Array.isArray(url)){
    script.addEventListener('load', () => {
      dispatch('loaded');
    })

    script.addEventListener('error', (event) => {
      console.error("something went wrong", event);
      dispatch('error');
    });
    }
  });

</script>

<svelte:head>
  {#if Array.isArray(url)}
    {#each url as u, index}
      <script on:load={addLoad} src={u}></script>
    {/each}
  {:else}
    <script bind:this={script} src={url} />
  {/if}
</svelte:head>
