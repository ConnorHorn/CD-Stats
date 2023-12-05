<script>
    import { onMount, onDestroy } from 'svelte';
    import TypeIt from 'typeit';
    import { createEventDispatcher } from 'svelte';

    export let username = "User";
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
            .type(`Hello <span class="text-xs">small</span><br>${username}`)
            .pause(750)
            .delete()
            .type(`Hi <span class="text-base">medium</span><br>${username}`)
            .pause(750)
            .delete()
            .type(`Greetings <span class="text-xl">large</span><br>${username}`)
            .pause(750)
            .delete()
            .exec(() => {
                setTimeout(() => dispatch('typingCompleted', { message: 'Typing animation completed' }), 10);
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
    <div class="text-center" bind:this={typeItElement}></div>
</div>
