<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'Views';
	if (value === 1) {
		plural = 'View';
	}
</script>

<div class="flex flex-col items-center justify-center text-center">
	<div class="flex justify-center items-center mb-2">
		<GradientText size="50px">{value}</GradientText>
	</div>
	<span class="font-bold">Profile {plural}</span>
	<span class="text-xs">since 2019</span>
</div>
