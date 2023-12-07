<script>
	import { onMount, onDestroy } from 'svelte';
	import TypeIt from 'typeit';
	import { createEventDispatcher } from 'svelte';

	export let bookmarksCount;

	let typeItInstance;
	let typeItElement;
	const dispatch = createEventDispatcher();

	let specialComment = "That's the right amount.<br> Do people actually use this feature?";
	if (bookmarksCount > 0) {
		specialComment =
			"Anything more than 0 is not good.<br>You do not need to save those pages<br>I would know, I've seen them";
	}

	onMount(() => {
		typeItInstance = new TypeIt(typeItElement, {
			speed: 50,
			waitUntilVisible: true,
			lifeLike: true,
			html: true
		})
			.type('You have ' + bookmarksCount + ' bookmarks.')
			.pause(2300)
			.delete(specialComment.length + 1)
			.pause(400)
			.type(specialComment)
			.pause(2000)
			.delete()
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

<div class="card p-5 w-full sm:w-fit h-fit text-2xl">
	<div class="text-center" bind:this={typeItElement} />
</div>
