<script>
    import GradientText from 'svelte-gradient-typography';

    export let value = -1;

    let plural = "Like"
    if (value > 1) {
        plural = "Likes"
    }

</script>

<div class="flex flex-col items-center justify-center text-center">
    <div class="flex justify-center items-center mb-2">
        <GradientText size="60px">{value}</GradientText>
    </div>
    <span class="font-bold">{plural} Received</span>
    <span class="text-xs">Posts & PMs</span>
</div>
