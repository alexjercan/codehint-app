<script lang="ts">
	import { SignedIn } from "sveltefire";
	import CodeHint from "$lib/components/CodeHint.svelte";
</script>

<svelte:head>
	<title>Code Hint</title>
	<meta
		name="description"
		content="Dashboard that allows users to generate hints for bugs in
        source code."
	/>
</svelte:head>

<SignedIn>
	<CodeHint />
</SignedIn>
