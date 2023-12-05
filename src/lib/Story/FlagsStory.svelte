<script>
    import { onMount, onDestroy } from 'svelte';
    import TypeIt from 'typeit';
    import { createEventDispatcher } from 'svelte';

    export let flagsData;

    let typeItInstance;
    let typeItElement;
    const dispatch = createEventDispatcher();

    let specialComment = 'Not much of a flagger are we?<br>I guess in some ways that could be good';
    if(flagsData.totalCount > 15){
        specialComment = 'You like to flag on occasion I guess, but not too much.<br>Maybe we can work with that';
    }
    if(flagsData.totalCount > 75){
        specialComment = 'You have flagged a good few posts in your time.<br> I like that';
    }
    if(flagsData.totalCount > 150){
        specialComment = "That's a lot of flagged posts.<br> Probably fine.";
    }
    if(flagsData.totalCount > 250){
        specialComment = "Perhaps we can chill with the flagging a bit?<br> Perhaps look inward?";
    }
    if(flagsData.totalCount > 500){
        specialComment = "Am I reading this flagging stat correctly?<br> I'll assume that's a typo";
    }

    onMount(() => {

        if(flagsData.totalCount > 0){
            typeItInstance = new TypeIt(typeItElement, {
                speed: 50,
                waitUntilVisible: true,
                lifeLike: true,
                html: true
            })
                .type(specialComment)
                .pause(2300)
                .delete(specialComment.length+1)
                .pause(400)
                .type('You have flagged '+flagsData.totalCount+' posts since 2019. Impressive.')
                .pause(2000)
                .delete()
                .type('Your first flag was on '+flagsData.firstFlagDate+'!')
                .pause(1500)
                .delete()
                .exec(() => {
                    setTimeout(() => dispatch('typingCompleted', {message: 'completed'}), 0);
                })
                .go();

        }
        else {

            typeItInstance = new TypeIt(typeItElement, {
                speed: 50,
                waitUntilVisible: true,
                lifeLike: true,
                html: true
            })
                .type(`You have never flagged a post`)
                .pause(2000)
                .delete()
                .pause(1500)
                .type(`Interesting...`)
                .pause(600)
                .delete(1)
                .pause(600)
                .delete(1)
                .pause(600)
                .delete(1)
                .pause(600)
                .type('...')
                .pause(750)
                .delete()
                .exec(() => {
                    setTimeout(() => dispatch('typingCompleted', {message: 'completed'}), 10);
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
    <div class="text-center" bind:this={typeItElement}></div>
</div>
