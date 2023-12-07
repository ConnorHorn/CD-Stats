<script>
	import ExampleChart from '$lib/Graphs/ExampleChart.svelte';
	import MobilePercent from '$lib/Graphs/MobilePercent.svelte';
	import { onMount } from 'svelte';
	import AvgTimePerPost from '$lib/StatBlobs/AvgTimePerPost.svelte';
	import PostsRead from '$lib/StatBlobs/PostsRead.svelte';
	import TimeRead from '$lib/StatBlobs/TimeRead.svelte';
	import DaysVisited from '$lib/StatBlobs/DaysVisited.svelte';
	import DayRecord from '$lib/StatBlobs/DayRecord.svelte';
	import PercentVisited from '$lib/StatBlobs/PercentVisited.svelte';
	import TimeByMonth from '$lib/Graphs/TimeByMonth.svelte';
	import TimeByYear from '$lib/Graphs/TimeByYear.svelte';
	import BookmarkCount from '$lib/StatBlobs/BookmarkCount.svelte';
	import LikeCount from '$lib/StatBlobs/LikeCount.svelte';
	import TopicsTable from '$lib/Graphs/TopicsTable.svelte';
	import CategoriesTable from '$lib/Graphs/CategoriesTable.svelte';
	import LikesByMonth from '$lib/Graphs/LikesByMonth.svelte';
	import LikesByYear from '$lib/Graphs/LikesByYear.svelte';
	import PMsSent from '$lib/StatBlobs/PMsSent.svelte';
	import PMsByMonth from '$lib/Graphs/PMsByMonth.svelte';
	import PostsPosted from '$lib/StatBlobs/PostsPosted.svelte';
	import PostsByMonth from '$lib/Graphs/PostsByMonth.svelte';
	import PostsByYear from '$lib/Graphs/PostsByYear.svelte';
	import BadgesTable from '$lib/Graphs/BadgesTable.svelte';
	import FlagsByMonth from '$lib/Graphs/FlagsByMonth.svelte';
	import FlagsTable from '$lib/Graphs/FlagsTable.svelte';
	import FirstFlag from '$lib/StatBlobs/FirstFlag.svelte';
	import FlagsDealt from '$lib/StatBlobs/FlagsDealt.svelte';
	import QueuePosts from '$lib/StatBlobs/QueuePosts.svelte';
	import LikedDelete from '$lib/StatBlobs/LikedDelete.svelte';
	import LikesUndone from '$lib/StatBlobs/LikesUndone.svelte';
	import LikesGivenByYear from '$lib/Graphs/LikesGivenByYear.svelte';
	import LikesGivenByMonth from '$lib/Graphs/LikesGivenByMonth.svelte';
	import FirstPost from '$lib/StatBlobs/FirstPost.svelte';
	import LikesPerPost from '$lib/StatBlobs/LikesPerPost.svelte';
	import DayOfWeekRadar from '$lib/Graphs/DayOfWeekRadar.svelte';
	import { displayUsername } from '$lib/store.js';
	import BadgeCount from '$lib/StatBlobs/BadgeCount.svelte';
	import BlockedUsers from '$lib/StatBlobs/BlockedUsers.svelte';
	import ProfileViews from '$lib/StatBlobs/ProfileViews.svelte';
	import { fade, fly } from 'svelte/transition';

	let grid;

	onMount(async () => {
		const Isotope = (await import('isotope-layout')).default;
		grid = new Isotope('.grid', {
			itemSelector: '.grid-item',
			masonry: {
				columnWidth: 220
			}
		});

		window.addEventListener('resize', function () {
			grid.arrange();
		});

		return () => {
			window.removeEventListener('resize', grid.arrange);
		};
	});

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

	// console.log(badgesLeaderboard)
	// console.log(bookmarksCount)
	// console.log(flagsData)
	// console.log(likesData)
	// console.log(archiveData)
	// console.log(visitsData)
	// console.log(numQueue)
