<script lang="ts">
	import 'animate.css';
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser, dev } from '$app/environment';
	import { fade, slide } from 'svelte/transition';
	import { env } from '$env/dynamic/public';
	import Spinner from './loaders/Spinner.svelte';
	import {
		server_url,
		type Props,
		type AdData,
		check_env,
		observe,
		check_props,
		get_pathname,
		get_size,
		check_group,
		check_viewport,
		bounce,
		inject,
		Unit
	} from 'adjust-core';
	import ErrorMessage from './error/ErrorMessage.svelte';

	let server_click = server_url({
		prod: '/click/click',
		dev: '/click/click/click/click',
		is_dev: dev
	});

	let props: Props = $props();

	let { name, key, group, region, fill, priority, category, context, tags, borderRadius } = props;

	let container_element: HTMLDivElement;
	let element: HTMLDivElement | null = $state(null);

	let ad_unit_id: number | undefined = $state(undefined);
	let ad_name = $state('');

	let data: AdData = $state(null);

	let page_time: number | undefined = undefined;
	let ad_dimensions = $state({ width: 0, height: 0 });

	let error: string | null = $state(null);
	let code_error: string | null = $state(null);
	let warning: string | null = $state(null);

	let in_viewport = $state(false);
	let loader: string = getContext('ad_loader');
	let loading = $state(true);

	onMount(async () => {
		requestAnimationFrame(async () => {
			let data = {
				name,
				group,
				key,
				is_dev: dev,
				api_key: env.PUBLIC_ADJUST_KEY,
				in_viewport,
				priority,
				element: element!,
				path: $page.url.pathname
			};
			console.log('element', element?.getBoundingClientRect());
			let unit = new Unit(data, props);

			let { new_element } = await unit.load(props, element!);

			console.log('fwe', new_element, unit.in_viewport);
			if (new_element) {
				element!.appendChild(new_element);
				loading = false;
			}
			//if (!element) {
			//	error = 'No unit element';
			//	return;
			//}

			//if (!element.parentElement) {
			//	error = 'No unit parent element';
			//	return;
			//}

			//({ warning } = check_env({
			//	env_var: env as Record<string, string>,
			//	dev,
			//	url: $page.url.hostname
			//}));

			//({ error, code_error } = check_props(props, {
			//	element: element!,
			//	container_element
			//}));
			//console.log(error);

			//let { ratio, width, height } = get_size({ element, parent: container_element });

			//let { is_group, unit_key_name } = check_group(group, props, {
			//	container: container_element
			//});

			//in_viewport = check_viewport({ container: container_element });

			//let pathname = get_pathname({
			//	params: $page.params,
			//	pathname: $page.url.pathname,
			//	pattern: $page.route.id!
			//});

			//ad_name = is_group ? unit_key_name : name;

			//data = {
			//	ad_unit_tag: 'banana',
			//	ad_unit_name: ad_name,
			//	ad_unit_group: is_group ? group : null,
			//	ad_unit_type: is_group && group ? 'group' : 'page',
			//	key,
			//	in_viewport,
			//	endpoint: pathname,
			//	tags: tags ?? ['gym', 'equipment', 'fitness'],
			//	category: category ?? 'Educational Toys',
			//	region: region ?? 'JP',
			//	context,
			//	language: 'fr',
			//	gender: 'any',
			//	ratio,
			//	fill: fill ?? '',
			//	width: width,
			//	height: height
			//};

			//if (!priority) {
			//	priority = in_viewport ? 3 : 0;
			//}

			//if (in_viewport) {
			//	({ error } = await inject(
			//		{ element, priority, in_viewport, env: env as any, is_dev: dev },
			//		props,
			//		data
			//	));
			//}

			// TODO: detach intersection observer after ad comes into viewport
			//if (!in_viewport) {
			//	observe(
			//		{ in_viewport, is_dev: dev, env: env as any, element, priority },
			//		props,
			//		data,
			//		() => {
			//			console.log('set in viewport');
			//			in_viewport = true;
			//			loading = false;
			//		},
			//		(err: string) => (error = err)
			//	);
			//}
		});

		bounce(page_time!);
		console.log('end mount');
	});

	let details = $state(null);
	let show_details = $state(false);

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
	bind:this={container_element}
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
	{:else if show_details}
		<h2>Requested</h2>
		<pre>{JSON.stringify({}, null, 4)}</pre>

		<h2>Results</h2>
		<pre>{JSON.stringify(details, null, 4)}</pre>
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
				<div
					in:slide={{ axis: 'x', duration: 300 }}
					style="right: calc(5px - {ad_dimensions.width - element.getBoundingClientRect().width}px)"
					class="name"
				>
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
	}

	.name span {
		color: white;
		text-wrap: nowrap;
		font-size: 14px;
	}

	.ad-container {
		width: 100%;
		height: 100%;
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
