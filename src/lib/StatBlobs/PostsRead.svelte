<script>
    import GradientText from 'svelte-gradient-typography';

    export let value = -1;

    value = Math.round(value)

    if(value>=10000){
        value = Math.round(value/1000) + "k"
    }

</script>

<div class="flex flex-col items-center justify-center">
    <div class="mr-1">
        <GradientText size = "70px">{value}</GradientText>
    </div>
    <span class="font-bold">Posts Read</span>
    <span class="text-xs">since 2019</span>
</div>