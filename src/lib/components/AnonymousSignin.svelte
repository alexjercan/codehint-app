<script>
	import { signInAsGuest } from "$lib/firebase";
</script>

<button on:click={signInAsGuest}>
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 448 512">
		<style>
			svg {
				fill: #000000;
			}
		</style><path
			d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
		/></svg
	>
	Sign in as Guest
</button>

<style>
	button {
		@apply bg-white font-sans text-base text-black inline-flex shadow-md px-4 py-3 my-0.5 w-full cursor-pointer border-none;
	}
	svg {
		@apply w-5 h-5 mr-2 relative top-1;
	}
</style>
