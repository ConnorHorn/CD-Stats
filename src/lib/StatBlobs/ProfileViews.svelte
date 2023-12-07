<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'Views';
	if (value === 1) {
		plural = 'View';
	}
</script>

<div class="flex h-full flex-col items-center justify-center text-center">
	<div class="mb-2 flex items-center justify-center">
		<GradientText size="50px">{value}</GradientText>
	</div>
	<span class="font-bold">Profile {plural}</span>
	<span class="text-xs">since 2019</span>
</div>
