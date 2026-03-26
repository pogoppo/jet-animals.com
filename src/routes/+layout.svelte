<script lang="ts">
	import 'ress';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>jet-animals.com</title>
</svelte:head>

{@render children()}
