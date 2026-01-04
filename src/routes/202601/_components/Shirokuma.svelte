<script lang="ts">
	let { scrollState }: { scrollState: string } = $props();
</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/202601/mask-goggles.webp" />
	<link rel="preload" as="image" href="/images/202601/shirokuma-primary.webp" />
	<link rel="preload" as="image" href="/images/202601/underwear-diff-wind.webp" />
	<link rel="preload" as="image" href="/images/202601/underwear-primary.webp" />
</svelte:head>

<the-shirokuma aria-hidden="true">
	<shirokuma-frames>
		<img src="/images/202601/shirokuma-primary.webp" alt="" />
	</shirokuma-frames>
	<goggle-reflection aria-hidden="true">
		<img src="/images/202601/background-bluesky.webp" alt="" />
		<img src="/images/202601/background-bluesky.webp" alt="" />
	</goggle-reflection>
	<the-underwear aria-hidden="true" data-state={scrollState}>
		<underwear-frames>
			<img src="/images/202601/underwear-diff-wind.webp" alt="" />
			<img src="/images/202601/underwear-primary.webp" alt="" />
			<img src="/images/202601/underwear-diff-wind.webp" alt="" />
		</underwear-frames>
	</the-underwear>
</the-shirokuma>

<style>
	the-shirokuma {
		display: flow-root;
		position: relative;
		width: 100%;
		height: 100%;
		shirokuma-frames,
		goggle-reflection,
		the-underwear {
			position: absolute;
			inset: 0;
			margin: auto;
		}
		shirokuma-frames {
			display: grid;
			@media (min-aspect-ratio: 1) {
				justify-content: flex-end;
			}
			@media (max-aspect-ratio: 1) {
				justify-content: center;
				@media (max-aspect-ratio: 0.7 / 1) {
					justify-content: flex-end;
				}
			}
			> img {
				grid-area: 1 / 1;
				width: auto;
				height: 100%;
				min-height: 0;
			}
		}
		goggle-reflection {
			display: flex;
			mask-image: url('/images/202601/mask-goggles.webp');
			mask-size: auto 100%;
			mask-repeat: no-repeat;
			mix-blend-mode: overlay;
			opacity: 0.5;
			@media (min-aspect-ratio: 1) {
				mask-position: right bottom;
			}
			@media (max-aspect-ratio: 1) {
				mask-position: center bottom;
				@media (max-aspect-ratio: 0.7 / 1) {
					mask-position: right bottom;
				}
			}
			> img {
				margin-top: 10%;
				width: auto;
				height: 50%;
				user-select: none;
				transform: translate3d(0, 0, 0);
				animation: scroll-strip 25s linear infinite;
				will-change: transform;
			}
		}
		the-underwear {
			transition: all 0.075s ease-in-out;
			&:global(:not([data-state='step3'])) {
				opacity: 0;
				translate: 75% 20%;
				rotate: -20deg;
			}
			&:global([data-state='step3']) {
				opacity: 1;
				translate: 0 0;
				rotate: 0deg;
			}
			underwear-frames {
				display: grid;
				position: absolute;
				inset: 0;
				width: 100%;
				height: 102%;
				margin: auto;
				filter: drop-shadow(-8px 8px 4px rgba(0, 0, 0, 0.5));
				@media (min-aspect-ratio: 1) {
					justify-content: flex-end;
				}
				@media (max-aspect-ratio: 1) {
					justify-content: center;
					@media (max-aspect-ratio: 0.7 / 1) {
						justify-content: flex-end;
					}
				}
				> img {
					grid-area: 1 / 1;
					width: auto;
					height: 100%;
					min-height: 0;
					&:nth-child(1),
					&:nth-child(2) {
						animation:
							underwear-batabata 0.1s step-end infinite,
							underwear-katakata 0.05s infinite alternate;
						clip-path: polygon(0 100%, 52% 100%, 75% 63%, 43% 25%, 0 25%);
						filter: blur(1px);
					}
					&:nth-child(1) {
						animation-delay: 0s;
					}
					&:nth-child(2) {
						animation-delay: 0.05s, 0s;
					}
					&:nth-child(3) {
						animation: underwear-katakata 0.1s infinite alternate;
						clip-path: polygon(100% 1%, 100% 65%, 74% 64%, 41% 26%, 49% 0);
					}
				}
			}
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
	@keyframes underwear-batabata {
		50% {
			opacity: 0;
		}
	}
	@keyframes underwear-katakata {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 0.25deg;
		}
	}
</style>
