<script lang="ts">
  import { onMount } from 'svelte';
  import debounce from 'debounce';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';

  export let data;

  $: ({quarter, rows } = data)
$: quarters = rows.map(d => d.quarter);

  // let quarters = data.rows.map(d => d.quarter);

  $: id_param = writable($page.url.searchParams.get('quarter_id'));
  
  const updateQueryString = (name: string, value: string | number) => {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value.toString());
        goto(`?${params.toString()}`);
        };

        // Debounced version of updateQueryString for 'id' parameter
    const debouncedUpdateId = debounce((idValue: string) => {
        updateQueryString('quarter_id', idValue);
    }, 200); // Adjust debounce delay as needed
  
  // Initialize the slider value and quarter value based on the data
  // onMount(() => {
  //   if (quarters.length >  0) {
  //     let quarter_id = Number($page.url.searchParams.get('quarter_id') || quarters.length - 1);
  //     let quarter = $page.url.searchParams.get('quarter')?.toString() ||  quarters[quarter_id];
  //     sliderValue.set(quarter_id || quarters.length - 1); // Set initial slider value
  //     quarterValue.set(quarter || quarters[quarters.length - 1]); // Set initial quarter value
  //   }
  // });


  /// Function to update the slider value and quarter value
    // const updateSlider = (event: Event) => {
    //     const newSliderValue = parseInt((event.target as HTMLInputElement).value);
    //     sliderValue.set(newSliderValue);
    //     quarterValue.set(quarters[newSliderValue]);
    //     const params = new URLSearchParams(window.location.search);
    //     params.set('quarter',quarters[newSliderValue] );
    //     params.set('quarter_id',newSliderValue.toString() );
    //     goto(`?${params.toString()}`);
    // };
  
    // let dataset: any[] = [];
    // let dataset: any[] = data.rows.map(entry => ({
    //   date: new Date(entry.quarter_end_date),
    //   quarter: entry.quarter,
    //   value: entry.ttl_value_all_ciks_per_qtr,
    //   value_cons: entry.mean_curr_twrr_all_ciks_per_qtr_cons,
    //   value_yahoo: entry.mean_curr_twrr_all_ciks_per_qtr_yahoo
    // }));
    
  //    console.log(quarters.slice(0, 6))
    // $: quarter_id = Number($page.url.searchParams.get('quarter_id') || quarters.length - 1);
    // $: quarter = $page.url.searchParams.get('quarter')?.toString() ||  quarters[quarter_id];


  //   const updateQueryQuarterId = (name: string, value: string) => {
  //     const params = new URLSearchParams(window.location.search);
  //     params.set(name, value);
  //     goto(`?${params.toString()}`);
  //     };

      // const updateQueryQuarterValue = (name: string, value: string) => {
      // const params = new URLSearchParams(window.location.search);
      // params.set(name, value);
      // goto(`?${params.toString()}`);
      // };

  //     // Debounced version of updateQueryString for 'id' parameter
  //   const debouncedUpdateQuarterId = debounce((quarterId: string) => {
  //     updateQueryQuarterId('quarter_id', quarterId);
  // }, 100); // Adjust debounce delay as needed

  // Debounced version of updateQueryString for 'quarterValue' parameter
  //   const debouncedUpdateQuarterValue = debounce((quarterId: string) => {
  //     updateQueryQuarterValue('quarter', quarters[Number(quarterId)]);
  // }, 100); // Adjust debounce delay as needed




</script>
<input type="range" 
min="0" 
max={quarters.length -  1} 
bind:value={$id_param}
on:input={(x) => debouncedUpdateId(x.currentTarget.value)}
/>
<p>Current Quarter: {$id_param}</p>


quarters: {quarters.slice(0, 6)} <br>
<!-- quarter_id: {quarter_id}<br>
quarter: {quarter} <br> -->


<!-- <h1 class="ml-4 text-2xl mb-4"  > url.searchParams with one key</h1> -->

<!-- //////////////////////////////////////////////////////// -->
<!-- <div class="gap-2 ml-2">
<input
  placeholder="Filter names..."
  type="range"
  value={quarter_id}
  on:input={(x) => { 
    debouncedUpdateQuarterId(x.currentTarget.value);
                 debouncedUpdateQuarterValue(x.currentTarget.value);
                  }}
  />
  <br>
  {quarter_id}
</div> -->
<!-- bind:value={$id_param} -->




<!-- <ul class="py-2 flex flex-col gap-4 mb-8">
{#each data.rows as entry }
<li class="flex flex-row gap-4 pl-3 justify-star items-center" >
  <div class="inline-block">
{entry.quarter} - {entry.quarter_end_date}
  </div>
</li>
{/each}
</ul>
<hr> -->
<!-- //////////////////////////////////////////////////////// -->


<!-- //////////////////////////// -->








<!-- 
 <style>
  a {
    display: block;
  }
</style> -->
    
    

    
    