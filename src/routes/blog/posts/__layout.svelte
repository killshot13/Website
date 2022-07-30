<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ url, fetch }) => ({
		props: {
			post: await (await fetch(`${ url.pathname }.json`)).json()
		}
	});
</script>

<script lang="ts">
	import { Metadata, externalLink } from "$lib";
	import Share from "@fluentui/svg-icons/icons/share_24_regular.svg?raw";
	import ArrowLeft from "@fluentui/svg-icons/icons/arrow_left_24_regular.svg?raw";
	import { IconButton, MenuFlyout, MenuFlyoutItem } from "fluent-svelte";
	import type { Post } from "..";
	import { _, date as dateFormat } from "svelte-i18n";

	export let post: Post["metadata"];

	const { title, thumbnail, author, date } = post;
</script>

<svelte:head>
	<Metadata image={thumbnail} title={$_("metadata.title.blogPost", { values: { title }})} />
</svelte:head>

<section class="blog-post">
	<article>
		<div class="post-title">
			<IconButton
				--icon-color="var(--text-color-secondary)"
				aria-label="Back to Blog"
				class="back-button"
				href="/blog"
				title={$_("blog.back")}
			>
				{@html ArrowLeft}
			</IconButton>
			<h1>{title}</h1>
		</div>
		<div class="post-info">
			<img alt="{author} avatar" src="https://github.com/{author}.png">
			<a
				class="hyperlink"
				href="https://github.com/{author}"
				{...externalLink}>@{author}</a
			>
			<span>•</span>
			{$dateFormat(new Date(date.replace(/-/g, "/").replace(/T.+/, "")), {
				year: "numeric", month: "short", day: "numeric"
			})}
			<MenuFlyout placement="bottom">
				<IconButton aria-label={$_("blog.share")} class="share-button" size={20} title="Share">
					{@html Share}
				</IconButton>
				<svelte:fragment slot="flyout">
					<MenuFlyoutItem
						on:click={() => navigator.clipboard.writeText(window.location.href)}
					>
						{$_("blog.copyUrl")}
					</MenuFlyoutItem>
					<MenuFlyoutItem
						href="https://twitter.com/intent/tweet?text={window.location.href}"
						{...externalLink}
					>
						{$_("blog.copy.twitter")}
					</MenuFlyoutItem>
					<MenuFlyoutItem
						href="https://www.facebook.com/sharer/sharer.php?u={window.location.href}"
						{...externalLink}
					>
						{$_("blog.copy.facebook")}
					</MenuFlyoutItem>
				</svelte:fragment>
			</MenuFlyout>
		</div>
		{#if thumbnail}
			<img class="post-thumbnail" src={thumbnail} alt="Thumbnail">
		{/if}
		<div class="markdown-body">
			<slot />
		</div>
	</article>
</section>

<style lang="scss">
	@use "../src/styles/pages/blogPost";
</style>