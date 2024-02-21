<script lang="ts">
    import * as Plot from '@observablehq/plot';  
    let div: HTMLElement;

    export let fixedWidth = false;
    export let width = 600;

    $: hash = JSON.stringify({ ...options, width });

    export let options: {};   
  
    $: {
      div?.firstChild?.remove(); // remove old chart, if any
      div?.append(Plot.plot({...options, ...(fixedWidth ? {} : { width })}));   // add the new chart
    }
  </script>
{#key hash}
  <div bind:this={div} bind:clientWidth={width} role="img" class="plot">
  </div>
{/key}

<!-- <style>
  .plot { position: relative; }
  .plot :global(figure) { margin: 0 }
  .plot :global(h2) { font-size: 22px; margin-bottom: 10px }
  .plot :global(h3) { font-weight: normal; font-size: 14px; margin-top: 10px; }
  .plot :global(svg) {
    background: transparent!important;
  }
</style> -->


  <!-- <style>
    .app {
        width: 100%;
        height: 100%;
    }
</style> -->