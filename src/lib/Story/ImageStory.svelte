<script>
	import { onMount, onDestroy } from 'svelte';
	import TypeIt from 'typeit';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let archiveData;

	export let visitsData;

	export let bookmarksCount;

	export let flagsData;

	export let username;

	let typeItInstance;
	let typeItElement;
	const dispatch = createEventDispatcher();

	let imageName;

	let extraImages = ['1', '2', '3', '4', '5'];

	if (daysSince(archiveData.firstPost) > 5800) {
		imageName = 'old';
	} else if (daysSince(archiveData.firstPost) < 365) {
		imageName = 'young';
	} else if (bookmarksCount > 80) {
		imageName = 'nerd';
	} else if (visitsData.avgTimePerPost > 42) {
		imageName = 'slow';
	} else if (archiveData.likeCount > 5000) {
		imageName = 'popular';
	} else if (archiveData.postCount > 1100) {
		imageName = 'yapper';
	} else if (flagsData.totalCount > 30) {
		imageName = 'flagger';
	} else {
		imageName = extraImages[randomImage(username)];
	}

	function randomImage(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0;
		}
		return Math.abs(hash % 5);
	}

	function daysSince(inputDate) {
		if (!inputDate) {
			return 0;
		}

		// Parse the input date
		const parsedDate = new Date(inputDate);

		// Check if the date is invalid
		if (isNaN(parsedDate)) {
			throw new Error('Invalid date format');
		}

		const today = new Date();

		today.setHours(0, 0, 0, 0);
		parsedDate.setHours(0, 0, 0, 0);

		const diffInMs = today - parsedDate;
		const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

		return Math.floor(diffInDays);
	}

	let displayImage = false;

	function showImage() {
		displayImage = !displayImage;
	}

	onMount(() => {
		typeItInstance = new TypeIt(typeItElement, {
			speed: 50,
			waitUntilVisible: true,
			lifeLike: true,
			html: true
		})
			.pause(300)
			.type('After looking at all your data. I drew this image of you. I hope you like it 🙂')
			.exec(() => {
				showImage();
			})
			.pause(6000)
			.delete()
			// .exec(() => {
			//     showImage();
			// })
			.pause(500)
			.exec(() => {
				setTimeout(() => dispatch('typingCompleted', { message: 'completed' }), 0);
			})
			.go();
	});

	onDestroy(() => {
		if (typeItInstance) {
			typeItInstance.destroy();
		}
	});
</script>

<div class="card flex h-fit w-full flex-col items-center justify-center p-5 text-2xl sm:w-fit">
	<div class="text-center" bind:this={typeItElement}></div>

	{#if displayImage}
		<img
			src="images/{imageName}.png"
			alt="Who you are"
			in:fade={{ duration: 500 }}
			class="mt-4 max-w-xs"
		/>
	{/if}
</div>
