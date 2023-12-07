<script>
	import { onMount, onDestroy } from 'svelte';
	import TypeIt from 'typeit';
	import { createEventDispatcher } from 'svelte';

	export let muted_usernames = [];
	export let ignored_usernames = [];

	let combinedList = muted_usernames.concat(ignored_usernames);

	let typeItInstance;
	let typeItElement;
	const dispatch = createEventDispatcher();

	let specialComment =
		'Probably normal to have one or two people ignored.<br> One could argue ' +
		combinedList.length +
		' Users is good.';
	if (combinedList.length > 5) {
		specialComment =
			combinedList.length + ' people blocked<br>Nothing crazy, but perhaps worthy of retrospection';
	}
	if (combinedList.length > 20) {
		specialComment =
			'That is a bunch of blocked users<br>' +
			combinedList.length +
			'?<br>Maybe you should try to be more open minded.';
	}
	if (combinedList.length > 50) {
		specialComment =
			combinedList.length + ' Users Muted or Ignored<br>.<br>.<br>.<br> Look Inwards';
	}

	onMount(() => {
		if (combinedList.length > 0) {
			typeItInstance = new TypeIt(typeItElement, {
				speed: 50,
				waitUntilVisible: true,
				lifeLike: true,
				html: true
			})
				.type(specialComment)
				.pause(2600)
				.delete(specialComment.length + 1)
				.type('Not a fan of ' + combinedList[0] + '?')
				.pause(1300)
				.delete()
				.type('I get it.')
				.pause(1000)
				.delete()
				.exec(() => {
					setTimeout(() => dispatch('typingCompleted', { message: 'completed' }), 0);
				})
				.go();
		} else {
			typeItInstance = new TypeIt(typeItElement, {
				speed: 50,
				waitUntilVisible: true,
				lifeLike: true,
				html: true
			})
				.type(`You have no users muted or ignored.`)
				.pause(2000)
				.delete()
				.type(`Congrats on liking everyone😎😎😎`)
				.pause(1600)
				.delete()
				.exec(() => {
					setTimeout(() => dispatch('typingCompleted', { message: 'completed' }), 10);
				})
				.go();
		}
	});

	onDestroy(() => {
		if (typeItInstance) {
			typeItInstance.destroy();
		}
	});
</script>

<div class="card h-fit w-full p-5 text-2xl sm:w-fit">
	<div class="text-center" bind:this={typeItElement} />
</div>
