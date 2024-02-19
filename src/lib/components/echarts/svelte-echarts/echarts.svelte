<script lang="ts">
    import { Chart, type EChartsOptions } from 'svelte-echarts'
  
    export let options: EChartsOptions = {
      grid : {
        top:0,
        left:0,
        right:0,
        bottom:0,
        width: '100%',
        height: '100%',
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar',
        },
      ],
    }
  </script>
  
  <div class="app">
    <Chart {options} />
  </div>
  
  <style>
    .app {
      width: 100%;
      height: 100%;
    }
  </style>





<!-- ################################################# -->
<!-- //// option definition with `dataset` -->

<!-- let options3: EChartsOptions  = {
  legend: {padding: 10, left: 'left', top: 'top', orient: 'vertical'},
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
}; -->



<!-- ################################################# -->
<!-- //// option definition with `data` -->


<!-- let options_data: EChartsOptions  = {
  legend: {padding: 10, left: 'left', top: 'top', orient: 'vertical'},
  tooltip: {},
  toolbox: {
    left: 'center',
    feature: {
      dataZoom: {}
    }
  },
  xAxis: {type: 'time'},
  yAxis: {  },
  series: [
    {
      type: 'line',
      name: 'Stopped Investors',
      data: data.qtrStats.reverse().map(entry => [new Date(entry.quarter_end_date), entry.num_stopped_ciks]),
      encode: {
        x: 'date',
        y: 'num_stopped_ciks',
        tooltip: ['date', 'num_stopped_ciks']
      }
    },
    {
      type: 'line',
      name: 'New Investors',
      data: data.qtrStats.reverse().map(entry => [new Date(entry.quarter_end_date), entry.num_new_ciks]),
      encode: {
        x: 'date',
        y: 'num_new_ciks',
        tooltip: ['date', 'num_new_ciks']
      }
    },
  ]
}; -->
