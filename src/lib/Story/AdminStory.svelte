<script>
	import { onMount, onDestroy } from 'svelte';
	import TypeIt from 'typeit';
	import { createEventDispatcher } from 'svelte';

	export let admin = false;

	let typeItInstance;
	let typeItElement;
	const dispatch = createEventDispatcher();

	onMount(() => {
		if (admin) {
			typeItInstance = new TypeIt(typeItElement, {
				speed: 50,
				waitUntilVisible: true,
				lifeLike: true,
				html: true
			})
				.type(`Says here you're an admin`)
				.pause(1300)
				.delete()
				.pause(500)
				.type('.')
				.pause(500)
				.type('.')
				.pause(500)
				.type('.')
				.pause(500)
				.delete()
				.pause(300)
				.type(`So, moving on`)
				.pause(650)
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
				.type(`Says here you're not an admin`)
				.pause(1300)
				.delete()
				.pause(300)
				.type(`That's good, I don't talk to those`)
				.pause(750)
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

<div class="card p-5 w-full sm:w-fit h-fit text-2xl">
	<div class="text-center" bind:this={typeItElement} />
</div>
