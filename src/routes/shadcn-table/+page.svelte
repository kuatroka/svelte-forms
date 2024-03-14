<script lang="ts">
	import DataTable from "$lib/components/ui/datatable-sup-overview/data-table.svelte";
	export let data;
	$: entries_cik = data.ciks;
    $: total_num_entries = data.total_num_entries;

</script>
<!-- <pre>{JSON.stringify(entries_cik, null, 2)}</pre> -->


<div class="container mx-auto py-10">
	<DataTable data={entries_cik} total_num_entries={total_num_entries} 
	/>
</div>

