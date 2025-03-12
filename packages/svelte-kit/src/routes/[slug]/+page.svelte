<script>
	import Ad from '$lib/Ad.svelte';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="ad">
	<Ad name="slug" region="US" category="Travel" />
</div>

<style>
	.ad {
		width: 300px;
		height: 300px;
	}
</style>