</script>

<div class="grid m-6">
	<!--<div class="card  grid-item grid-item&#45;&#45;width600 p-5 w-full sm:w-fit h-fit ">-->
	<!--    <ExampleChart/>-->
	<!--</div>-->
	<!--    <div class="card grid-item grid-item&#45;&#45;width200 p-5 w-full sm:w-fit h-fit text-3xl">-->
	<!--    {$username}'s Dashboard-->
	<!--    </div>-->

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<MobilePercent {visitsData} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<AvgTimePerPost value={visitsData.avgTimePerPost} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsRead value={visitsData.numPostsRead} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TimeRead value={visitsData.timeRead} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<DaysVisited value={visitsData.visitedCount} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PercentVisited value={visitsData.visitedPercent} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<DayRecord timeReadByDay={visitsData.timeReadByDay} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TimeByMonth array={visitsData.timeReadByMonth} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TimeByYear array={visitsData.timeReadByYear} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BookmarkCount value={bookmarksCount} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikeCount value={archiveData.likeCount} />
	</div>

	<div
		class="card grid-item grid-item--width500 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TopicsTable array={archiveData.topTopics} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesByMonth array={archiveData.likesByMonth} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesByYear array={archiveData.likesByYear} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PMsSent value={archiveData.pmCount} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PMsByMonth array={archiveData.pmsByMonth} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsPosted value={archiveData.postCount} />
	</div>
	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<ProfileViews value={profile_view_count} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsByMonth array={archiveData.postsByMonth} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BlockedUsers value={ignored_usernames.length + muted_usernames.length} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsByYear array={archiveData.postsByYear} />
	</div>

	<div
		class="card grid-item grid-item--width300 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BadgesTable array={badgesLeaderboard} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<FlagsByMonth array={flagsData.monthlyCountArray} />
	</div>

	<div
		class="card grid-item grid-item--width300 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<FlagsTable array={flagsData.flagLeaderboardArray} />
	</div>

	<div
		class="card grid-item grid-item--width300 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<CategoriesTable array={archiveData.topCategories} />
	</div>

	{#if flagsData.firstFlagDate !== ''}
		<div
			class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
			in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
		>
			<FirstFlag value={flagsData.firstFlagDate} />
		</div>
	{/if}

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<FlagsDealt value={flagsData.totalCount} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<QueuePosts value={numQueue} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikedDelete value={likesData.likedDeletedPostCount} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesUndone value={likesData.undidLikeCount} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesGivenByYear array={likesData.yearlyCounts} />
	</div>

	<div
		class="card grid-item grid-item--width600 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesGivenByMonth array={likesData.monthlyCounts} />
	</div>

	{#if archiveData.firstPost && archiveData.firstPost !== ''}
		<div
			class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
			in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
		>
			<FirstPost value={archiveData.firstPost} />
		</div>
	{/if}

	{#if archiveData.postCount > 0}
		<div
			class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
			in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
		>
			<LikesPerPost
				value={Math.round(
					(parseInt(archiveData.likeCount) / parseInt(archiveData.postCount)) * 10
				) / 10}
			/>
		</div>
	{/if}

	<div
		class="card grid-item grid-item--width500 p-1 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<DayOfWeekRadar days={visitsData.timeReadByWeekday} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BadgeCount value={badge_count} />
	</div>

	<div
		class="card grid-item grid-item--width200 p-5 w-full sm:w-fit h-fit"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BlockedUsers value={ignored_usernames.length + muted_usernames.length} />
	</div>
</div>

<style>
	.grid {
		width: 100%;
	}
	.grid-item {
		width: 750px;
		margin: 10px;
	}
	.grid-item--width200 {
		width: 200px;
	}
	.grid-item--width300 {
		width: 300px;
	}
	.grid-item--width500 {
		width: 500px;
	}
	.grid-item--width600 {
		width: 600px;
	}
</style>
