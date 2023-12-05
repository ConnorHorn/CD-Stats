<script>
    import {Accordion, AccordionItem, FileDropzone} from "@skeletonlabs/skeleton";
	import Papa from 'papaparse';
	import JSZip from 'jszip';
    import Stats from "$lib/Stats.svelte";
    import {calcBadges, calcBookmarks, calcFlags, calcLikes, calcArchive, calcVisits, calcQueue} from "$lib/stats.js";
    import {displayUsername, storyDone} from "$lib/store.js";
    import {extractUserData} from "$lib/prefs.js";
    import Storyteller from "$lib/Story/Storyteller.svelte";
    import GradientText from 'svelte-gradient-typography';
    import { writable } from 'svelte/store';



    let files = [];
    let loaded=false;

    let badgesLeaderboard;
    let bookmarksCount;
    let flagsData;
    let likesData;
    let archiveData;
    let visitsData;
    let numQueue;
    let statsProps;
    let userData;

    let showHelpCard = writable(false);

    function toggleHelpCard() {
        showHelpCard.update(n => !n);
    }
	async function handleFiles() {
		const zipFile = files[0];
		if (!zipFile) return;

        const zipFileName = zipFile.name;

        const parts = zipFileName.split('-');


        if (parts.length >= 5) {
            const usernameParts = parts.slice(1, -3);

            $displayUsername = usernameParts.join('-');
        }

		const zip = await JSZip.loadAsync(zipFile);
		for (const [filename, file] of Object.entries(zip.files)) {
            if(filename==='preferences.json'){
                const prefContent = await file.async("string");

                const jsonData = JSON.parse(prefContent);

                userData = extractUserData(jsonData);
            }

			if (filename.endsWith('.csv')) {
				const csvContent = await file.async('string');
				Papa.parse(csvContent, {
					complete: function(parsedData) {
                        if(filename ==="badges.csv"){
                            badgesLeaderboard = calcBadges(parsedData.data);
                            // console.log("Badges Leaderboard",badgesLeaderboard)
                        }
                        else if(filename ==="bookmarks.csv"){
                            bookmarksCount = calcBookmarks(parsedData.data);
                            // console.log("Bookmarks Count",bookmarksCount)
                        }
                        else if(filename ==="flags.csv"){
                            flagsData = calcFlags(parsedData.data);
                            // console.log("Flags Data",flagsData)
                        }
                        else if(filename ==="likes.csv"){
                            likesData = calcLikes(parsedData.data);
                            // console.log("Likes Data",likesData)
                        }
                        else if(filename ==="user_archive.csv"){
                            archiveData = calcArchive(parsedData.data);
                            // console.log("Archive Data",archiveData)
                        }
                        else if(filename ==="visits.csv"){
                            visitsData = calcVisits(parsedData.data);
                            // console.log("Visits Data",visitsData)
                        }
                        else if(filename ==="queued_posts.csv"){
                            numQueue = calcQueue(parsedData.data);
                            // console.log("# of posts in queue",numQueue)
                        }
                        else {
                            // console.log(`Results for ${filename}:`, parsedData.data);
                        }
					},
					error: function(error) {
						console.error('Error while parsing:', error);
					}
				});
			}
		}
        loaded=true;
        statsProps = {
            badgesLeaderboard,
            bookmarksCount,
            flagsData,
            likesData,
            archiveData,
            visitsData,
            numQueue
        };
	}

</script>



{#if !loaded}
    <div class="absolute inset-x-0 bottom-0 flex justify-center items-end">
        <div class="mb-4">
            Created by
            <a href="https://github.com/ConnorHorn" class="font-bold underline" target="_blank">Connor Horn</a>
        </div>
    </div>


    <div class="flex flex-col justify-between h-screen">
        <div class="flex flex-col items-center justify-center flex-grow">
            <GradientText class="mb-4">
                CD-stats
            </GradientText>

            <div class="w-2/3 lg:w-1/3 h-64 p-6 text-center">
                <FileDropzone bind:files={files} on:change={handleFiles} class="w-full h-full">
                <span slot="message" class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                    Drop Data Export Zip Here
                </span>
                </FileDropzone>
            </div>
        </div>

        <div class="text-white text-base p-4 absolute bottom-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="w-16 h-16 cursor-pointer"
                 id="help"
                 viewBox="0 0 24 24"
                 role="button"
            tabindex="0"
            on:click={toggleHelpCard}
            on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleHelpCard()}
            aria-label="Help Information">

            <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path   fill="#FFFFFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"></path>
            </svg>





        </div>



        {#if $showHelpCard}
            <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                <div class="card p-4 bg-white rounded shadow-lg w-7/8 sm:w-1/3">
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="summary">What is this?</svelte:fragment>
                            <svelte:fragment slot="content">A website that summarizes statistics from a given users account on ChiefDelphi.com. It is for entertainment value only.</svelte:fragment>
                        </AccordionItem>
                        <AccordionItem>
                            <svelte:fragment slot="summary">How do I get the Data?</svelte:fragment>
                            <svelte:fragment slot="content">Go to your Chief Delphi account preferences, and find the "Export Data" section. Click the button to request your data, and wait until you receive a PM with your data. You can then just drag that file straight into the dropbox here.</svelte:fragment>
                        </AccordionItem>
                        <AccordionItem>
                            <svelte:fragment slot="summary">How do I know this is safe?</svelte:fragment>
                            <svelte:fragment slot="content">This is a great question and one that I had to work around quite a bit. The site runs entirely in your browser, with no data leaving your computer. All of the statistics and analytics are calculated locally, meaning nobody else can see them. If you want to be extra cautious, you can unzip the data, and edit the user archive CSV to set all the posts to be empty. You can also edit the preferences json to delete any personal info. The page does not use any content from your posts text, nor your email, or the like. You can validate the claims of privacy by watching the Network tab of Inspect Element and see nothing is being exchanged beyond the initial serving of the webpage.</svelte:fragment>
                        </AccordionItem>
                        <!-- ... -->
                    </Accordion>
                    <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" on:click={toggleHelpCard}>Close</button>
                </div>
            </div>
        {/if}
    </div>




{:else}

    {#if $storyDone}

        <div class="overflow-x-hidden">


<Stats {...statsProps} {...userData} />

        </div>

    {:else}

        <Storyteller {...statsProps} {...userData}/>
    {/if}
    {/if}
