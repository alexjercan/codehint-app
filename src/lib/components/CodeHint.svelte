<script lang="ts">
	import { onMount } from "svelte";

	let editor = null;
	let model = "openai";
	let hint: Promise<string> = Promise.resolve("");

	async function getHint() {
		let code = editor.getValue();

		const response = await fetch("/api/hint", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ code, model })
		});
		const result = await response.text();

		if (response.ok) {
			return result;
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

<div class="w-full h-full flex flex-col justify-start items-center space-y-4">
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
		<p>{hint}</p>
	{:catch error}
		<p class="text-red-500">{error.message}</p>
	{/await}
</div>

<style>
	#editor {
		position: relative;
		width: 500px;
		height: 400px;
	}
</style>
