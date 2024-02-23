<script lang="ts">
    import ObservablePlot from '$lib/components/observablePlot/ObservablePlot.svelte'
    import ObservablePlotBig from '$lib/components/observablePlot/ObservablePlotBig.svelte'
    import ObservablePlot2 from '$lib/components/observablePlot/ObservablePlot2.svelte'
    import * as Plot from '@observablehq/plot';
    // import {html, svg} from "htl"; 
    
    
    // import * as Inputs from "@observablehq/inputs";
    import * as d3 from 'd3';
    import { Switch } from '$lib/components/ui/switch';
    import { Label} from '$lib/components/ui/label';
    
    // const fixed = view(Inputs.toggle({label: "Use fixed aspect ratio"}));
    
    
    import { createDateSeries } from '../../../node_modules/layerchart/dist/utils/genData';
    
    
    
    export let data;
    let aapl = data.aapl;
    let goog = data.goog;
    let congress = data.congress;
    let alphabet = data.alphabet;
    let penguins = data.penguins;
    let gistemp = data.gistemp;
    let bls = data.bls;
    let traffic = data.traffic;
    let seattle = data.seattle;
    // let aaplDuckdb = data.rows;

    
    
    let stocks = [
      ["AAPL", aapl],
  ["AMZN", goog]
].flatMap(([Symbol, values]) => (values as object[]).map(d => ({Symbol, ...d})))
    

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
    
    // let f = Plot.plot(options);

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

      marginLeft: 40,
      // height: 460, 
      width: 1200,
      title: "For charts, an informative title",
      subtitle: "Subtitle to follow with additional context",
      
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(goog, {x: "Date", y: "Close", stroke: 'var(--chart-goldenrod)'}),
        Plot.lineY(aapl, {x: "Date", y: "Close", stroke: "var(--chart-4)",
        channels: {
                  volume: "Volume",
                  high: "High", 
                  low: "Low"
                },
        tip: {
          format: {
            volume: true,
            high: true,
            low: true,
            // y: (d) => `$${d}`,
            y: (d) => `$${d.toFixed(2)}`,
          }
             }}),        
      ],
          }


    let optionsStocksSymbol = {
      width: 1200,
      color: {legend: true},
      
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(stocks, {x: "Date", y: "Close", stroke: "Symbol",
        tip: {fill: 'var(--chart-tip-background)',
          fontSize: 18,
          format: {stroke: true, y: (d) => `$${d}`}} }),
      ]      
    }

    let aspectRatioAuto = true;
    $: aspectRatioAuto;

    let showArea = true;

    let linedata = [
      {hour: 0, value: 8, sensor: "A"},
      {hour: 0, value: 6, sensor: "B"},
      {hour: 1, value: 7, sensor: "A"},
      {hour: 1, value: 5, sensor: "B"},
      {hour: 2, value: 3, sensor: "A"},
      {hour: 2, value: 0, sensor: "B"},
      {hour: 3, value: 9, sensor: "A"},
      {hour: 3, value: 2, sensor: "B"}
    ];

    const timeseries = [
      {year: 2014, population: 7295.290765},
      {year: 2015, population: 7379.797139},
      {year: 2016, population: 7464.022049},
      {year: 2017, population: 7547.858925},
      {year: 2019, population: 7713.468100},
      {year: 2020, population: 7794.798739}
    ];

    const sales = [
      {units: 10, fruit: "peach"},
      {units: 20, fruit: "pear"},
      {units: 40, fruit: "plum"},
      {units: 30, fruit: "plum"}
    ];

    const index = [0, 1, 2, 3]
    const units = [10, 20, 40, 30]
    const fruits = ["peach", "pear", "plum", "plum"]


    // const slider = Range();
    //   slider.addEventListener("input", (event: HTMLInputElement) => {
    //     console.warn(slider.value);
    //   })



</script>
<!-- {f.scale('color')} -->
<!-- <code class="text-2xl">duckdb</code>
<pre>{JSON.stringify(aapl.slice(0, 1), null, 2)}</pre> -->




