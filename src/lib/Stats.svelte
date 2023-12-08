<script>
	import ExampleChart from '$lib/Graphs/ExampleChart.svelte';
	import MobilePercent from '$lib/Graphs/MobilePercent.svelte';
	import { onMount } from 'svelte';
	import domtoimage from 'dom-to-image';

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
	import LikesGiven from '$lib/StatBlobs/LikesGiven.svelte';
	import GradientText from 'svelte-gradient-typography';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

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

	const imageCopiedToast = {
		message: 'Image Copied to Clipboard!',
		position: 't',
		hideDismiss: true,
		timeout: 1700,
		background: 'bg-gradient-to-tr from-blue-400 to-pink-400 text-black'
	};
	const textCopiedToast = {
		message: 'Text Copied to Clipboard!',
		position: 't',
		hideDismiss: true,
		timeout: 1700,
		background: 'bg-gradient-to-tr from-blue-400 to-pink-400 text-black'
	};
	const downladingToast = {
		message: 'Downloading Screenshot...',
		position: 't',
		hideDismiss: true,
		timeout: 1700,
		background: 'bg-gradient-to-tr from-blue-400 to-pink-400 text-black'
	};

	async function handleScreenshot() {
		try {
			const blob = await domtoimage.toBlob(document.body, {});
			if (!/Mobi|Android/i.test(navigator.userAgent)) {
				await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
				toastStore.trigger(imageCopiedToast);
			} else {
				toastStore.trigger(downladingToast);
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = 'screenshot.png';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.error('Error handling the screenshot:', error);
			alert('Failed to process screenshot.');
		}
	}

	let adjustedTime = -1;
	let interval = 'Seconds';
	if (visitsData.timeRead > 86400) {
		adjustedTime = Math.round(visitsData.timeRead / 86400);
		interval = 'Days';
	} else if (visitsData.timeRead > 3600) {
		adjustedTime = Math.round(visitsData.timeRead / 3600);
		interval = 'Hours';
	} else if (visitsData.timeRead > 60) {
		adjustedTime = Math.round(visitsData.timeRead / 60);
		interval = 'Minutes';
	}

	let avgTimeEmoji = '🐇';

	if (visitsData.avgTimePerPost > 22) {
		avgTimeEmoji = '🐢';
	}

	let shareString = `On Chief Delphi Since 2019 I:\n\n🕒 Read posts for ${adjustedTime} ${interval}\n📖 Read ${
		visitsData.numPostsRead
	} posts\n${avgTimeEmoji} Averaged ${Math.round(
		visitsData.avgTimePerPost
	)} Seconds Per Post Read\n💻 Visited ${visitsData.visitedCount} Days\n⛳️ Flagged ${
		flagsData.totalCount
	} Posts\n💌 Liked ${likesData.totalLikes} Posts\n❤️ Received ${
		archiveData.likeCount
	} Likes\n🔎 Got ${profile_view_count} Views On My Profile\n💀 Liked ${
		likesData.likedDeletedPostCount
	} Deleted Posts\n🤠 Really Liked "${archiveData.topTopics[0][0]}"\n🔗 https://cd-stats.com/`;

	async function handleShare() {
		if (navigator.share) {
			try {
				await navigator.share({
					text: shareString
				});
			} catch (error) {}
		} else {
			copyToClipboard(shareString);
		}
	}

	function copyToClipboard(text) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				toastStore.trigger(textCopiedToast);
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err);
			});
	}
</script>

<div
	class="container m-auto flex w-full grid-flow-row-dense auto-rows-max grid-cols-1 flex-col gap-4 p-6 md:grid md:grid-cols-3 xl:grid-cols-6"
