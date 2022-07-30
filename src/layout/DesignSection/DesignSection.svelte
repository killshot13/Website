<script lang="ts">
	import { links } from "$data/links";
	import { externalLink, HeaderChip, PageSection } from "$lib";
	import { Button } from "fluent-svelte";
	import { _ } from "svelte-i18n";

	let scrollY: number;
</script>

<svelte:window on:scroll={() => window.requestAnimationFrame(() => scrollY = window.scrollY )} />

<PageSection id="design-section">
	<HeaderChip>{$_("landing.design.chip")}</HeaderChip>
	<h2>{$_("landing.design.title")}</h2>
	<p>{$_("landing.design.description")}</p>
	<div class="buttons-spacer">
		<Button
			href="https://microsoft.com/store/apps/{links.storeId}"
			{...externalLink}
			variant="accent"
		>
			{$_("landing.design.try")}
		</Button>
		<Button variant="hyperlink"
		        href="https://www.microsoft.com/design/fluent/"
		        {...externalLink}
		>
			{$_("landing.design.design")}
		</Button>
	</div>
	<div class="design-image">
		<picture>
			<source
				media="(prefers-color-scheme: dark)"
				srcset="/screenshots/folder-list-dark.png"
			>
			<source
				media="(prefers-color-scheme: light)"
				srcset="/screenshots/folder-list-light.png"
			>
			<img
				alt={$_("landing.design.folderList")}
				class="files-screenshot"
				height="768"
				src="/screenshots/folder-list-light.png"
				style:transform="translateY({Math.floor(scrollY / -10)}px)"
				width="1024"
			>
		</picture>
		<picture>
			<source
				media="(prefers-color-scheme: dark)"
				srcset="/screenshots/win11-dark.jpg"
			>
			<source
				media="(prefers-color-scheme: light)"
				srcset="/screenshots/win11-light.jpg"
			>
			<img
				alt={$_("landing.design.win11wallpaper")}
				class="files-wallpaper"
				height="900"
				src="/screenshots/win11-light.jpg"
				width="1440"
			>
		</picture>
	</div>
</PageSection>

<style lang="scss">
	@use "DesignSection";
</style>
