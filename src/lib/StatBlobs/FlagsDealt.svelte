<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'Flags';
	if (value === 1) plural = 'Flag';
</script>

<div class="flex flex-col items-center justify-center">
	<div class="mr-1">
		<GradientText size="70px">{value}</GradientText>
	</div>
	<span class="font-bold">{plural} Dealt</span>
	<span class="text-xs">since 2019</span>
</div>
