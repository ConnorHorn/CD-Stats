<script>
    // Assuming your array is named `topTopics` and is imported or defined in your script
    export let array;
    // Function to handle click event and navigate to the URL
    const goToLink = (url) => {
        window.location.href = url;
    };
</script>

<div class="overflow-x-auto relative bg-transparent">
    <table class="table-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-800 uppercase bg-transparent dark:bg-transparent dark:text-gray-400">
        <tr>
            <th scope="col" class="py-3 px-6 text-gray-300 text-lg font-bold">
                Favorite Topics
            </th>
            <th scope="col" class="py-3 px-6 w-20 text-gray-300 text-md"> <!-- Adjust the width as needed -->
                # of Posts
            </th>
        </tr>
        </thead>
        <tbody>
        {#each array.slice(0, 5) as topic, i (topic)}
            <tr class="bg-transparent dark:bg-transparent">
                <td class="py-4 px-6 cursor-pointer whitespace-nowrap" on:click={() => goToLink(topic[1])}>
                    {topic[0]}
                </td>
                <td class="py-4 px-6 whitespace-nowrap text-center">
                    {topic[2]}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>