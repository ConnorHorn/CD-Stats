<script>
	import { Accordion, AccordionItem, FileDropzone } from '@skeletonlabs/skeleton';
	import Papa from 'papaparse';
	import JSZip from 'jszip';
	import Stats from '$lib/Stats.svelte';
	import {
		calcBadges,
		calcBookmarks,
		calcFlags,
		calcLikes,
		calcArchive,
		calcVisits,
		calcQueue
	} from '$lib/stats.js';
	import { displayUsername, storyDone } from '$lib/store.js';
	import { extractUserData } from '$lib/prefs.js';
	import Storyteller from '$lib/Story/Storyteller.svelte';
	import GradientText from 'svelte-gradient-typography';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let files = [];
	let loaded = false;

	let badgesLeaderboard;
	let bookmarksCount;
	let flagsData;
	let likesData;
	let archiveData;
	let visitsData;
	let numQueue;
	let statsProps;
	let userData;
	let size;

	let showHelpCard = writable(false);

	onMount(() => {
		// Function to update size based on screen width
		const updateSize = () => {
			size = window.innerWidth < 640 ? '70px' : '120px';
		};

		// Set initial size and add event listener for window resize
		updateSize();
		window.addEventListener('resize', updateSize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener('resize', updateSize);
		};
	});

	function toggleHelpCard() {
		showHelpCard.update((n) => !n);
	}
	async function handleFiles() {
		const zipFile = files[0];
		if (!zipFile) return;

		const zipFileName = zipFile.name;

		const parts = zipFileName.split('-');

		if (parts.length >= 5) {
			const usernameParts = parts.slice(1, -3);

			// $displayUsername = usernameParts.join('-');
		}

		const zip = await JSZip.loadAsync(zipFile);

		for (const [filename, file] of Object.entries(zip.files)) {
			if (filename.includes('preferences.json') && !filename.includes('MACOS')) {
				const prefContent = await file.async('string');

				const jsonData = JSON.parse(prefContent);

				userData = extractUserData(jsonData);
				$displayUsername = userData.username;
			}

			if (filename.includes('.csv') && !filename.includes('MACOS')) {
				const csvContent = await file.async('string');
				Papa.parse(csvContent, {
					complete: function (parsedData) {
						if (filename.includes('badges.csv')) {
							badgesLeaderboard = calcBadges(parsedData.data);
							// console.log("Badges Leaderboard",badgesLeaderboard)
						} else if (filename.includes('bookmarks.csv')) {
							bookmarksCount = calcBookmarks(parsedData.data);
							// console.log("Bookmarks Count",bookmarksCount)
						} else if (filename.includes('flags.csv')) {
							flagsData = calcFlags(parsedData.data);
							// console.log("Flags Data",flagsData)
						} else if (filename.includes('likes.csv')) {
							likesData = calcLikes(parsedData.data);
							// console.log("Likes Data",likesData)
						} else if (filename.includes('user_archive.csv')) {
							archiveData = calcArchive(parsedData.data);
							// console.log("Archive Data",archiveData)
						} else if (filename.includes('visits.csv')) {
							visitsData = calcVisits(parsedData.data);
							// console.log("Visits Data",visitsData)
						} else if (filename.includes('queued_posts.csv')) {
							numQueue = calcQueue(parsedData.data);
							// console.log("# of posts in queue",numQueue)
						} else {
							// console.log(`Results for ${filename}:`, parsedData.data);
						}
					},
					error: function (error) {
						console.error('Error while parsing:', error);
					}
				});
			}
		}
		loaded = true;
		statsProps = {
			badgesLeaderboard,
			bookmarksCount,
			flagsData,
			likesData,
			archiveData,
			visitsData,
			numQueue
		};
	}
</script>

<svelte:head>
	<title>CD-Stats</title>
</svelte:head>

{#if !loaded}
	<div class="absolute inset-x-0 bottom-0 flex items-end justify-center">
		<div class="mb-4">
			Created by
			<a href="https://github.com/ConnorHorn" class="font-bold underline" target="_blank"
				>Connor Horn</a
			>
		</div>
	</div>

	<div class="flex h-screen flex-col justify-between">
		<div class="flex flex-grow flex-col items-center justify-center">
			<GradientText {size}>CD-stats</GradientText>

			<div class="h-64 w-2/3 p-6 text-center lg:w-1/3">
				<FileDropzone bind:files on:change={handleFiles} class="h-full w-full" name="dropzone">
					<span
						slot="message"
						class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
					>
						Drop Data Export Zip Here
					</span>
				</FileDropzone>
			</div>
		</div>

		<div class="absolute bottom-0 left-0 p-4 text-base text-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class=" h-10 w-10 cursor-pointer sm:h-16 sm:w-16"
				id="help"
				viewBox="0 0 24 24"
				role="button"
				tabindex="0"
				on:click={toggleHelpCard}
				on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleHelpCard()}
				aria-label="Help Information"
			>
				<path fill="none" d="M0 0h24v24H0V0z" />
				<path
					fill="#FFFFFF"
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"
				/>
			</svg>
		</div>

		{#if $showHelpCard}
			<div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
				<div class="card w-full rounded bg-white p-4 shadow-lg sm:w-1/3">
					<Accordion>
						<AccordionItem>
							<svelte:fragment slot="summary">What is this?</svelte:fragment>
							<svelte:fragment slot="content"
								>A website that summarizes statistics from a given users account on ChiefDelphi.com.
								It is for entertainment value only.</svelte:fragment
							>
						</AccordionItem>
						<AccordionItem>
							<svelte:fragment slot="summary">How do I get the Data?</svelte:fragment>
							<svelte:fragment slot="content"
								>Go to your Chief Delphi account preferences, and find the "Export Data" section.
								Click the button to request your data, and wait until you receive a PM with your
								data. You can then just drag that file straight into the dropbox here.</svelte:fragment
							>
						</AccordionItem>
						<AccordionItem>
							<svelte:fragment slot="summary">How do I know this is safe?</svelte:fragment>
							<svelte:fragment slot="content"
								>CD-Stats is designed to run in your browser without sending your data elsewhere.
								All analysis is done on your computer, so your information stays private. For extra
								caution, you can remove post content or personal details from the data files. The
								site doesn't use your post text, email, etc. You can check this by observing no data
								exchange in the network section of inspect element after the site loads, or by using
								the site in airplane mode.</svelte:fragment
							>
						</AccordionItem>
						<!-- ... -->
					</Accordion>
					<button
						class="mt-4 rounded bg-gray-300 px-4 py-2 text-black hover:bg-blue-700"
						on:click={toggleHelpCard}>Close</button
					>
				</div>
			</div>
		{/if}
	</div>
{:else if $storyDone}
	<div class="overflow-x-hidden">
		<Stats {...statsProps} {...userData} />
	</div>
{:else}
	<Storyteller {...statsProps} {...userData} />
{/if}