<code class="text-2xl">duckdb-async</code>
<pre>{JSON.stringify(aapl.slice(0, 1), null, 2)}</pre>


<div class="mx-4 mb-4">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Observable Plot </h1>  

<h2 class="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlot - Stacked Dots - Synthetic Data</h2>
</div>

<div class="mx-4 mb-4 border-4 border-amber-500 border-dashed w-2/3">
  <!-- <ObservablePlot  fixedWidth={false}  options={optionsScatter} /> -->
</div>


<!-- ///////////// -->
<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlot - Stacked Dots - Synthetic Data</h2>

<div class="mx-4 border-4 border-amber-500 border-dashed">
  <!-- <ObservablePlot  fixedWidth={false}  options={optionsStackedDots} /> -->
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>ObservablePlot - Stacked Dots - Synthetic Data</h2>


<div class="mx-4 border-4 border-amber-500 border-dashed">
  <!-- <ObservablePlot fixedWidth={true}  options={optionsStackedDots} /> -->
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Line - Synthetic Data</h2>

<div class="w-1/3">
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <!-- <ObservablePlot fixedWidth={false}  options={optionsLine} /> -->
  </div>
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Multiseries Line - Synthetic Data</h2>

<div >
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot2 fixedWidth={true} options={optionsMultiseriesLine}  />
  </div>
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Multiseries Line: One column using Symbol/Category - Synthetic Data</h2>

<div >
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot2 fixedWidth={true} options={optionsStocksSymbol}  />
  </div>
</div>


<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Marks z-order</h2>

<div >
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot2 fixedWidth={true} 
    options={{
      marginTop: 40,
      marginRight: 20,
      marginLeft: 40,
      marginBottom: 30,
      grid: true,
    x: {padding: 0.4},
    marks: [
        Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "var(--chart-4)", dx: 2, dy: 2}),
        Plot.frame()
    ]
}}  />
  </div>
</div>



  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot 
    options={{
      title: `Title of the chart`, 
      subtitle: "Subtitle to follow with additional context",
      caption: "Figure 1. A chart with a title, subtitle, and caption.",
      // height: 300,
      marginTop: 20,
      marginRight: 20,
      marginLeft: 40,
      marginBottom: 30,
      grid: true,
    x: {padding: 0.4},
    marks: [
        Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "var(--chart-4)", dx: 2, dy: 2}),
        Plot.frame(),
        Plot.text(["Titles, subtitles, captions, and annotations assist inter­pretation by telling the reader what’s interesting. Don’t make the reader work to find what you already know."],
         {lineWidth: 30, frameAnchor: "middle", fontSize: 12, textAnchor: "middle" })
    ]
}}  />
  </div>

  <!-- ////////////////////////////// -->
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <div class="mt-4 mx-1 gap-2 flex items-center mr-auto">
      <Switch 
      id="add-partial-qtr"
      bind:checked={aspectRatioAuto}
      >
  </Switch>
  <Label for="add-partial-qtr">Auto Aspect Ratio</Label>
  </div>

  <ObservablePlot 
  options={{

    grid: true,
    inset: 10,
    aspectRatio: !aspectRatioAuto ? 1 : undefined,
    color: {legend: true,
      range: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"] },
    marks: [
      Plot.frame(),
      Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species", 
      tip: {fill: 'var(--chart-tip-background)', fontSize: 12} })
    ]
  }}  />
</div>    


<!-- ////////////////////////////// -->
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot 
  options={{
    title: `Title of the chart`,
    height: 300,
    marks: [
      Plot.barY(alphabet, {x: "letter", y: "frequency"})
    ]
  }}  />
</div>    

<!-- ////////////////////////////// -->
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot 
  options={{
    marks: [
      Plot.dot(gistemp, {x: "Date", y: "Anomaly"})
    ]
  }}  />
</div>    


<!-- ////////////////////////////// -->
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot 
  options={{
    marks: [
      Plot.lineX(gistemp, {x: "Date", y: "Anomaly"})
    ]
  }}  />
</div>    


