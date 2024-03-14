<script lang="ts">
    import type { PageData } from './$types';
    import {Button} from "$lib/components/ui/button";
    
    export let data: PageData;

    let range = 0;



</script>


<!-- <form >
	<label class="flex border border-slate-500  mb-3">
		Search
		<input name="q"  class="flex border border-amber-500">
		<input name="qq"  class="flex border border-amber-500">
		<input name="qqq"  class="flex border border-amber-500">
	</label>
    <Button type="submit">Search</Button>
</form>
<br>
<form >

    <input type='range' name="range" value={range}  class="flex border border-amber-500">
</form> -->


<form >
	<input type="text" name="a" class="flex border border-amber-500" />
    <input type="range" name="b" on:change={e=>e.currentTarget.form?.requestSubmit()} />
	<!-- <button>submit</button> -->
</form>