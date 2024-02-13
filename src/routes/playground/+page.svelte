<script lang="ts">
    import ObservablePlot from '$lib/components/observablePlot/ObservablePlot.svelte'
    import * as Plot from '@observablehq/plot';

    import { createDateSeries } from '../../../node_modules/layerchart/dist/utils/genData';

    let dataset: any;
    dataset = createDateSeries({
      count: 100,
      min: 10,
      max: 100,
      value: 'integer',
      keys: ['apples', 'bananas', 'num_new_ciks', 'num_stopped_ciks'],
    });


    let options = {
        width: 800,
  marks: [
    Plot.lineY(dataset, {x: "date", y: "apples", stroke: "red"}),
    Plot.lineY(dataset, {x: "date", y: "bananas", stroke: "blue"})
  ]
}

</script>


<h1>Playground</h1>


<ObservablePlot data={dataset} {options} />

