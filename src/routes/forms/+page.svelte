<script lang="ts">
  import debounce from 'debounce';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import ObservablePlot2 from '$lib/components/observablePlot/ObservablePlot2.svelte'
  import * as Plot from '@observablehq/plot';
  import { type PlotOptions } from '@observablehq/plot';

  export let data;

  $: ({quarters, quarter, rows } = data)

  let quarter_id = $page.url.searchParams.get('quarter_id') || data.quarter_id;
  
  const updateQueryString = (name: string, value: string | number) => {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value.toString());
        goto(`?${params.toString()}`);
        };

        // Debounced version of updateQueryString for 'id' parameter
  const debouncedUpdateId = debounce((quarter_index: string) => {
        updateQueryString('quarter_id', quarter_index)
    }, 150); // Adjust debounce delay as needed


  
  let options: PlotOptions;
  $: options = {
    width: 1600,
    aspectRatio: null,
      marginTop: 40,
      marginRight: 20,
      marginLeft: 60,
      marginBottom: 30,
      // grid: true,
    x: {padding: 0.4},
    y: {type: 'band', label: "Superinvestors",},
    marks: [
        Plot.barX(rows, {x: "value", y: "cik",  fill: "var(--chart-4)", dx: 2, dy: 2, sort: {y: "x", reverse: true}}),
        Plot.frame()
    ]
}


</script>
<input type="range" 
min="0" 
max={quarters.length -  1} 
value={quarter_id}
on:input={(x) => debouncedUpdateId(x.currentTarget.value)}
/>
<p>quarter_id: {quarter_id}</p>
<p>quarter: {quarter}</p>

<!-- on:input={(x) => debouncedUpdateId(x.currentTarget.value)} -->

quarters: {quarters.slice(0, 6)} <br>

<div >
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot2 {options} 
      />
  </div>
</div>

<br>

<form >
    <input type="range" name="quarter_id"
    min="0" 
max={quarters.length -  1} 
bind:value={quarter_id}
on:change={e=>e.currentTarget.form?.requestSubmit()} />
</form>






    
    

    
    