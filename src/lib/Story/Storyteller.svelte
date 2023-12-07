<script>
	import { fade } from 'svelte/transition';
	import Intro from '$lib/Story/Intro.svelte';
	import AdminStory from '$lib/Story/AdminStory.svelte';
	import FlagsStory from '$lib/Story/FlagsStory.svelte';
	import PostingStory from '$lib/Story/PostingStory.svelte';
	import BookmarksStory from '$lib/Story/BookmarksStory.svelte';
	import BlockedStory from '$lib/Story/BlockedStory.svelte';
	import { storyDone } from '$lib/store.js';
	import Conclusion from '$lib/Story/Conclusion.svelte';
	import ImageStory from "$lib/Story/ImageStory.svelte";
	export let badgesLeaderboard;
	export let bookmarksCount;
	export let flagsData;
	export let likesData;
	export let archiveData;
	export let visitsData;
	export let numQueue;

	export let username;
	export let admin;
	export let badge_count;
	export let user_field_1;
	export let profile_view_count;
	export let second_factor_enabled;
	export let associated_accounts;
	export let muted_usernames;
	export let ignored_usernames;

	let currentComponentIndex = 0;

	const componentConfigs = [
		{ component: Intro, props: { username } },
		{ component: AdminStory, props: { admin } },
		{ component: FlagsStory, props: { flagsData } },
		{ component: PostingStory, props: { archiveData } },
		{ component: BookmarksStory, props: { bookmarksCount } },
		{ component: BlockedStory, props: { muted_usernames, ignored_usernames } },
		{ component: ImageStory, props: {archiveData, visitsData, bookmarksCount, flagsData, username}},
		{ component: Conclusion, props: {} },
	];

	// // Change component every 10 seconds
	// setInterval(() => {
	//     currentComponentIndex = (currentComponentIndex + 1) % componentConfigs.length;
	// }, 10000);

	function handleTypingCompleted(event) {
		if (currentComponentIndex >= componentConfigs.length - 1) {
			$storyDone = true;
		}
		currentComponentIndex = (currentComponentIndex + 1) % componentConfigs.length;
	}

	function skipYapping() {
		$storyDone = true;
	}
</script>

<div class="flex h-screen items-center justify-center">
	<button class="variant-filled btn btn-sm absolute right-0 top-0 m-4" on:click={skipYapping}>
		Skip Yapping
	</button>
	{#each componentConfigs as { component, props }, index}
		{#if index === currentComponentIndex}
			<div in:fade={{ delay: 751, duration: 750 }} out:fade={{ duration: 750 }}>
				<svelte:component this={component} {...props} on:typingCompleted={handleTypingCompleted} />
			</div>
		{/if}
	{/each}
</div>
