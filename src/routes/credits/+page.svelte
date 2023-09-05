<script lang="ts">
	import { SignedIn } from "sveltefire";
	import Credits from "$lib/components/Credits.svelte";
</script>

<svelte:head>
	<title>Credits</title>
	<meta
		name="description"
		content="Page that allows users to buy credits for the web application."
	/>
</svelte:head>

<SignedIn let:user>
	<Credits {user} />
</SignedIn>
