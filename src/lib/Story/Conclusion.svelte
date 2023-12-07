<script>
	import { onMount, onDestroy } from 'svelte';
	import TypeIt from 'typeit';
	import { createEventDispatcher } from 'svelte';

	let typeItInstance;
	let typeItElement;
	const dispatch = createEventDispatcher();

	onMount(() => {
		typeItInstance = new TypeIt(typeItElement, {
			speed: 50,
			waitUntilVisible: true,
			lifeLike: true,
			html: true
		})

			.type("Ok I'll let you look at the data now...")
			.pause(1500)
			.delete()
			.type('Bye')
			.pause(1500)
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