>
	<!--<div class="card  grid-item grid-item&#45;&#45;width600 p-5 w-full sm:w-fit h-fit ">-->
	<!--    <ExampleChart/>-->
	<!--</div>-->
	<!--    <div class="card grid-item grid-item&#45;&#45;width200 p-5 w-full sm:w-fit h-fit text-3xl">-->
	<!--    {$username}'s Dashboard-->
	<!--    </div>-->

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<div class="flex h-full flex-col items-center justify-center text-center">
			<div class="mb-1">
				<GradientText size="42px">{username}</GradientText>
			</div>

			<!-- Buttons container -->
			<div class="mt-1 flex justify-center gap-3">
				{#if !/Mobi|Android/i.test(navigator.userAgent) && /Chrome|Chromium|Edg/i.test(navigator.userAgent)}
					<button
						type="button"
						class="variant-filled-secondary btn btn-sm"
						on:click={handleScreenshot}
					>
						<!-- SVG for Screenshot Button -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="white"
							class="h-7 w-7 stroke-gray-700"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
							/>
						</svg>
						<!--						<svg-->
						<!--							xmlns="http://www.w3.org/2000/svg"-->
						<!--							fill="none"-->
						<!--							viewBox="0 0 24 24"-->
						<!--							stroke-width="2.5"-->
						<!--							stroke="white"-->
						<!--							class="h-7 w-7 stroke-gray-700"-->
						<!--						>-->
						<!--							<path-->
						<!--								stroke-linecap="round"-->
						<!--								stroke-linejoin="round"-->
						<!--								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"-->
						<!--							/>-->
						<!--						</svg>-->
					</button>
				{/if}
				<button type="button" class="variant-filled-tertiary btn btn-sm" on:click={handleShare}>
					<!-- SVG for Share Button -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="white"
						class="h-7 w-7 stroke-gray-700"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsRead value={visitsData.numPostsRead} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<AvgTimePerPost value={visitsData.avgTimePerPost} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TimeRead value={visitsData.timeRead} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<DaysVisited value={visitsData.visitedCount} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PercentVisited value={visitsData.visitedPercent} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<DayRecord timeReadByDay={visitsData.timeReadByDay} />
	</div>

	<div
		class="card col-span-3 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TimeByMonth array={visitsData.timeReadByMonth} />
	</div>

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TimeByYear array={visitsData.timeReadByYear} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BookmarkCount value={bookmarksCount} />
	</div>

	<div
		class="card col-span-3 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<TopicsTable array={archiveData.topTopics} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikeCount value={archiveData.likeCount} />
	</div>

	<div
		class="card col-span-3 row-span-2 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesByMonth array={archiveData.likesByMonth} />
	</div>

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesByYear array={archiveData.likesByYear} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PMsSent value={archiveData.pmCount} />
	</div>

	<div
		class="card col-span-3 row-span-2 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PMsByMonth array={archiveData.pmsByMonth} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsPosted value={archiveData.postCount} />
	</div>

	<div
		class="card col-span-3 row-span-2 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsByMonth array={archiveData.postsByMonth} />
	</div>

	<div
		class="card col-span-3 row-span-2 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<PostsByYear array={archiveData.postsByYear} />
	</div>

	{#if archiveData.firstPost && archiveData.firstPost !== ''}
		<div
			class="card col-span-1 row-span-1 p-5"
			in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
		>
			<FirstPost value={archiveData.firstPost} />
		</div>
	{/if}

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<QueuePosts value={numQueue} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<ProfileViews value={profile_view_count} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BadgeCount value={badge_count} />
	</div>

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BadgesTable array={badgesLeaderboard} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<FlagsDealt value={flagsData.totalCount} />
	</div>

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<FlagsByMonth array={flagsData.monthlyCountArray} />
	</div>

	{#if flagsData.firstFlagDate !== ''}
		<div
			class="card col-span-1 row-span-1 p-5"
			in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
		>
			<FirstFlag value={flagsData.firstFlagDate} />
		</div>
	{/if}

	<div
		class="col-span-1row-span-1 card p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<FlagsTable array={flagsData.flagLeaderboardArray} />
	</div>

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<CategoriesTable array={archiveData.topCategories} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikedDelete value={likesData.likedDeletedPostCount} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesUndone value={likesData.undidLikeCount} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesGiven value={likesData.totalLikes} />
	</div>

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesGivenByYear array={likesData.yearlyCounts} />
	</div>

	<div
		class="card col-span-2 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<LikesGivenByMonth array={likesData.monthlyCounts} />
	</div>

	{#if archiveData.postCount > 0}
		<div
			class="card col-span-1 row-span-1 p-5"
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
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<BlockedUsers value={ignored_usernames.length + muted_usernames.length} />
	</div>

	<div
		class="card col-span-1 row-span-1 p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<MobilePercent {visitsData} />
	</div>

	<div
		class="card col-span-2 row-span-2 max-h-min p-5"
		in:fly={{ y: Math.random() * 300 - 150, x: Math.random() * 300 - 150, duration: 750 }}
	>
		<DayOfWeekRadar days={visitsData.timeReadByWeekday} />
	</div>
</div>
