<script lang="ts">
  import debounce from 'debounce';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let data;

  $: ({quarters, quarter, rows } = data)

  $: quarter_id = $page.url.searchParams.get('quarter_id') || quarters.indexOf(quarter);
  
  const updateQueryString = (name: string, value: string | number) => {
        const params = new URLSearchParams(window.location.search);
        params.set(name, value.toString());
        goto(`?${params.toString()}`);
        };

        // Debounced version of updateQueryString for 'id' parameter
  const debouncedUpdateId = debounce((quarter_index: string) => {
        updateQueryString('quarter_id', quarter_index)
    }, 200); // Adjust debounce delay as needed

  const debouncedUpdateValue = debounce((quarter_index: string) => {
        updateQueryString('quarter', quarters[Number(quarter_index)]);
    }, 200); // Adjust debounce delay as needed
  


</script>
<input type="range" 
min="0" 
max={quarters.length -  1} 
value={quarter_id}
on:input={(x) => {debouncedUpdateId(x.currentTarget.value);
                  debouncedUpdateValue(x.currentTarget.value);}}
/>
<p>quarter_id: {quarter_id}</p>
<p>quarter: {quarter}</p>


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
<!-- bind:value={$quarter_id} -->




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
    
    

    
    