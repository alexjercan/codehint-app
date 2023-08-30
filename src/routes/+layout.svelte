<script lang="ts">
	import { FirebaseApp, SignedOut } from "sveltefire";
	import "../app.css";

	import { auth, firestore } from "$lib/firebase";
	import GoogleSignin from "$lib/components/GoogleSignin.svelte";
	import AnonymousSignin from "$lib/components/AnonymousSignin.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
</script>

<div class="flex flex-col w-screen h-screen">
	<FirebaseApp {auth} {firestore}>
		<Navbar />
		<main class="flex flex-col w-full h-full items-center justify-center">
			<slot />
			<div class="flex flex-col items-center justify-center">
				<SignedOut>
					<h1 class="text-xl">Login</h1>
					<GoogleSignin />
					<AnonymousSignin />
					<p class="footer">By signing up, you agree to the Terms of Service & Privacy Policy.</p>
				</SignedOut>
			</div>
		</main>
	</FirebaseApp>
</div>
