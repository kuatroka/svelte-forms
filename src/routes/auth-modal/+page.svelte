<script>
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	export let form;
	const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
</script>

<div class="flex justify-center">
	
	<form method="post" action="/auth?/login" class="items-center w-1/3 my-4 flex flex-col gap-2">
		
		<p>{form?.message || ''}</p>
		<Input type="text" name="username" placeholder="Username" value={form?.username ?? ''} />
		<Input type="password" name="password" placeholder="Password" />
		<Button type="submit">Login</Button>
		<Button formaction="/auth?/register" type="submit">Register</Button>
		<!-- <button formaction="?/register&redirectTo={redirectTo}">Register</button> -->
	</form>
</div>