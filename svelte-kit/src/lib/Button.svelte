<script lang="ts">
	import { handleClick } from 'adjust-core/lib/handleClick.js';

	type Props = {
		onclick?: () => void;
	};
	let { onclick }: Props = $props();

	function Click() {
		console.log('Svelte things');
		handleClick();
		onclick && onclick();
	}
</script>

<button onclick={Click}>Click me</button>
