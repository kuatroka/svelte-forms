<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import { type PlotOptions } from '@observablehq/plot';
  
    export let options: PlotOptions = {};

    function myplot(node: HTMLElement) {
        node.appendChild(Plot.plot(options));
    }
</script>

{#key options}
    <div use:myplot {...$$restProps} ></div>
{/key}

