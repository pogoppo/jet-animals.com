<script lang="ts">
	import '@fontsource/shippori-mincho';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Metadata from '$lib/components/Metadata.svelte';
	import Bluesky from './_components/Bluesky.svelte';
	import Shirokuma from './_components/Shirokuma.svelte';
	import { formatToJapaneseEra } from '$lib/utils/date';

	let { data } = $props();

	let scrollState = $state<'ready' | 'step1' | 'step2' | 'step3'>('ready');

	$effect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const scrollHeight = document.body.scrollHeight - window.innerHeight;
		const step1Threshold = scrollHeight * 0.1;
		const step2Threshold = scrollHeight * 0.5;
		const step3Threshold = scrollHeight * 0.95;

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
					case scrollY < step3Threshold:
						scrollState = 'step2';
						break;
					default:
						scrollState = 'step3';
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
	<div class="stage">
		<Bluesky {scrollState} />
		<div class="shirokuma">
			<Shirokuma {scrollState} />
		</div>
		<article class="article" data-state={scrollState}>
			<header>
				<h1 class="article-heading">{data.article.metadata.title}</h1>
				<time class="article-date" datetime={data.article.metadata.date}>
					{formatToJapaneseEra(data.article.metadata.date)}
				</time>
			</header>
			<div class="article-content">
				{@html data.article.html}
				<eol-mark>
					<img src="/images/eol.webp" alt="End of Line" />
				</eol-mark>
			</div>
		</article>
	</div>
</main>

<style>
	:root {
		--color-bg-primary: #222;
		--color-fg-primary: #ffffff;
		--color-accent-primary: #174266;
		color: var(--color-fg-primary);
		font-family: 'Shippori Mincho', serif;
	}
	main {
		width: 100%;
		height: 200lvh;
		background-color: var(--color-bg-primary);
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
			max-width: min(calc(96vh * 16 / 9), 1280px);
			max-height: min(calc(96vw * 9 / 16), 720px);
			border-radius: 8px;
		}
		@media (max-aspect-ratio: 1) {
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
		padding: 2.5rem;
		@media (max-width: 640px) {
			padding: 1.5rem;
		}
		.article-heading {
			font-size: clamp(2rem, 11cqw, 3rem);
			font-weight: 800;
		}
		.article-date {
			display: flow-root;
			width: fit-content;
			margin-top: 0.25rem;
			padding: 0.25rem 0.5rem;
			background-color: color-mix(in srgb, var(--color-accent-primary) 75%, transparent 25%);
			background-blend-mode: multiply;
			@media (min-aspect-ratio: 1) {
				font-size: 0.9rem;
			}
			@media (max-aspect-ratio: 1) {
				font-size: 0.8rem;
			}
		}
		.article-content {
			display: flex;
			flex-direction: column;
			position: relative;
			line-height: 1.75;
			text-align: justify;
			font-size: clamp(1rem, 6cqw, 1.5rem);
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
		eol-mark {
			pointer-events: none;
			position: absolute;
			bottom: 0;
			right: 0;
			translate: 15% 30%;
			width: 33%;
			max-width: 160px;
			height: auto;
			rotate: -25deg;
			opacity: 0.8;
			transition: all 0.3s ease;
			> img {
				width: 100%;
				height: auto;
				user-select: none;
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
		&[data-state='step2'] {
			.article-content {
				:global(p:nth-of-type(n + 3)) {
					filter: blur(4px);
				}
			}
		}
		&:not([data-state='step3']) {
			.article-content eol-mark {
				opacity: 0;
				scale: 1.2;
			}
		}
	}
</style>
