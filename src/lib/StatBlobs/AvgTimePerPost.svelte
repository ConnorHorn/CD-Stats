<script>
    import GradientText from 'svelte-gradient-typography';

    export let value = -1;
    value = Math.round(value);
</script>

<div class="flex flex-col items-center justify-center text-center">
    <div class="flex justify-center items-center mb-2">
        <GradientText size="100px">{value}</GradientText>
    </div>
    <span class="font-bold">Seconds Spent Per Post Read</span>
    <span class="text-xs">since 2019</span>
</div>
