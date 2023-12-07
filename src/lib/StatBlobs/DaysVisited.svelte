<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;
</script>

<div class="flex h-full flex-col items-center justify-center text-center">
	<div class="mb-2 flex items-center justify-center">
		<GradientText size="70px">{value}</GradientText>
	</div>
	<span class="font-bold">Days Visited</span>
	<span class="text-xs">since 2019</span>
</div>
