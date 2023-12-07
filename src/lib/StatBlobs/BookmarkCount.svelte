<script>
	import GradientText from 'svelte-gradient-typography';

	export let value = -1;

	let plural = 'Bookmarks';
	if (value === 1) {
		plural = 'Bookmark';
	}
</script>

<div class="flex flex-col items-center justify-center text-center">
	<div class="flex justify-center items-center mb-2">
		<GradientText size="85px">{value}</GradientText>
	</div>
	<span class="font-bold">{plural}</span>
</div>
