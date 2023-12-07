<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'Posts';
	if (value === 1) plural = 'Post';
</script>

<div class="flex h-full flex-col items-center justify-center">
	<div class="mr-1">
		<GradientText size="70px">{value}</GradientText>
	</div>
	<span class="font-bold">{plural} In Queue</span>
	<span class="text-xs" />
</div>
