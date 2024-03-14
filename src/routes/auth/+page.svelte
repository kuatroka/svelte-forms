<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	export let form;
	const redirectTo = $page.url.searchParams.get('redirectTo') || '/';



	let params: any[] = [];

    $: {
        const searchParams = $page.url.searchParams;
        params = [];
        for (const [key, value] of searchParams) {
            params.push([key, value]);
            console.log(`Key: ${key}, Value: ${value}`);
        }
    }

</script>
{params}
<!-- {#each params as entry}

	{entry[0]}: {entry[1]}	
{/each} -->

<div class="flex justify-center">
	
	<form method="post" action="?/login&redirectTo={redirectTo}"
		use:enhance
		class="items-center w-1/3 my-4 flex flex-col gap-2">
		
		<p>{form?.message || ''}</p>
		<Input type="text" name="username" placeholder="Username" value={form?.username ?? ''} />
		<Input type="password" name="password" placeholder="Password" />
		<Button type="submit">Login</Button>
		<Button formaction="?/register&redirectTo={redirectTo}" type="submit">Register</Button>
	</form>
</div>


