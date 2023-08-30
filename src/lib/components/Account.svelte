<script lang="ts">
	import { firebaseSignOut } from "$lib/firebase";
	import type { User } from "firebase/auth";

	export let user: User;
</script>

<div class="flex flex-col justify-between w-full h-full items-center">
	<h1 class="text-4xl font-bold">Account</h1>

	<div class="flex flex-col justify-center">
		<p>Logged in as {user.displayName || "Guest"}</p>
		<button on:click={firebaseSignOut} class="btn"> SignOut </button>
	</div>
</div>

<style>
</style>
