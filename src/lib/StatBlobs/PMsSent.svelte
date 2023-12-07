<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'PMs';
	if (value === 1) plural = 'PM';
</script>

<div class="flex h-full flex-col items-center justify-center">
	<div class="mr-1">
		<GradientText size="70px">{value}</GradientText>
	</div>
	<span class="font-bold">{plural} Sent</span>
	<span class="text-xs">since 2019</span>
</div>
