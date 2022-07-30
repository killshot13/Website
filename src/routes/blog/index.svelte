<script lang="ts">
	import { BlogCard, HeaderChip, Metadata, PageSection, tilt } from "$lib";
	import { Button } from "fluent-svelte";
	import type { Post } from ".";
	import { _, date } from "svelte-i18n";

	export let posts: Post[]

	const mainPost: Post = posts[0]

	let scrollY: number;
</script>

<svelte:head>
	<Metadata image="blog" title={$_("metadata.title.blog")} />
</svelte:head>

<svelte:window on:scroll={() => window.requestAnimationFrame(() => scrollY = window.scrollY )} />

<PageSection id="blog">
	<div class="blog-backdrop">
		<img
			alt=""
			src={mainPost.metadata.thumbnail}
			style:transform="translateY({Math.floor(scrollY / 2.5)}px)"
			width="0"
		>
	</div>
	<div class="main-post">
		<a href="/blog/{mainPost.path.replace(/\.[^/.]+$/, '')}/">
			<img
				alt="Main post thumbnail"
				height="422"
				src={mainPost.metadata.thumbnail}
				use:tilt={{ max: 2.5, scale: 1.01 }}
				width="633"
			>
		</a>
		<div class="main-post-info">
			<HeaderChip>{
				$date(new Date(mainPost.metadata.date.replace(/-/g, "/").replace(/T.+/, "")))
			}</HeaderChip>
			<h2>{mainPost.metadata.title}</h2>
			<p>{mainPost.metadata.description}</p>
			<Button
				href="/blog/{mainPost.path.replace(/\.[^/.]+$/, '')}/"
				variant="accent"
			>
				{$_("blog.readMore")}
			</Button>
		</div>
	</div>
	{#if posts.slice(1).length > 0}
		<div class="blog-cards">
			{#each posts.slice(1) as post}
				<BlogCard path={post.path} {...post.metadata}/>
			{/each}
		</div>
	{:else}
		<p>{$_("blog.empty")}</p>
	{/if}
</PageSection>

<style lang="scss">
	@use "../src/styles/pages/blog";
</style>