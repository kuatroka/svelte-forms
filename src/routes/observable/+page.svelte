<script lang="ts">
    import ObservablePlot from '$lib/components/observablePlot/ObservablePlot.svelte'
    import ObservablePlotBig from '$lib/components/observablePlot/ObservablePlotBig.svelte'
    import ObservablePlot2 from '$lib/components/observablePlot/ObservablePlot2.svelte'

    import * as Plot from '@observablehq/plot';
    import * as d3 from 'd3';


    import { createDateSeries } from '../../../node_modules/layerchart/dist/utils/genData';
    export let data;
    let aapl = data.aapl;
    let goog = data.goog;
    let congress = data.congress;
    

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
      marks: [
        Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: d3.randomNormal()}))
        ]      
    }

    let optionsStackedDots = {  
  aspectRatio: 1,
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


$: console.log(congress); 
</script>

<!-- <RenderPlot options={optionsStackedDots} /> -->
<!-- <RenderPlot options={options} /> -->

<!-- <ObservablePlot3 options={optionsStackedDots} /> -->
<br/>


<div class="mx-4 mb-4">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Observable Plot </h1>  

<h2 class="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlot - Stacked Dots</h2>
</div>

<div class="mx-4 mb-4 border-4 border-amber-500 border-dashed w-2/3">
  <ObservablePlot  options={options} />
</div>
<div class="mx-4 mb-4 border-4 border-amber-500 border-dashed w-2/3">
  <ObservablePlot  options={optionsStackedDots} />
</div>

<!-- <h2 class="mx-4 mb-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlotBig - Stacked Dots</h2> -->


<!-- <div class="mx-4 border-4 border-amber-500 border-dashed w-2/3">
  <ObservablePlotBig  options={optionsStackedDots} />
</div>

<div class="mx-4 border-4 border-amber-500 border-dashed w-2/3">
  <ObservablePlotBig  options={optionsStackedDots} />
</div> -->

<!-- ///////////// -->
<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Multiseries Line Chart</h2>

<div class="mx-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot2  options={optionsStackedDots} />
</div>


<!-- <h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Stacked Dots</h2> -->




<!-- <h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Line Chart</h2> -->

<!-- <div class="mx-4 border-4 border-amber-500 border-dashed"> -->
  <!-- <ObservablePlot options={optionsLineChart} /> -->
<!-- </div> -->


