<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	value = Math.round(value);

	if (value > 10000) {
		value = Math.round(value / 1000) + 'k';
	}

	let plural = 'Posts';
	if (value === 1) {
		plural = 'Post';
	}
</script>

<div class="flex h-full flex-col items-center justify-center">
	<div class="mr-1">
		<GradientText size="70px">{value}</GradientText>
	</div>
	<span class="font-bold">{plural} Posted</span>
	<span class="text-xs" />
</div>
