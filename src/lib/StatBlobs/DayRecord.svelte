<script>
    import GradientText from 'svelte-gradient-typography';

    // Assuming 'timeReadByDay' is an array of [dateString, timeReadValue] pairs
    export let timeReadByDay;

    // Find the day with the highest time read
    let maxTimeRead = 0;
    let maxTimeReadDate = '';
    timeReadByDay.forEach(([date, timeRead]) => {
        if (timeRead > maxTimeRead) {
            maxTimeRead = timeRead;
            maxTimeReadDate = date;
        }
    });

    // Convert seconds to the appropriate unit
    let value = maxTimeRead;
    let length = "Seconds"
    if(value > 3600){
        value = Math.round(value / 3600)
        length = "Hours"
    } else if(value > 60){
        value = Math.round(value / 60)
        length = "Minutes"
    }

    // Format the date in day/month/year format
    let formattedDate = '';
    if (maxTimeReadDate) {
        const dateParts = maxTimeReadDate.split('-');
        formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`; // Convert 'YYYY-MM-DD' to 'DD/MM/YYYY'
    }
</script>

<div class="flex flex-col items-center justify-center text-center">
    <div class="flex justify-center items-center mb-2">
        <GradientText size="100px">{value}</GradientText>
    </div>
    <span class="font-bold">{length} Spent Reading on {formattedDate}</span>
    <span class="text-xs">A Record For You!</span>
</div>
