<script lang="ts">
	let { scrollState }: { scrollState: string } = $props();
</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/202601/background-bluesky.webp" />
</svelte:head>

<background-bluesky aria-hidden="true" data-state={scrollState}>
	<img src="/images/202601/background-bluesky.webp" alt="" />
	<img src="/images/202601/background-bluesky.webp" alt="" />
</background-bluesky>

<style>
	background-bluesky {
		display: flex;
		position: absolute;
		inset: 0;
		overflow: hidden;
		margin: auto;
		filter: blur(4px);
		scale: 1.05;
		&::after {
			content: '';
			pointer-events: none;
			position: absolute;
			inset: 0;
			background: linear-gradient(
				to right,
				transparent 0%,
				transparent 50%,
				var(--color-accent-primary) 100%
			);
			opacity: 0.5;
		}
		> img {
			user-select: none;
			transform: translate3d(0, 0, 0);
			animation: scroll-strip 20s linear infinite;
			will-change: transform;
		}
	}
	@keyframes scroll-strip {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>
