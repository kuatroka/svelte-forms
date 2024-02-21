<script lang="ts">
    import ObservablePlot from '$lib/components/observablePlot/ObservablePlot.svelte'
    import ObservablePlotBig from '$lib/components/observablePlot/ObservablePlotBig.svelte'
    import ObservablePlot2 from '$lib/components/observablePlot/ObservablePlot2.svelte'

    import * as Plot from '@observablehq/plot';
    import * as d3 from 'd3';


    import { createDateSeries } from '../../../node_modules/layerchart/dist/utils/genData';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
    export let data;
    let aapl = data.aaplData;
    let goog = data.googData;
    let congress = data.congress;
    // let aaplDuckdb = data.rows;
    let aaplDuckdbAsync = data.rowsAsync;
    

    // data for the plot
    let dataset: any;
      dataset = createDateSeries({
        count: 100,
        min: 10,
        max: 100,
        value: 'integer',
        keys: ['apples', 'bananas', 'num_new_ciks', 'num_stopped_ciks'],
      });

    // options for the plot 
    let options: Plot.PlotOptions = {
        width: 1200,
        marks: [
          Plot.lineY(aapl, {x: "Date", y: "Close", stroke: "red"}),
          Plot.lineY(goog, {x: "Date", y: "Close", stroke: "blue"})
        ]
    };

    let optionsScatter = {      
      height: 300,
      marks: [
        Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: d3.randomNormal()}))
        ]      
    }

    let optionsStackedDots = {  

      aspectRatio: 1,
      height: 300,
      width: 1400,
      x: {label: "Age (years)"},
      y: {
        grid: true,
        label: "← Women · Men →",
        labelAnchor: "center" as const, // Change here
        tickFormat: Math.abs,
      },    
      marks: [
        Plot.dot(
          congress,
          Plot.stackY2({
            x: (d) => 2023 - d.birthday.getUTCFullYear(),
            y: (d) => d.gender === "M" ? 1 : -1,
            fill: "gender",
            title: "full_name",
            tip: true,
          }),
          
        ),
        Plot.ruleY([0])
      ]
    };

    let optionsLine = {
      marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
    }

    let optionsMultiseriesLine = {
      style: "--primary: primary;",
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(goog, {x: "Date", y: "Close", stroke: 'var(--chart-1)'}),
        Plot.lineY(aapl, {x: "Date", y: "Close", stroke: "var(--chart-2)"})
      ]
    }


// $: console.log(data.aaplData.slice(0, 4)); 
</script>
<!-- <code class="text-2xl">duckdb</code>
<pre>{JSON.stringify(aaplDuckdb.slice(0, 1), null, 2)}</pre> -->

<code class="text-2xl">duckdb-async</code>
<pre>{JSON.stringify(aaplDuckdbAsync.slice(0, 1), null, 2)}</pre>


<div class="mx-4 mb-4">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Observable Plot </h1>  

<h2 class="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlot - Stacked Dots - Synthetic Data</h2>
</div>

<div class="mx-4 mb-4 border-4 border-amber-500 border-dashed w-2/3">
  <ObservablePlot  fixedWidth={false}  options={optionsScatter} />
</div>


<!-- ///////////// -->
<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlot - Stacked Dots - Synthetic Data</h2>

<div class="mx-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  fixedWidth={false}  options={optionsStackedDots} />
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlot - Stacked Dots - Synthetic Data</h2>


<div class="mx-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot fixedWidth={true}  options={optionsStackedDots} />
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Line - Synthetic Data</h2>

<div class="w-1/3">
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot fixedWidth={false}  options={optionsLine} />
  </div>
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Multiseries Line - Synthetic Data</h2>

<div class="w-2/3" >
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot fixedWidth={false}  options={optionsMultiseriesLine}  />
  </div>
</div>


<!-- <style>
  :root {
      --color-primary: teal; /* Tailwind's blue-500 as an example */
  }
</style> -->


