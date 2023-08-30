<script lang="ts">
	import { SignedIn } from "sveltefire";
	import Account from "$lib/components/Account.svelte";
</script>

<svelte:head>
	<title>Account</title>
	<meta name="description" content="Page that allows user to manage their accounts." />
</svelte:head>

<SignedIn let:user>
	<Account {user} />
</SignedIn>
