<script>
	import { Doc, SignedIn } from "sveltefire";
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-5xl">CodeHint</a>
	</div>
	<div class="flex-none gap-2">
		<a href="/credits" class="btn btn-ghost">
			<div>
				<SignedIn let:user>
					<Doc ref={`codehint/${user.uid}`} let:data>
						<p>{data?.credits} 💎</p>
					</Doc>
				</SignedIn>
			</div>
		</a>
		<a href="/account" class="btn btn-ghost btn-circle avatar">
			<div class="w-10 rounded-full">
				<SignedIn let:user>
					<img src={user.photoURL || "/avatar.png"} alt="avatar" />
				</SignedIn>
			</div>
		</a>
	</div>
</div>

<style>
</style>
