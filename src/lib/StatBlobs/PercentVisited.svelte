<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;
	value = Math.round(value * 10) / 10;
</script>

<div class="flex h-full flex-col items-center justify-center text-center">
	<div class="mb-2 flex items-center justify-center">
		<GradientText size="60px">{value}%</GradientText>
	</div>
	<span class="font-bold">of Days Visited</span>
	<span class="text-xs">since 2019 (or when your account was made)</span>
</div>
