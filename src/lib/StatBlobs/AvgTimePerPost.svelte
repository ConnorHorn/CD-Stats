<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;
	value = Math.round(value);
</script>

<div class="flex h-full flex-col items-center justify-center text-center">
	<div class="mb-2 flex items-center justify-center">
		<GradientText size="100px">{value}</GradientText>
	</div>
	<span class="font-bold">Seconds Spent Per Post Read</span>
	<span class="text-xs">since 2019</span>
</div>
