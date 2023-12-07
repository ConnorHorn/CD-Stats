<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = 'Never';
</script>

<div class="flex h-full flex-col items-center justify-center text-center">
	<div class="mb-2 flex items-center justify-center">
		<GradientText size="40px">{value}</GradientText>
	</div>
	<span class="font-bold">Your First Post!</span>
	<span class="text-xs" />
</div>
