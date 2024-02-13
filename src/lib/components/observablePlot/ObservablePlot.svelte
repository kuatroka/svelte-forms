<script lang="ts">
    import * as Plot from '@observablehq/plot';

  
    let div: HTMLElement;
    

    export let data;

    export let options: {};
    
  
    $: {
      div?.firstChild?.remove(); // remove old chart, if any
      div?.append(Plot.plot(options));    // add the new chart
    }
  </script>
  
  <div bind:this={div} role="img" class="app"></div>

  <!-- <style>
    .app {
        width: 100%;
        height: 100%;
    }
</style> -->