<!-- ////////////////////////////// -->
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot 
  options={{
    marks: [
      Plot.barX(alphabet, {x: "frequency", y: "letter"})
    ]
  }}  />
</div>    


<!-- ////////////////////////////// -->
<h2 class="mx-4 scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Area and Line</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot 
  options={{
    marks: [
    // Plot.ruleY([40, 60, 180]),
    Plot.ruleY([0]),
    Plot.areaY(aapl, {x: "Date", y: "Close", fillOpacity: 0.2}),
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
  }}  />
</div>    


<!-- ////////////////////////////// -->
<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Combine two datasets into one and plot it as multiseries</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot 
  options={{
    marks: [
    [goog, aapl].map((stock) => Plot.lineY(stock, {x: "Date", y: "Close"}))
  ]
  }}  />
</div>    


<!-- ////////////////////////////// -->
<!-- <h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Using htl</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot 
  options={{
    marks: [
    () => htl.svg`<defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="15%" stop-color="purple" />
        <stop offset="75%" stop-color="red" />
        <stop offset="100%" stop-color="gold" />
      </linearGradient>
    </defs>`,
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "url(#gradient)"}),
    Plot.ruleY([0])
  ]
  }}  />
</div>     -->


<!-- ////////////////////////////// -->
<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Toggling one of the marks on and off</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">

  <div class="mx-1 gap-1 mt-1 flex items-center mr-auto">
    <Switch 
    id="show-area"
    bind:checked={showArea}
    >
</Switch>
<Label for="show-area">Show Area</Label>
</div>

  <ObservablePlot 
  options={{
    marks: [
    Plot.ruleY([0]),
    showArea ? Plot.areaY(aapl, {x: "Date", y: "Close", fillOpacity: 0.2}) : null,
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
  }}  />
</div>    


<!-- ////////////////////////////// -->
<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Changing default domain or type of a plot</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    y: {
    type: "log",
    domain: [50, 300],
    grid: true
  },
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Plotting with discrete marks</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.circle(aapl, {x: "Date", y: "Close"})
  ]
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Using Z scale</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.lineY(bls, {x: "date", y: "unemployment", z: "division"})
  ]
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Using Z scale for multiseries and stroke for different colors of series</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.lineY([
  {hour: 0, value: 8, sensor: "A"},
  {hour: 0, value: 6, sensor: "B"},
  {hour: 1, value: 7, sensor: "A"},
  {hour: 1, value: 5, sensor: "B"},
  {hour: 2, value: 3, sensor: "A"},
  {hour: 2, value: 0, sensor: "B"},
  {hour: 3, value: 9, sensor: "A"},
  {hour: 3, value: 2, sensor: "B"}
], 
{x: "hour", y: "value", stroke: "sensor"})
  ]
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Usig accessor function</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.lineY([
  {hour: 0, value: 8, sensor: "A"},
  {hour: 0, value: 6, sensor: "B"},
  {hour: 1, value: 7, sensor: "A"},
  {hour: 1, value: 5, sensor: "B"},
  {hour: 2, value: 3, sensor: "A"},
  {hour: 2, value: 0, sensor: "B"},
  {hour: 3, value: 9, sensor: "A"},
  {hour: 3, value: 2, sensor: "B"}
], 
{x: (d) => d.hour,
 y: (d) => d.value,
 stroke: (d) => d.sensor
})
  ]
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Passing parallel arrays</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.lineY({length: linedata.length}, 
{x: linedata.map((d) => d.hour),
 y: linedata.map((d) => d.value),
 stroke: linedata.map((d) => d.sensor)
})
  ]
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>With missing interval</h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    
  marks: [
    Plot.barY(timeseries, {x: "year", y: "population"}),
  ],
  x: {tickFormat: "", interval: 1},  // tickFormat: "" - makes years in digit appear without thousand separator
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Strokes and fills </h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  subtitle: 'stroke: the outer rim of a circle, fill: the inside + the outer area',
  marks: [
    // Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "red"})
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", fill: "red"})
  ],
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Different shapes of dots </h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    // Plot.dot(gistemp, {x: "Date", y: "Anomaly", fill: "red", symbol: "cross"}),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", fill: "red", symbol: "star"}),
  ],
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Channels, dynamic and constant </h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    title: 'fill is assigned to a constant color',
  marks: [
    Plot.barX(timeseries, {x: "population", y: "year", fill: "var(--chart-2)"})
  ],
  y: {tickFormat: "", label: null}, 
  }}  />
