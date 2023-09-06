<script lang="ts">
	import { firebaseSignOut } from "$lib/firebase";
	import { updateDoc, doc } from "firebase/firestore";
	import type { User } from "firebase/auth";
	import { Doc } from "sveltefire";
	import { firestore, generateUUID } from "$lib/firebase";

	export let user: User;

	function updateApiKey() {
		const apiKey = generateUUID();

		const userDoc = doc(firestore, "codehint", user.uid);
		updateDoc(userDoc, { apiKey });
	}
</script>

<div class="flex flex-col justify-between w-full h-full items-center">
	<h1 class="text-4xl font-bold">Account</h1>

	<div class="flex flex-col justify-start items-center space-y-10">
		<div class="flex flex-row justify-start w-full h-full items-center space-x-10">
			<button class="btn" on:click={updateApiKey}>Generate API Key</button>
			<Doc ref={`codehint/${user.uid}`} let:data>
				<span class="badge">
					{data?.apiKey}
				</span>
			</Doc>
		</div>
	</div>

	<div class="flex flex-col justify-center">
		<p>Logged in as {user.displayName || "Guest"}</p>
		<button on:click={firebaseSignOut} class="btn"> SignOut </button>
	</div>
</div>

<style>
</style>
