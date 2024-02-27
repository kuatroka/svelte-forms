<script lang="ts">
  import Echarts from '$lib/components/echarts/svelte-echarts/echarts.svelte'
  import { type EChartsOptions } from 'svelte-echarts'

  
  export let data;
  let qtrstats: any[]= [];
  $: {
    qtrstats = data.qtrStats.map(entry => ({
      date: new Date(entry.quarter_end_date),
      quarter: entry.quarter,
      value: entry.ttl_value_all_ciks_per_qtr,
      assets: entry.ttl_num_assets_all_ciks_per_qtr,
      ciks: entry.ttl_num_ciks_per_qtr,
      positions: entry.ttl_num_positions_per_qtr,
      open_close: entry.open_close_ratio,
      num_stopped_ciks: entry.num_stopped_ciks,
      num_new_ciks: entry.num_new_ciks
    }));
  };

  

  
  
let options: EChartsOptions = {
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['date', 'num_new_ciks', 'num_stopped_ciks'],
    source: data.qtrStats.map(entry => ({
      date: new Date(entry.quarter_end_date),
      num_stopped_ciks: entry.num_stopped_ciks,
      num_new_ciks: entry.num_new_ciks
    })),
  },

  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }]
};


let options2: EChartsOptions = {
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    // Use the 'data' property to specify the Y-axis values directly
    data: data.qtrStats.reverse().map(entry => ({
      date: new Date(entry.quarter_end_date),
      quarter: entry.quarter,
      value: entry.ttl_value_all_ciks_per_qtr,
      num_stopped_ciks: entry.num_stopped_ciks,
      num_new_ciks: entry.num_new_ciks
    })),
    type: 'line'
  }]
};

let options_dataset: EChartsOptions  = {
  grid : {
        top:20,
        left:50,
        right:0,
        bottom:20,
      },
      legend: {top: 'auto', orient: 'horizontal'},
      tooltip: {},
      toolbox: {
        left: 'center',
        feature: {
          dataZoom: {}
        }
      },
  dataset: {
    dimensions: [{ name: 'date', type: 'time' },
     'quarter', 'value',
      'num_new_ciks', 'num_stopped_ciks'],

    source: data.qtrStats.reverse().map(entry => ({
      date: new Date(entry.quarter_end_date),
      quarter: entry.quarter,
      value: entry.ttl_value_all_ciks_per_qtr,
      num_stopped_ciks: entry.num_stopped_ciks,
      num_new_ciks: entry.num_new_ciks
    })),
  },
  xAxis: {type: 'time'},
  yAxis: {  },
  series: [
    
    {
      type: 'line',
      name: 'Stopped Investors',
      encode: {
        x: 'date',
        y: 'num_stopped_ciks',
        tooltip: ['date', 'num_stopped_ciks']
      }
    },
    {
      type: 'line',
      name: 'New Investors',
      encode: {
        x: 'date',
        y: 'num_new_ciks',
        tooltip: ['date', 'num_new_ciks']
      }
    },
  ]
};

// #######

// let options_data: EChartsOptions  = {
//   legend: {padding: 10, left: 'left', top: 'top', orient: 'vertical'},
//   tooltip: {},
//   toolbox: {
//     left: 'center',
//     feature: {
//       dataZoom: {}
//     }
//   },
//   xAxis: {type: 'time'},
//   yAxis: {  },
//   series: [
//     {
//       type: 'line',
//       name: 'Stopped Investors',
//       data: data.qtrStats.reverse().map(entry => [new Date(entry.quarter_end_date), entry.num_stopped_ciks]),
//       encode: {
//         x: 'date',
//         y: 'num_stopped_ciks',
//         tooltip: ['date', 'num_stopped_ciks']
//       }
//     },
//     {
//       type: 'line',
//       name: 'New Investors',
//       data: data.qtrStats.reverse().map(entry => [new Date(entry.quarter_end_date), entry.num_new_ciks]),
//       encode: {
//         x: 'date',
//         y: 'num_new_ciks',
//         tooltip: ['date', 'num_new_ciks']
//       }
//     },
//   ]
// };



</script>

<div class="mx-4">

  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    eCharts
  </h1>
  
  <h2 class="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
  <code>svelte-echarts</code>
</h2>
</div>
<!-- {#each qtrstats as entry}
  <p>
    {entry.date} - {entry.value}
  </p>  
{/each} -->
<div class="w-[800px] h-[350px]">
  <Echarts options={options_dataset} />
</div>


<!-- <style>
.app {
  width: 100%;
  height: 100%;
}

</style> -->




