<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;
	let length = 'Seconds';
	if (value > 86400) {
		value = Math.round(value / 86400);
		length = 'Days';
	} else if (value > 3600) {
		value = Math.round(value / 3600);
		length = 'Hours';
	} else if (value > 60) {
		value = Math.round(value / 60);
		length = 'Minutes';
	}
</script>

<div class="flex h-full flex-col items-center justify-center text-center">
	<div class="mb-2 flex items-center justify-center">
		<GradientText size="100px">{value}</GradientText>
	</div>
	<span class="font-bold">{length} Spent Reading</span>
	<span class="text-xs">since 2019</span>
</div>
