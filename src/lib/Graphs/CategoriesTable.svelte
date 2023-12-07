<script>
	// Assuming your array is named `topTopics` and is imported or defined in your script
	export let array;
	// Function to handle click event and navigate to the URL
</script>

<div class="relative overflow-x-auto bg-transparent">
	<table class="table-auto text-left text-sm text-gray-500 dark:text-gray-400">
		<thead
			class="bg-transparent text-xs uppercase text-gray-800 dark:bg-transparent dark:text-gray-400"
		>
			<tr>
				<th scope="col" class="px-6 py-3 text-lg font-bold text-gray-300"> Favorite Categories </th>
				<th scope="col" class="text-md w-20 px-6 py-3 text-gray-300">
					<!-- Adjust the width as needed -->
					# of Posts
				</th>
			</tr>
		</thead>
		<tbody>
			{#each array.slice(0, 5) as topic, i (topic)}
				<tr class="bg-transparent dark:bg-transparent">
					<td class="whitespace-nowrap px-6 py-4">
						{topic[0]}
					</td>
					<td class="whitespace-nowrap px-6 py-4 text-center">
						{topic[1]}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
