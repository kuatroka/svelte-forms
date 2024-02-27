<script lang="ts">
    import { invalidate, goto } from '$app/navigation';
    import { page } from '$app/stores';
    import MyPlot from '$lib/components/observablePlot/Plot.svelte'
    import * as Plot from '@observablehq/plot';     
    
    
    export let data;
    // let dataset: any[] = [];
    let dataset: any[] = data.rows.map(entry => ({
            date: new Date(entry.quarter_end_date),
            quarter: entry.quarter,
            value: entry.ttl_value_all_ciks_per_qtr,
            value_cons: entry.mean_curr_twrr_all_ciks_per_qtr_cons,
            value_yahoo: entry.mean_curr_twrr_all_ciks_per_qtr_yahoo
        }));

  let quarters = dataset.map(d => d.quarter);


  //////////////////
  const debounce = (callback: Function, wait = 300) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(...args), wait);
  } };
  ////////////////////////////

  let sliderValue = quarters.length - 1; // Initial slider value
  let quarterValue = quarters[sliderValue];

  // Function to update sliderValue and quarterValue when the slider is moved
  let updateSlider: (event: Event) => void;
  $: {updateSlider = (event: Event, ) => {
      invalidate('slider:quarter');
      sliderValue = parseInt((event.target as HTMLInputElement).value);
      quarterValue = quarters[sliderValue];
      console.log(quarterValue);
      $page.url.searchParams.set('quarter', quarterValue);
      const newSearchParams = new URLSearchParams($page.url.searchParams);
      newSearchParams.set('quarter', quarterValue.toString());
      goto(`${$page.url.pathname}?${newSearchParams}`, { replaceState: true });
}};
   

    // options for the plot 
  let options: Plot.PlotOptions = {
      aspectRatio: null,
      width: 1500,
        marks: [
          Plot.barY(dataset, {x: "date", y: "value", stroke: "red"}),
                ]
    };


$: url = $page.url;
console.log(url);

</script>
<!-- <code class="text-2xl">duckdb-async</code> -->
<!-- <pre>{JSON.stringify(dataset.slice(3, 5), null, 2)}</pre> -->

<div class="mx-4 mb-4">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Observable Plot </h1>  
</div>
ALL QUARTERS: {[quarters]} <br>
SELECTED QUARTER: {quarterValue}
<br>
URL: {url}

<div class="my-4 flex flex-col items-center">
  <form  method="get">
      <input  type="range" min="0" max={quarters.length - 1} bind:value={sliderValue} on:input={updateSlider} step="1" />
      <p>Quarter: {quarterValue}</p>
  </form>
</div>


<div >
  <div class="mx-4 border-4 border-amber-500 border-dashed">
    <MyPlot  options={options}  />
  </div>
</div>

