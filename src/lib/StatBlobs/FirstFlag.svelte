<script>
    import GradientText from 'svelte-gradient-typography';

    export let value = "Never";


</script>

<div class="flex flex-col items-center justify-center text-center">
    <div class="flex justify-center items-center mb-2">
        <GradientText size="40px">{value}</GradientText>
    </div>
    <span class="font-bold">Your First Flag!</span>
    <span class="text-xs">since 2019</span>
</div>
