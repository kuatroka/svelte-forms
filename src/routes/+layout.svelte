<script>
	import '../app.pcss';
	import { MainNav } from "$lib/components/main-nav";
	import ThemeToggle from '$lib/components/main-nav/theme-toggle.svelte';
</script>


<div class="relative flex min-h-screen flex-col" id="page">
	<div class="border-b">
		<div class="flex h-10 items-center px-4">
			<MainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<ThemeToggle />
			</div>
		</div>
	</div>
	<div class="flex-1">
		<slot />
	</div>
</div>
