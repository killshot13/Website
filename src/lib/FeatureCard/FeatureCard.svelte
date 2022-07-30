<script lang="ts">
	import Question from "@fluentui/svg-icons/icons/question_24_regular.svg?raw";
	import { _ } from "svelte-i18n";

	export let localizationId = "";
	export let clickable = false;
	export let selected = false;
	export let icon = Question;
</script>

{#if clickable}
	<button class="feature-card" on:click class:selected {...$$restProps}>
		{@html icon}
		<h4>
			<slot>Unknown</slot>
		</h4>
		<p>{$_(`landing.features.cards.${localizationId}.description`)}</p>
	</button>
{:else}
	<div class="feature-card" on:click class:selected {...$$restProps}>
		{@html icon}
		<h4>
			<slot>Unknown</slot>
		</h4>
		<p>{$_(`landing.features.cards.${localizationId}.description`)}</p>
	</div>
{/if}

<style lang="scss">@use "./FeatureCard";
</style>
