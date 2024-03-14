<script lang="ts">


export let data;

const {emoji, name} = data;

</script>

<div class="flex items-center justify-center gap-4 rounded bg-slate-100 px-6 py-4 shadow">
<span class="text-6xl">{emoji}</span>
<div class="text-2xl">{name}</div>

</div>