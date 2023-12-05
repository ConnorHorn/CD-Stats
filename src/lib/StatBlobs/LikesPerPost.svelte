<script>
    import GradientText from 'svelte-gradient-typography';

    export let value = -1;

    let plural = "Likes";
    if(value === 1) plural = "Like";

</script>

<div class="flex flex-col items-center justify-center">
    <div class="mr-1">
        <GradientText size = "70px">{value}</GradientText>
    </div>
    <span class="font-bold">{plural} Per Post Avg</span>
    <span class="text-xs"></span>
</div>