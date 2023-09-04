<script lang="ts">
	import type { User } from "firebase/auth";
	import { Doc } from "sveltefire";

	export let user: User;
</script>

<div class="flex flex-col justify-start w-full h-full items-center space-y-10">
	<h1 class="text-4xl font-bold">Credits</h1>

	<Doc ref={`codehint/${user.uid}`} let:data>
		<p>You currently have {data?.credits} 💎 credits</p>
	</Doc>

	<div class="flex flex-col justify-start w-full h-full items-center">
		<script async src="https://js.stripe.com/v3/buy-button.js">
		</script>

		<stripe-buy-button
			buy-button-id="buy_btn_1NmUhVI7V4YU0XGWMzrxnJVF"
			publishable-key="pk_live_51NmTeHI7V4YU0XGWZor8ilNAVy4SXhrDmF6aomHREXFSc2XnFd6VVq6hH4OZjcoPsvgIz2TY41gJ25N7RBk5XaP200tKaNLOKT"
			client-reference-id={user.uid}
		/>
	</div>
</div>

<style>
</style>
