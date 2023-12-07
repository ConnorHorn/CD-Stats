<script>
	import { onMount, onDestroy } from 'svelte';
	import TypeIt from 'typeit';
	import { createEventDispatcher } from 'svelte';

	export let archiveData;

	let typeItInstance;
	let typeItElement;
	const dispatch = createEventDispatcher();

	let specialComment = "Unimpressive posting history.<br> I'll leave it at that";
	if (archiveData.postCount > 10) {
		specialComment = 'You have posted before<br>Not much, but you have';
	}
	if (archiveData.postCount > 50) {
		specialComment = 'Good few posts<br> I bet there are a few acceptable ones';
	}
	if (archiveData.postCount > 150) {
		specialComment = 'This feels like the upper bound of an<br> acceptable post count';
	}
	if (archiveData.postCount > 350) {
		specialComment = "We like to post I see<br> I'm sure they're all great";
	}
	if (archiveData.postCount > 1000) {
		specialComment = '4 digits posting history?<br> Not good. Not good at all.';
	}
	if (archiveData.postCount > 2000) {
		specialComment = 'Over 2000 posts, really?<br> You really are dedicated to this';
	}
	if (archiveData.postCount > 3000) {
		specialComment = "That is a lot of posts<br> Cant say it's the most, but it's a lot";
	}
	if (archiveData.postCount > 6000) {
		specialComment =
			'Too many posts. Try this out:<br><a href="https://gprivate.com/6863y" class="text-blue-300">Link</a>';
	}

	onMount(() => {
		if (archiveData.postCount > 0) {
			typeItInstance = new TypeIt(typeItElement, {
				speed: 50,
				waitUntilVisible: true,
				lifeLike: true,
				html: true
			})
				.type(specialComment)
				.pause(2300)
				.delete(specialComment.length + 1)
				.pause(400)
				.type('You have posted ' + archiveData.postCount + ' times.')
				.pause(2000)
				.delete()
				.type('Your first post was on ' + archiveData.firstPost + '!')
				.pause(1500)
				.delete()
				.type('And with a total of ' + archiveData.likeCount + ' likes,')
				.pause(1500)
				.delete()
				.type(
					'You average ' +
						Math.round((archiveData.likeCount / archiveData.postCount) * 10) / 10 +
						' likes per post.'
				)
				.pause(1500)
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
				.type(`You have never posted`)
				.pause(2000)
				.delete()
				.pause(2500)
				.type(`Aight`)
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
