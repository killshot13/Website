<script lang="ts">
	import { externalLink, PageSection, TerminalCommand } from "$lib";
	import { Button, ContentDialog, MenuFlyout, MenuFlyoutItem } from "fluent-svelte";
	import { links } from "$data/links";
	import { onMount } from "svelte";
	import ArrowDownload from "@fluentui/svg-icons/icons/arrow_download_24_regular.svg?raw";
	import ChevronDown from "@fluentui/svg-icons/icons/chevron_down_24_regular.svg?raw";
	import Code from "@fluentui/svg-icons/icons/code_24_regular.svg?raw";
	import { _ } from "svelte-i18n";

	type DownloadSource = "Microsoft Store" | "Winget (CLI)" | "Sideload Package" | "Sideload Package (Preview)";
	const downloadSources: DownloadSource[] = ["Microsoft Store", "Winget (CLI)", "Sideload Package", "Sideload Package (Preview)"];

	// Check the user agent for a windows install
	let isWindows: boolean;

	let wingetDialogOpen = false;
	let wingetCommandCopied = false;

	let isDownloadDropdownOpen = false;

	// Group bindings
	let currentDownloadSource: DownloadSource = "Microsoft Store";

	const getStoreUrl = () => isWindows
		? `ms-windows-store://pdp/?ProductId=${ links.storeId }&mode=mini`
		: `https://www.microsoft.com/store/apps/${ links.storeId }?cid=FilesWebsite`;
	$: sideloadLink = `/download/${ currentDownloadSource !== "Sideload Package (Preview)" ? "stable" : "preview" }`;
	$: downloadLink = currentDownloadSource === "Microsoft Store" ? getStoreUrl() : sideloadLink;

	const copyWingetCommand = () => {
		navigator.clipboard.writeText("winget install -e 9NGHP3DX8HDX");
		wingetCommandCopied = true;
		setTimeout(() => {
			wingetCommandCopied = false;
		}, 500);
	};

	const changeDownloadSource = (downloadSource: DownloadSource) => {
		currentDownloadSource = downloadSource;
		localStorage.setItem("downloadSource", downloadSource);

		if (downloadSource !== "Winget (CLI)") {
			window.open(downloadSource === "Microsoft Store" ? getStoreUrl() : sideloadLink, "_blank");
		} else {
			wingetDialogOpen = true;
		}

		isDownloadDropdownOpen = false;
	};

	onMount(async () => {
		// Get the user's download preference
		if (!downloadSources.includes((localStorage.getItem("downloadSource") ?? "") as DownloadSource)) {
			localStorage.setItem("downloadSource", "Microsoft Store");
		}
		currentDownloadSource = (localStorage.getItem("downloadSource") ?? "Microsoft Store") as DownloadSource;

		isWindows = navigator.userAgent.includes("Windows");
	});

</script>

<PageSection id="hero-section">
	<div class="hero-left">
		<h1>{$_("landing.hero.title")}</h1>
		<p>{$_("landing.hero.description")}</p>
		<div class="buttons-spacer">
			<div class="split-button">
				<Button
					id="hero-download-button"
					variant="accent"
					href={currentDownloadSource !== "Winget (CLI)" ? downloadLink : undefined}
					on:click={() => {
						if (currentDownloadSource === "Winget (CLI)") wingetDialogOpen = true;
					}}
					{...(currentDownloadSource !== "Winget (CLI)" ? externalLink : undefined)}
				>
					{@html ArrowDownload}
					<div class="hero-button-inner">
						<h5>{$_("landing.hero.download.title")}</h5>
						<span>
							{$_(`landing.hero.download.${
								downloadSources.find(source => source === currentDownloadSource)
							}`)}
						</span>
					</div>
				</Button>
				<MenuFlyout bind:open={isDownloadDropdownOpen} placement="bottom">
					<Button
						aria-label={$_("landing.hero.download.choose")}
						title={$_("landing.hero.download.choose")}
						variant="accent"
					>
						{@html ChevronDown}
					</Button>
					<svelte:fragment slot="flyout">
						{#each downloadSources as downloadSource}
							<MenuFlyoutItem on:click={() => changeDownloadSource(downloadSource)}>
								{$_(`landing.hero.download.${downloadSource}`)}
							</MenuFlyoutItem>
						{/each}
					</svelte:fragment>
				</MenuFlyout>
			</div>
			<Button
				href="https://github.com/{links.github.owner}/{links.github.repo}/"
				{...externalLink}
			>
				{@html Code}
				<div class="hero-button-inner">
					<h5>{$_("landing.hero.github.title")}</h5>
					<span>{$_("landing.hero.github.description")}</span>
				</div>
			</Button>
		</div>
	</div>
	<div class="hero-right">
		<div class="hero-image-container">
			<picture>
				<source
					media="(prefers-color-scheme: dark)"
					srcset="/screenshots/hero-dark.png"
				>
				<source
					media="(prefers-color-scheme: light)"
					srcset="/screenshots/hero-light.png"
				>
				<img
					alt={$_("landing.hero.newTab")}
					height="768"
					src="/screenshots/hero-light.png"
					width="1024"
				>
			</picture>
		</div>
	</div>
	<div class="rainbow-background" slot="outer"></div>
</PageSection>

<ContentDialog
	bind:open={wingetDialogOpen}
	title={$_("landing.hero.winget.title")}
	size="max"
>
	{$_("landing.hero.winget.description")}
	<TerminalCommand command="winget install -e 9NGHP3DX8HDX" />
	<svelte:fragment slot="footer">
		<Button on:click={copyWingetCommand} variant="accent">
			{$_(`landing.hero.winget.${wingetCommandCopied ? "copied" : "copy"}`)}
		</Button>
		<Button on:click={() => (wingetDialogOpen = false)}>
			{$_("landing.hero.winget.close")}
		</Button>
	</svelte:fragment>
</ContentDialog>

<style lang="scss">
	@use "HeroSection";
</style>
