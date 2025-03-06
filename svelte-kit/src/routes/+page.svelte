<script>
	import Ad from '$lib/Ad.svelte';
	import Group from '$lib/Group.svelte';
	import { articles } from './_articles.js';
	import Article from './_components/Article.svelte';
	import ArticleAd from './_components/ArticleAd.svelte';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="ad">
	<Ad name="meow" region="US" category="Cooking" />
</div>

<div class="ads">
	<Group name="cats">
		<Ad group="cats" name="plom" key="1" region="US" category="Travel" />
	</Group>
</div>

<!--
<div class="ad far">
	<Ad name="meow" region="US" category="Travel" />
</div>
-->

<section>
	<h4>For you</h4>
	<div class="articles">
		<Group name="trending">
			{#each articles.sort(() => Math.random() - 0.5) as article, i}
				{#if i % 5 === 0}
					<ArticleAd priority={5} group="trending" key={(i / 5 + 1).toString()} name="" />
				{/if}
				<Article {...article} />
			{/each}
		</Group>
	</div>
</section>

<style>
	:global(body) {
		background-color: black;
		color: white;
	}
	.ad {
		width: 300px;
		height: 300px;
	}

	.ads {
		width: 300px;
		height: 300px;
	}

	.far {
		position: absolute;
		left: 200%;
	}

	.page {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}

	.articles {
		display: flex;
		gap: 30px;
		overflow-x: auto;
	}

	.header-ads {
		display: flex;
		align-items: center;
	}

	.ad-meow {
		width: 300px;
		height: 200px;
	}

	section h4 {
		font-size: 24px;
		font-weight: 400;
	}
</style>
