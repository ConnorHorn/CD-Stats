<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'Users';
	if (value === 1) {
		plural = 'User';
	}
</script>

<div class="flex h-full flex-col items-center justify-center text-center">
	<div class="mb-2 flex items-center justify-center">
		<GradientText size="85px">{value}</GradientText>
	</div>
	<span class="font-bold">{plural} Muted/Ignored</span>
</div>
