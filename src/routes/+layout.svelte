<script lang="ts">
	import '../app.pcss';

	import { ModeWatcher } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import * as Menubar from "$lib/components/ui/menubar";
	import { Sun, Moon } from "radix-icons-svelte";
	import { toggleMode } from "mode-watcher";
</script>

<ModeWatcher />
<div class="grid grid-flow-col justify-between p-2">
	<nav class="flex gap-8">	
		<Menubar.Root>
			<Menubar.Menu>
				<a href="/"><Menubar.Item>Home</Menubar.Item></a>
			</Menubar.Menu>

			<Menubar.Menu>
				<Menubar.Trigger >form/slider</Menubar.Trigger>
				<Menubar.Content>
				<a href="/forms"><Menubar.Item>forms</Menubar.Item></a>					
				<a href="/search"><Menubar.Item>search</Menubar.Item></a>
				</Menubar.Content>
			</Menubar.Menu>

			<Menubar.Menu>
				<Menubar.Trigger >codevolution</Menubar.Trigger>
				<Menubar.Content>
				<a href="/news"><Menubar.Item>news</Menubar.Item></a>					
				<a href="/auth"><Menubar.Item>auth</Menubar.Item></a>
				<a href="/auth-modal"><Menubar.Item>auth-modal</Menubar.Item></a>
				</Menubar.Content>
			</Menubar.Menu>

			<Menubar.Menu>
				<Menubar.Trigger >magrippis</Menubar.Trigger>
				<Menubar.Content>
				<a href="/api_learning/ideas"><Menubar.Item>ideas</Menubar.Item></a>					

				</Menubar.Content>
			</Menubar.Menu>

			<Menubar.Menu>
				<Menubar.Item href="/shadcn-table">Table/Search</Menubar.Item>
			</Menubar.Menu>
			
		</Menubar.Root>
		
	</nav>

	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
	
	
</div>

<slot />


<style>




</style>
