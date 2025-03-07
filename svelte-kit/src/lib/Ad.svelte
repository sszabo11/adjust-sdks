<script lang="ts">
	import 'animate.css';
	import { getContext, onMount } from 'svelte';
	import { browser, dev } from '$app/environment';
	import { fade, slide } from 'svelte/transition';
	import { env } from '$env/dynamic/public';
	import Spinner from './loaders/Spinner.svelte';
	import { type Props, bounce, Unit, type Data } from 'adjust-core';
	import ErrorMessage from './error/ErrorMessage.svelte';
	import { page } from '$app/state';

	let props: Props = $props();

	let { name, key, group, region, fill, priority, category, context, tags, borderRadius } = props;

	let element: HTMLDivElement | null = $state(null);

	let ad_unit_id: number | undefined = $state(undefined);
	let ad_name = $state('');

	let page_time: number | undefined = undefined;

	let error: string | null = $state(null);
	let code_error: string | null = $state(null);
	let warning: string | null = $state(null);

	let in_viewport = $state(false);
	let loader: string = getContext('ad_loader');
	let loading = $state(true);

	onMount(async () => {
		requestAnimationFrame(async () => {
			let data: Data = {
				name,
				group: group || null,
				key: key || null,
				is_dev: dev,
				api_key: env.PUBLIC_ADJUST_KEY,
				in_viewport,
				priority,
				element: element!,
				path: page.url.pathname
			};
			let unit = new Unit(data, props);

			let errors = unit.get_errors();

			if (errors.length > 0) {
				error = errors[0];
			}

			let { new_element, error: load_err } = await unit.load();
			if (load_err) {
				error = load_err;
			}

			ad_name = group ?? name;

			if (new_element) {
				element!.appendChild(new_element);
				loading = false;
			}

			if (!unit.in_viewport) {
				unit.observe(
					() => (loading = false),
					(err: string) => (error = err)
				);
			}
		});

		bounce(page_time!);
	});

	function setTimer() {
		page_time = performance.now();
	}

	let hover = $state(false);
	function setHover(v: boolean) {
		hover = v;
	}
</script>

<svelte:head>
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
</svelte:head>
<div
	onclick={setTimer}
	onkeydown={() => {}}
	role="button"
	tabindex="-1"
	id="ad-unit"
	class="ad-unit"
	data-ad-unit-id={ad_unit_id}
>
	{#if error}
		<ErrorMessage {error} {code_error} />
	{:else if warning}
		<div class="warning-container">
			<span class="warning">Warning: {warning}</span>
		</div>
	{:else if loading}
		{#if loader === 'spinner'}
			<Spinner />
		{:else}
			<Spinner />
		{/if}
	{/if}
	<div class="ad-container">
		<div
			class="ad"
			aria-label="Ad"
			onfocus={() => {}}
			class:hide={loading}
			role="link"
			tabindex="-1"
			onmouseover={dev ? () => setHover(true) : null}
			onmouseleave={dev ? () => setHover(false) : null}
			bind:this={element}
		>
			{#if dev && hover}
				<div in:slide={{ axis: 'x', duration: 300 }} class="name">
					<span>{ad_name}</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
	.ad-unit {
		width: 100%;
		height: 100%;
		position: relative;
		outline: none;
		overflow: hidden;
	}

	.name {
		position: absolute;
		z-index: 999;
		top: 5px;
		right: 5px;
		padding: 2px 6px;
		border-radius: 4px;
		border: 1px solid black;
		transition: display 0.2s ease-in;
		background-color: #333333;
	}

	.hide {
		opacity: 0;
	}

	.loading-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 16px;
		color-scheme: light;
		background-color: #e2b29f;
	}

	.loading-container span {
		position: absolute;
		top: 20px;
		color: white;
	}

	.name .ad-container {
		width: 100%;
		height: 100%;
		z-index: 999;
	}

	.name span {
		color: white;
		text-wrap: nowrap;
		font-size: 14px;
	}

	.ad-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	pre {
		width: 100%;
		background-color: white;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 12px;
		overflow: scroll;
	}

	.ad {
		display: block;
		width: 100%;
		height: 100%;
		transition: opacity 0.2s ease-in;
	}

	.warning-container {
		background-color: #ffcf8c;
		text-align: left;
		top: 50px;
		border-radius: 12px;
		position: absolute;
		z-index: 999;
		padding: 12px;
		box-sizing: border-box;
	}
	.warning {
		font-weight: 500;
		font-size: 18px;
		color: #dd5c00;
	}

	.error-container a {
		color: black;
	}

	.ad-unit {
		text-decoration: none;
		color: black;
	}
	pre {
		width: 100%;
		height: 100%;
	}
	.footer {
		position: absolute;
		text-align: center;
		width: 100%;
	}

	h2 {
		margin: 0;
	}
</style>
