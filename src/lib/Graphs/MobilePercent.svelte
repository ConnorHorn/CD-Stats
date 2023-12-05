<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import Chart from 'chart.js/auto';
    import {secondaryRGB, primaryRGB, titleRGB} from "$lib/store.js";

    let pieChartElement;

    export let visitsData;


    const mobilePercent = visitsData.visitedPhonePercent/100; // Your input integer
    const totalVisits = visitsData.visitedCount;

    const chartData = {
        labels: ["Visited on Mobile", "Didn't Visit on Mobile"],
        datasets: [{
            data: [Math.round(mobilePercent*totalVisits),Math.round(totalVisits-mobilePercent*totalVisits)],
            backgroundColor: [
                $primaryRGB+',0.7)', // Color for the input value
                $secondaryRGB+',0.7)' // Color for the remaining percentage
            ],
            borderColor: [
                $primaryRGB+',1)',
                $secondaryRGB+',1)'
            ],
            borderWidth: 1
        }]
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
                            display: false,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Days With Mobile Visit',
                            font: {
                                size: 15, // Adjust font size here
                                weight: 'bold', // Make the font bold
                            },
                            color: $titleRGB+',0.7)'

                        }
                    }
                }
            });
        }
    });
</script>

<main class="main-container">
    <section>
        <canvas bind:this={pieChartElement}></canvas>
    </section>

</main>
