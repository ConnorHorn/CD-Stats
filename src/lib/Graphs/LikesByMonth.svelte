<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import Chart from 'chart.js/auto';
    import { secondaryRGB, titleRGB } from "$lib/store.js";

    let barChartElement;

    export let array;

    // Convert data from seconds to minutes and process your array data
    const labels = array.map(item => item[0]);
    const dataValues = array.map(item => item[1]); // Extracting the numeric values

    // Function to determine the rounding based on the data magnitude
    function dynamicRounding(num) {
        if (num < 100) return Math.round(num); // No rounding for small numbers
        const digits = Math.pow(10, Math.floor(Math.log10(num)) - 1);
        return Math.round(num / digits) * digits;
    }

    // Calculate min and max for scaling
    const maxValue = Math.max(...dataValues); // Using dataValues for max calculation
    const scaledMin = 0;
    const scaledMax = dynamicRounding(maxValue * 1.1);

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Likes',
            data: dataValues, // Using dataValues here
            backgroundColor: $secondaryRGB + ',0.7)',
            borderColor: $secondaryRGB + ',1)',
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                min: scaledMin,
                max: scaledMax,
                ticks: {
                    callback: function(value, index, ticks) {
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
                text: 'Likes Received Each Month',
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

<main class="main-container">
    <section>
        <canvas bind:this={barChartElement}></canvas>
    </section>
</main>