</div>  

<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    title: 'fill is assigned to a channel - a column in dataset so colors will be different',
    subtitle: 'Pass a range of colors to fill instead of default from Plot',
  marks: [
    // Plot.barX(timeseries, {x: "population", y: "year", fill: "year"})
    Plot.barX(timeseries, {x: "population", y: "year", fill: (d) => d.year})
  ],
  y: {tickFormat: "", label: null}, 
  color: {
    range: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"] },
  }}  />
</div>  


<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    title: 'fill is assigned to a channel - a column in dataset so colors will be different',
    subtitle: 'choose certain years with a func and color it according to the condition',
  marks: [
    // Plot.barX(timeseries, {x: "population", y: "year", fill: "year"})
    Plot.barX(timeseries, {x: "population", y: "year", fill: (d) => d.year & 1 ? "odd" : "even"})
  ],
  y: {tickFormat: "", label: null}, 
  color: {
    scheme: "BuRd",
    // range: ["var(--chart-2)",  "var(--chart-5)"],
    legend: true},
  }}  />
</div>  


<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    title: 'Order by differnt criteria',
  marks: [
    // Plot.barX(timeseries, {x: "population", y: "year", fill: "year"})
    // Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "y", reduce: "max", order: "descending"}})
    Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "x", order: "descending"}})
  ],
  }}  />
</div>  

<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Channels, columns and accessor functions </h2>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.dot(sales, {x: (d) => d.units * 1000, y: (d) => d.fruit})
  ],
  // Label: {x: "Units", y: "Fruit"},
  y: {label: "Fruit", labelAnchor: "top"}, 
  x: {label: "Units"}, 
  }}  />
</div>  


<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Use 3 different arrays to combine them </h2>

<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.dot(index, {x: units, y: fruits})
  ],
  }}  />
</div>  



<h2 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Area with fixed values </h2>

<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
  marks: [
    Plot.area(aapl, {x1: "Date", y1: 40, y2: "Close"})
  ],
  }}  />
</div>  


<h1 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Scales</h1>

<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    color: {
        type: "diverging",
        scheme: "Oranges"
      },
  marks: [
    Plot.ruleX(gistemp, {x: "Date", stroke: "Anomaly"})
  ],
  }}  />
</div>  


<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    marginTop: 20 , 
  marks: [
  Plot.cell("ABCDEFGHIJ", {x: Plot.identity, stroke: "currentColor", strokeOpacity: 0.1})
  ],
  x: {type: "band", domain: "ABCDEFGHIJ"}
  }}  />
</div>  


<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{grid: true,
  color: {
    type: "diverging",
    scheme: "BuRd"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"}),
  ]
  }}  />
</div>  



<h1 class="mx-4 scroll-m-20 py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>Sort of a heatmap</h1>
<div class="class mx-4 my-4 border-4 border-amber-500 border-dashed">
  <ObservablePlot  options={{
    title: 'Mean temperatures in Seattle',
    padding: 0,
  y: {tickFormat: Plot.formatMonth("en", "short")},
  marks: [
    Plot.cell(seattle, Plot.group({fill: "mean"}, {
      x: (d) => d.date.getUTCDate(),
      y: (d) => d.date.getUTCMonth(),
      fill: "temp_max",
      inset: 0.5,
      tip: true
    })),
  ],
  }}  />
</div>  

<!-- {#each traffic.slice(0, 2) as entry }
<p>{entry.vehicles}</p>
  
{/each} -->





<!-- <div  >
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <ObservablePlot2  options={optionsMultiseriesLine}  />
  </div>
</div> -->




