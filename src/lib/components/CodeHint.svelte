<script lang="ts">
	let code = "";
	let model = "openai";
	let result = "";

	async function handleSubmit() {
		const response = await fetch("/api/hint", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ code, model })
		});

		result = await response.text();
	}
</script>

<div class="w-full h-full flex flex-col justify-start items-center space-y-4">
	<label for="model">Select a Model:</label>
	<select id="model" class="select w-full max-w-xs" bind:value={model}>
		<option value="openai">OpenAI</option>
		<option value="llama2">Llama2</option>
	</select>

	<label for="code">Enter Code:</label>
	<textarea
		id="code"
		class="textarea textarea-bordered textarea-lg w-full max-w-xs"
		bind:value={code}
	/>

	<button class="btn" on:click={handleSubmit}>Submit</button>

	<div>{result}</div>
</div>
