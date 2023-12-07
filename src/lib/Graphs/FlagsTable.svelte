<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Chart from 'chart.js/auto';
	import { titleRGB } from '$lib/store.js';

	let pieChartElement;

	export let array;

	// Assuming flagLeaderboardArray is imported or defined somewhere above

	// Prepare your chart data
	const labels = array.map((item) => item[0]);
	const data = array.map((item) => item[1]);

	// You might want to define a color for each flag reason
	const backgroundColors = labels.map((_, index) => {
		// Creates a range from light blue to darker blue
		const blueValue = 255 - ((index * 30) % 255);
		return `rgba(0, ${blueValue}, 255, 0.7)`;
	});

	const borderColors = labels.map((_, index) => {
		// Slightly darker border color for each slice
		const blueValue = 255 - ((index * 30) % 255);
		return `rgba(0, ${blueValue}, 255, 1)`;
	});

	const chartData = {
		labels: labels,
		datasets: [
			{
				data: data,
				backgroundColor: backgroundColors,
				borderColor: borderColors,
				borderWidth: 1
			}
		]
	};

	onMount(() => {
		if (browser) {
			new Chart(pieChartElement, {
				type: 'pie',
				data: chartData,
				options: {
					responsive: true,
					plugins: {
						legend: {
							display: true, // Changed to true to display legend
							position: 'top',
							labels: {
								color: $titleRGB + ',0.4)'
							}
						},
						title: {
							display: true,
							text: 'Dealt Flag Reasons',
							font: {
								size: 15,
								weight: 'bold'
							},
							color: $titleRGB + ',0.7)'
						}
					}
				}
			});
		}
	});
</script>

<main class="main-container">
	<section>
		<canvas bind:this={pieChartElement} />
	</section>
</main>
