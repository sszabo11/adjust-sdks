<script lang="ts">
	type Props = {
		onclick?: () => void;
	};
	let { onclick }: Props = $props();

	function Click() {
		console.log('Svelte things');
		onclick && onclick();
	}
</script>

<button onclick={Click}>Click me</button>
