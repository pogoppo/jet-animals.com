<script lang="ts">
	import '@fontsource/shippori-mincho';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Metadata from '$lib/components/Metadata.svelte';
	import Bluesky from './_components/Bluesky.svelte';
	import Shirokuma from './_components/Shirokuma.svelte';

	let { data } = $props();

	let scrollState = $state<'ready' | 'step1' | 'step2'>('ready');

	$effect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const scrollHeight = document.body.scrollHeight - window.innerHeight;
		const step1Threshold = scrollHeight * 0.25;
		const step2Threshold = scrollHeight * 0.75;

		ScrollTrigger.create({
			trigger: 'body',
			start: 'top top',
			end: 'bottom bottom',
			scrub: true,
			onUpdate: (self) => {
				const scrollY = self.scroll();

				switch (true) {
					case scrollY < step1Threshold:
						scrollState = 'ready';
						break;
					case scrollY < step2Threshold:
						scrollState = 'step1';
						break;
					default:
						scrollState = 'step2';
						break;
				}
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<Metadata title={data.article.metadata.title} />

<main>
	<snap-point></snap-point>
	<snap-point></snap-point>
	<snap-point></snap-point>
	<div class="stage">
		<Bluesky {scrollState} />
		<div class="shirokuma">
			<Shirokuma {scrollState} />
		</div>
		<article class="article" data-state={scrollState}>
			<header>
				<h1 class="article-heading">{data.article.metadata.title}</h1>
			</header>
			<div class="article-content">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.article.html}
			</div>
		</article>
	</div>
</main>

<style>
	:global(html) {
		scroll-snap-type: y mandatory;
	}
	:root {
		--color-bg-primary: #222;
		--color-fg-primary: #ffffff;
		--color-accent-primary: #174266;
		color: var(--color-fg-primary);
		font-family: 'Shippori Mincho', serif;
	}
	main {
		width: 100%;
		min-height: 100lvh;
		background-color: var(--color-bg-primary);
	}
	snap-point {
		display: block;
		height: 100lvh;
		scroll-snap-align: start;
	}
	.stage {
		display: grid;
		position: fixed;
		inset: 0;
		overflow: hidden;
		margin: auto;
		/* レイヤーブラー */
		&::after {
			content: '';
			pointer-events: none;
			position: absolute;
			inset: 0;
			backdrop-filter: blur(4px);
			mask-image: linear-gradient(to bottom, transparent 0%, transparent 80%, black 100%);
		}
		@media (min-aspect-ratio: 1) {
			grid-template-areas: 'shirokuma article';
			grid-template-columns: 1fr max(45%, 428px);
			aspect-ratio: 16 / 9;
			max-width: min(calc(96svh * 16 / 9), 1280px);
			max-height: min(calc(96vw * 9 / 16), 720px);
			border-radius: 8px;
		}
		@media (max-aspect-ratio: 1) {
			height: 100lvh;
			grid-template-areas: 'article' 'shirokuma';
			grid-template-rows: 1fr 50%;
		}
	}
	.shirokuma {
		grid-area: shirokuma;
		pointer-events: none;
		@media (min-aspect-ratio: 1) {
			align-self: flex-end;
			height: 90%;
		}
		@media (max-aspect-ratio: 1) {
			position: relative;
			@media (min-aspect-ratio: 0.6 / 1) {
				translate: -10vw 0%;
			}
		}
	}
	.article {
		container-type: inline-size;
		grid-area: article;
		align-self: center;
		justify-self: center;
		position: relative;
		z-index: 2;
		width: 100%;
		max-width: 640px;
		padding: 4cqmin;
		.article-heading {
			font-size: clamp(2.15rem, 11cqw, 3.2rem);
			font-weight: 800;
		}
		.article-content {
			display: flex;
			flex-direction: column;
			position: relative;
			line-height: 1.75;
			text-align: justify;
			font-size: clamp(1.75rem, 8cqw, 2.5rem);
			@media (min-aspect-ratio: 1) {
				gap: 1rem;
				margin-top: 1.5rem;
			}
			@media (max-aspect-ratio: 1) {
				gap: 0.5rem;
				margin-top: 1rem;
			}
			:global(p) {
				transition: filter 0.3s ease;
			}
		}
		&[data-state='ready'] {
			.article-content {
				:global(p) {
					filter: blur(4px);
				}
			}
		}
		&[data-state='step1'] {
			.article-content {
				:global(p:nth-of-type(n + 2)) {
					filter: blur(4px);
				}
			}
		}
	}
</style>
