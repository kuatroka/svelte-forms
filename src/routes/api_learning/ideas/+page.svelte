<script lang="ts">
    import type { PageData } from './$types';
    import IdeaCard from '$lib/components/ideaCard.svelte';
    
    
    export let data: PageData;
</script>


<ul class="flex flex-col">
    {#each data.ideas as {emoji, name}}
        <IdeaCard data={{emoji, name}} />
    {/each}
</ul>