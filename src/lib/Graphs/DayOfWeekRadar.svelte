<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Chart from 'chart.js/auto';
	import { primaryRGB, titleRGB } from '$lib/store.js';

	let radarChartElement;

	export let days;

	// Simulated data object
	const timeReadByWeekday = {
		Monday: days['Monday'],
		Tuesday: days['Tuesday'],
		Wednesday: days['Wednesday'],
		Thursday: days['Thursday'],
		Friday: days['Friday'],
		Saturday: days['Saturday'],
		Sunday: days['Sunday']
	};

	// Create the labels and data arrays from the object
	const labels = Object.keys(timeReadByWeekday).sort((a, b) => {
		return (
			['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(a) -
			['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(b)
		);
	});
	const data = labels.map((day) => timeReadByWeekday[day]);

	// Chart data configuration
	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'Time Read (Seconds)',
				data: data,
				backgroundColor: $primaryRGB + ',0.3)',
				borderColor: $primaryRGB + ',1)',
				borderWidth: 2,
				pointBackgroundColor: $primaryRGB + ', 1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: $primaryRGB + ', 1)'
			}
		]
	};

	onMount(() => {
		if (browser) {
			const myRadarChart = new Chart(radarChartElement, {
				type: 'radar',
				data: chartData,
				options: {
					elements: {
						line: {
							borderWidth: 3
						}
					},
					scales: {
						r: {
							angleLines: {
								display: true,
								color: 'white'
							},
							grid: {
								color: 'white'
							},
							pointLabels: {
								color: 'white'
							},
							ticks: {
								display: false,
								backdropColor: 'transparent',
								color: 'white'
							},
							beginAtZero: true,
							min: 0
						}
					},
					plugins: {
						legend: {
							display: false
						},
						title: {
							display: true,
							text: 'Read Time By Weekday', // The title text
							color: $titleRGB + ',0.8)', // Title color
							font: {
								size: 24 // Title font size
							}
						}
					},
					responsive: true,
					maintainAspectRatio: false
				}
			});
		}
	});
</script>

<main class="main-container">
	<div class="chart-container">
		<div>
		<canvas bind:this={radarChartElement} />
	</div>
	</div>
</main>

<style>
	.chart-container {
		width: 100%; /* Make the chart container full width */
		height: auto; /* Set the height to auto to be determined by the content */
		min-height: 500px; /* Minimum height to ensure the chart is not too small */
	}

	.main-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	canvas {
		display: block; /* Set canvas to block to fill the container */
		width: 100% !important; /* Full width */
		height: auto !important; /* Height auto */
	}
</style>
