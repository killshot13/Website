<script lang="ts">
	import { CommunitySection, DesignSection, FeaturesSection, HeroSection, ThemesSection } from "$layout";
	import { Metadata } from "$lib";
	import { _ } from "svelte-i18n";
</script>

<svelte:head>
	<Metadata title={$_("metadata.home.title")} />
</svelte:head>

<HeroSection />

<DesignSection />

<FeaturesSection />

<ThemesSection />

<CommunitySection />