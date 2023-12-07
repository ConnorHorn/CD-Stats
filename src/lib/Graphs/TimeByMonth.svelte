<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Chart from 'chart.js/auto';
	import { primaryRGB, titleRGB } from '$lib/store.js';

	let barChartElement;

	export let array;

	// Convert data from seconds to minutes and process your array data
	const labels = array.map((item) => item[0]);
	const dataValues = array.map((item) => item[1] / 60); // Convert seconds to minutes

	// Function to determine the rounding based on the data magnitude
	function dynamicRounding(num) {
		if (num < 1000) return Math.round(num); // No rounding for small numbers
		const digits = Math.pow(10, Math.floor(Math.log10(num)) - 1);
		return Math.round(num / digits) * digits;
	}

	// Calculate min and max for scaling
	// const minValue = Math.min(...dataValues);
	const maxValue = Math.max(...dataValues);
	// const scaledMin = dynamicRounding(minValue * 0.5);
	const scaledMin = 0;
	const scaledMax = dynamicRounding(maxValue * 1.1);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'Minutes',
				data: dataValues,
				backgroundColor: $primaryRGB + ',0.7)',
				borderColor: $primaryRGB + ',1)',
				borderWidth: 1
			}
		]
	};

	const chartOptions = {
		responsive: true,
		scales: {
			y: {
				min: scaledMin,
				max: scaledMax,
				// Automatically adjust tick intervals
				ticks: {
					callback: function (value, index, ticks) {
						return dynamicRounding(value);
					}
				}
			}
		},
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Minutes Spent Reading Each Month',
				font: {
					size: 15,
					weight: 'bold'
				},
				color: $titleRGB + ',0.7)'
			}
		}
	};

	onMount(() => {
		if (browser) {
			new Chart(barChartElement, {
				type: 'bar',
				data: chartData,
				options: chartOptions
			});
		}
	});
</script>

<div class="flex h-full items-center justify-center">
	<canvas bind:this={barChartElement} />
</div>
