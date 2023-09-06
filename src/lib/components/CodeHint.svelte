<script lang="ts">
	import { onMount } from "svelte";
	import { getDoc, setDoc, doc, Firestore, increment, updateDoc } from "firebase/firestore";
	import type { User } from "sveltefire";

	type Bug = {
		line: number;
		bug: string;
		hint: string;
	};

	type Hint = {
		analysis: string;
		bugs: Bug[];
	};

	export let user: User;
	export let firestore: Firestore;

	let editor = null;
	let model = "openai";
	let hint: Promise<Hint> | null = null;

	async function getHint(): Promise<Hint> {
		let code = editor.getValue();

		const userDoc = doc(firestore, "codehint", user.uid);
		const userSnap = await getDoc(userDoc);
		const apiKey = userSnap.data()?.apiKey;

		const response = await fetch("/api/hint", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ code, model, apiKey })
		});
		const result = await response.json();

		if (response.ok) {
			updateDoc(userDoc, { credits: increment(-1) });

			return result as Hint;
		} else {
			throw new Error(result);
		}
	}

	function handleSubmit() {
		hint = getHint();
	}

	onMount(async () => {
		const ace = await import("ace-builds/src-noconflict/ace");
		await import("ace-builds/esm-resolver");

		editor = ace.edit("editor");
		editor.session.setMode("ace/mode/python");
		editor.setTheme("ace/theme/dracula");
		editor.setOptions({
			fontSize: "16pt"
		});
	});
</script>

<div class="w-1/2 h-full flex flex-col justify-start items-center space-y-4">
	<label for="model">Select a Model:</label>
	<select id="model" class="select w-full max-w-xs" bind:value={model}>
		<option value="openai">OpenAI</option>
		<option value="llama2">Llama2</option>
	</select>

	<label for="code">Enter Code:</label>
	<div id="editor" />

	<button class="btn" on:click={handleSubmit}>Submit</button>

	{#await hint}
		<p>Waiting for hint...</p>
	{:then hint}
		{#if hint}
			<div class="w-full flex flex-col justify-start items-center space-y-4">
				<h3 class="text-xl font-bold">Analysis:</h3>
				<p>{hint.analysis}</p>
			</div>
			<div class="w-full flex flex-col justify-start items-center space-y-4">
				<h3 class="text-xl font-bold">Bugs:</h3>
				{#each hint.bugs as bug}
					<div>
						<div class="w-full flex flex-row justify-center items-center space-x-4">
							<p class="font-bold">Line {bug.line}:</p>
							<p>{bug.bug}</p>
						</div>
						<div class="w-full flex flex-row justify-center items-center space-x-4">
							<p class="font-bold">Hint:</p>
							<p>{bug.hint}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{:catch error}
		<p class="text-red-500">{error.message}</p>
	{/await}
</div>

<style>
	#editor {
		position: relative;
		width: 100%;
		height: 400px;
	}
</style>
