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
            .type(`Hello <br><span class="text-6xl">${username}</span>`)
            .pause(2300)
            .delete(username.length+7)
            .pause(300)
            .type(`Pretty Cool Username`)
            .pause(750)
            .type('<br><span class="text-sm">jk</span>')
            .pause(350)
            .delete()
            .type(`Make it yourself?`)
            .pause(750)
            .delete()
            .pause(500)
            .type('.')
            .pause(500)
            .type('.')
            .pause(500)
            .type('.')
            .pause(500)
            .delete()
            .type(`I could tell`)
            .pause(750)
            .delete()
            .pause(500)
            .type(`<span class="text-5xl">Real Creative</span>`)
            .pause(750)
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
    <div class="text-center" bind:this={typeItElement}></div>
</div>
