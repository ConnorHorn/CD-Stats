<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment'; // Updated import statement
    import Chart from 'chart.js/auto';

    let barChartElement;

    // Define your chart data here
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
        }]
    };

    onMount(() => {
        if (browser) {
            new Chart(barChartElement, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    });
</script>

<main class="main-container">
    <section>
        <canvas bind:this={barChartElement} />
    </section>
</main>
