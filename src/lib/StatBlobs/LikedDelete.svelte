<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'Likes';
	if (value === 1) plural = 'Like';
</script>

<div class="flex flex-col items-center justify-center text-center">
	<div class="flex justify-center items-center mr-1">
		<GradientText size="70px">{value}</GradientText>
	</div>
	<span class="font-bold">{plural} Given to Deleted Posts</span>
	<span class="text-xs" />
</div>
