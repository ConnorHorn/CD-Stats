// Function to calculate statistics for badges
function calcBadges(data) {
	// Extracting headers and rows
	const headers = data[0];
	const rows = data.slice(1);

	// Finding the index of required columns
	const badgeNameIndex = headers.indexOf('badge_name');
	const featuredRankIndex = headers.indexOf('featured_rank');

	// Creating a map to store badge count and featured rank
	let badgeMap = new Map();

	// Iterating through each row
	rows.forEach((row) => {
		const badgeName = row[badgeNameIndex];
		const featuredRank = parseInt(row[featuredRankIndex], 10);

		// Skip the row if badgeName is not defined
		if (badgeName && !badgeMap.has(badgeName)) {
			badgeMap.set(badgeName, { count: 1, featuredRank: featuredRank });
		} else if (badgeName) {
			badgeMap.get(badgeName).count++;
		}
	});

	// Converting map to an array of objects
	let resultArray = Array.from(badgeMap, ([badgeName, { count, featuredRank }]) => ({
		badgeName,
		count,
		featuredRank
	}));

	// Sorting the array by count and then by featuredRank
	resultArray.sort((a, b) => {
		if (a.count === b.count) {
			return a.featuredRank - b.featuredRank;
		}
		return b.count - a.count;
	});

	// Creating a 2D array with just badgeName and count
	return resultArray.map((item) => [item.badgeName, item.count]);
}

// Function to count the number of bookmarks
function calcBookmarks(data) {
	// The count is the number of rows minus the header row
	return data.length - 2;
}

// Function to count flags by month and year, and to create a leaderboard of flag types
function calcFlags(data) {
	// Extracting headers and rows
	const headers = data[0];
	const rows = data.slice(1);

	// Finding the index of the 'created_at' and 'flag_type' columns
	const createdAtIndex = headers.indexOf('created_at');
	const flagTypeIndex = headers.indexOf('flag_type');

	// Helper functions to format dates
	const parseDate = (dateString) => new Date(dateString.split(' ')[0]);
	const toMonthYearString = (date) => `${date.getMonth() + 1}/${date.getFullYear()}`;
	const toYearString = (date) => `${date.getFullYear()}`;

	// Variables to track the first flag date and total count of flags
	let firstFlagDate = null;
	let totalCount = 0;

	// Initialize maps for counts
	let monthlyCountMap = new Map();
	let yearlyCountMap = new Map();
	let flagLeaderboardMap = new Map();

	// Process each row and populate counts
	rows.forEach((row) => {
		const createdAtString = row[createdAtIndex];
		const flagType = row[flagTypeIndex];
		if (createdAtString) {
			const createdAt = parseDate(createdAtString);
			const monthYearKey = toMonthYearString(createdAt);
			const yearKey = toYearString(createdAt);

			// Update first flag date if necessary
			if (!firstFlagDate || createdAt < firstFlagDate) {
				firstFlagDate = createdAt;
			}

			// Increment counts
			totalCount++;
			monthlyCountMap.set(monthYearKey, (monthlyCountMap.get(monthYearKey) || 0) + 1);
			yearlyCountMap.set(yearKey, (yearlyCountMap.get(yearKey) || 0) + 1);
		}

		if (flagType) {
			flagLeaderboardMap.set(flagType, (flagLeaderboardMap.get(flagType) || 0) + 1);
		}
	});

	// Helper function to fill in missing months/years
	const fillMissingDates = (countMap, dateKeyFormatter, start, end, isYearly = false) => {
		const result = [];
		let currentDate = new Date(start);
		while (currentDate <= end) {
			const key = dateKeyFormatter(currentDate);
			result.push([key, countMap.get(key) || 0]);
			if (isYearly) {
				currentDate.setFullYear(currentDate.getFullYear() + 1);
			} else {
				currentDate.setMonth(currentDate.getMonth() + 1);
			}
		}
		return result;
	};

	// Sort and fill in missing dates for monthly and yearly counts
	const sortedMonths = fillMissingDates(
		monthlyCountMap,
		toMonthYearString,
		new Date(firstFlagDate),
		new Date()
	);
	const sortedYears = fillMissingDates(
		yearlyCountMap,
		toYearString,
		new Date(firstFlagDate),
		new Date(),
		true
	);

	// Convert the maps to arrays
	let flagLeaderboardArray = Array.from(flagLeaderboardMap, ([key, value]) => [key, value]);
	flagLeaderboardArray.sort((a, b) => b[1] - a[1]); // Sort the flag leaderboard by count

	// Format the first flag date as "mm/dd/yyyy"

	const formatDate = (date) => {
		if (!date || isNaN(date.getTime())) {
			return null;
		}

		// Options for formatting the date
		const options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		};

		// Format the date according to the user's local settings
		return new Intl.DateTimeFormat(undefined, options).format(date);
	};

	const firstFlagDateString = firstFlagDate ? formatDate(firstFlagDate) : '';

	return {
		monthlyCountArray: sortedMonths,
		yearlyCountArray: sortedYears,
		flagLeaderboardArray,
		firstFlagDate: firstFlagDateString,
		totalCount: totalCount
	};
}

function calcLikes(data) {
	const headers = data[0];
	const rows = data.slice(1);

	const createdAtIndex = headers.indexOf('created_at');
	const deletedByIndex = headers.indexOf('deleted_by');

	let undidLikeCount = 0;
	let likedDeletedPostCount = 0;
	let totalLikes = 0;

	let monthlyCountMap = new Map();
	let yearlyCountMap = new Map();
	let hourlyCountMap = new Map();

	// Initialize hourly count map
	for (let i = 1; i <= 12; i++) {
		hourlyCountMap.set(`${i} AM`, 0);
		hourlyCountMap.set(`${i} PM`, 0);
	}

	function convertToISO8601(dateStr) {
		return dateStr.replace(' UTC', '').replace(' ', 'T') + 'Z';
	}

	rows.forEach((row) => {
		const createdAt = row[createdAtIndex];
		const deletedBy = row[deletedByIndex];

		if (deletedBy === 'self') undidLikeCount++;
		if (deletedBy === 'other') likedDeletedPostCount++;

		if (createdAt) {
			totalLikes++;

			const convertedDate = convertToISO8601(createdAt);
			const date = new Date(convertedDate);

			const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
			const year = `${date.getFullYear()}`;
			const hour = date.getHours();
			const hourKey = `${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? 'AM' : 'PM'}`;

			monthlyCountMap.set(monthYear, (monthlyCountMap.get(monthYear) || 0) + 1);
			yearlyCountMap.set(year, (yearlyCountMap.get(year) || 0) + 1);
			hourlyCountMap.set(hourKey, (hourlyCountMap.get(hourKey) || 0) + 1);
		}
	});

	const fillMissingDates = (countMap, startYear, endYear, isYearly = false) => {
		const result = [];
		for (let year = startYear; year <= endYear; year++) {
			if (isYearly) {
				result.push([`${year}`, countMap.get(`${year}`) || 0]);
			} else {
				for (let month = 1; month <= 12; month++) {
					const key = `${month}/${year}`;
					result.push([key, countMap.get(key) || 0]);
				}
			}
		}
		return result;
	};

	const startYear =
		rows.length > 0
			? new Date(convertToISO8601(rows[0][createdAtIndex])).getFullYear()
			: new Date().getFullYear();
	const endYear = new Date().getFullYear();

	const monthlyCounts = fillMissingDates(monthlyCountMap, startYear, endYear);
	const yearlyCounts = fillMissingDates(yearlyCountMap, startYear, endYear, true);
	const hourlyCounts = Array.from(hourlyCountMap, ([key, value]) => [key, value]);

	return {
		undidLikeCount,
		likedDeletedPostCount,
		totalLikes,
		monthlyCounts,
		yearlyCounts,
		hourlyCounts
	};
}

function calcArchive(data) {
	const headers = data[0];
	const rows = data.slice(1).filter((row) => row[headers.indexOf('created_at')]);

	// Helper functions
	const parseDate = (dateString) => {
		const date = new Date(dateString);
		return isNaN(date.getTime()) ? null : date;
	};

	const formatDateKey = (date, forMonth = true) => {
		if (forMonth) {
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		}
		return String(date.getFullYear());
	};

	// New helper function to generate all months between two dates
	const generateAllMonths = (startDate, endDate) => {
		let start = new Date(startDate);
		let end = new Date(endDate);
		let months = [];

		for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
			months.push(formatDateKey(new Date(d)));
		}

		return months;
	};

	// New helper function to generate all years between two dates
	const generateAllYears = (startDate, endDate) => {
		let startYear = new Date(startDate).getFullYear();
		let endYear = new Date(endDate).getFullYear();
		let years = [];

		for (let year = startYear; year <= endYear; year++) {
			years.push(String(year));
		}

		return years;
	};

	// Find the min and max dates to determine the range
	const dateStrings = rows.map((row) => row[headers.indexOf('created_at')]);
	const minDate = new Date(Math.min(...dateStrings.map((dateString) => new Date(dateString))));
	const maxDate = new Date(Math.max(...dateStrings.map((dateString) => new Date(dateString))));

	// Generate all months and years in the range
	const allMonths = generateAllMonths(minDate, maxDate);
	const allYears = generateAllYears(minDate, maxDate);

	// Initialize statistics maps with all months and years set to zero
	let postsByMonthMap = new Map(allMonths.map((month) => [month, 0]));
	let postsByYearMap = new Map(allYears.map((year) => [year, 0]));
	let pmsByMonthMap = new Map(allMonths.map((month) => [month, 0]));

	// Generate all months and years for likes (from January 2019 onwards)
	const allLikesMonths = generateAllMonths(new Date('2019-01-01'), maxDate);
	const allLikesYears = generateAllYears(new Date('2019-01-01'), maxDate);

	// Initialize likes maps with months and years from January 2019 onwards set to zero
	let likesByMonthMap = new Map(allLikesMonths.map((month) => [month, 0]));
	let likesByYearMap = new Map(allLikesYears.map((year) => [year, 0]));

	// Other initializations
	let topTopicsMap = new Map();
	let topCategoriesMap = new Map();
	let postCount = 0;
	let pmCount = 0;
	let likeCount = 0;

	// Process each row for counts
	rows.forEach((row) => {
		const createdAtIndex = headers.indexOf('created_at');
		const isPm = row[headers.indexOf('is_pm')] === 'Yes';
		const title = row[headers.indexOf('topic_title')];
		const url = row[headers.indexOf('url')];
		const category = row[headers.indexOf('categories')];
		const likeCountValue = parseInt(row[headers.indexOf('like_count')], 10) || 0;
		const date = parseDate(row[createdAtIndex]);

		if (!date) return; // Skip if date is not valid

		// Create keys for month and year
		const monthKey = formatDateKey(date);
		const yearKey = formatDateKey(date, false);

		// Collecting stats based on the type of post
		if (!isPm) {
			postCount++;
			postsByMonthMap.set(monthKey, (postsByMonthMap.get(monthKey) || 0) + 1);
			postsByYearMap.set(yearKey, (postsByYearMap.get(yearKey) || 0) + 1);

			// Update top topics
			if (title && !topTopicsMap.has(title)) {
				topTopicsMap.set(title, { count: 1, url });
			} else if (title) {
				topTopicsMap.get(title).count++;
			}
		} else {
			pmCount++;
			pmsByMonthMap.set(monthKey, (pmsByMonthMap.get(monthKey) || 0) + 1);
		}

		if (date >= new Date('2019-01-01')) {
			likeCount += likeCountValue;
			likesByMonthMap.set(monthKey, (likesByMonthMap.get(monthKey) || 0) + likeCountValue);
			likesByYearMap.set(yearKey, (likesByYearMap.get(yearKey) || 0) + likeCountValue);
		}

		// Update top categories
		if (category && category.length >= 3) {
			topCategoriesMap.set(category, (topCategoriesMap.get(category) || 0) + 1);
		}
	});

	const nonPmRows = rows.filter((row) => row[headers.indexOf('is_pm')] !== 'Yes');

	// Find the min date from non-private message posts
	const nonPmDateStrings = nonPmRows.map((row) => row[headers.indexOf('created_at')]);
	const minNonPmDate =
		nonPmDateStrings.length > 0
			? new Date(Math.min(...nonPmDateStrings.map((dateString) => new Date(dateString))))
			: null;

	const formatDate = (date) => {
		if (!date || isNaN(date.getTime())) {
			return null;
		}

		// Options for formatting the date
		const options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		};

		// Format the date according to the user's local settings
		return new Intl.DateTimeFormat(undefined, options).format(date);
	};

	const reformatDateKeys = (map, forMonth = true) => {
		const newMap = new Map();
		for (const [key, value] of map) {
			let formattedKey = key;
			if (forMonth) {
				const [year, month] = key.split('-');
				formattedKey = `${parseInt(month, 10)}/${year}`; // Formats as '1/2019', '2/2019', etc.
			} // For years, the key remains the same (YYYY)
			newMap.set(formattedKey, value);
		}
		return newMap;
	};

	postsByMonthMap = reformatDateKeys(postsByMonthMap, true);
	pmsByMonthMap = reformatDateKeys(pmsByMonthMap, true);
	postsByYearMap = reformatDateKeys(postsByYearMap, false);
	likesByMonthMap = reformatDateKeys(likesByMonthMap, true);

	// Convert maps to arrays for output (no need to sort as they are already in order)
	let postsByMonth = Array.from(postsByMonthMap);
	let postsByYear = Array.from(postsByYearMap);
	let pmsByMonth = Array.from(pmsByMonthMap);
	let likesByMonth = Array.from(likesByMonthMap).sort((a, b) => {
		// Split the keys into [year, month] and compare
		let [yearA, monthA] = a[0].split('-').map(Number);
		let [yearB, monthB] = b[0].split('-').map(Number);

		// Compare by year, then by month
		return yearA - yearB || monthA - monthB;
	});
	let likesByYear = Array.from(likesByYearMap);

	// Filter out pre-2019 data from likesByMonth and likesByYear
	// eslint-disable-next-line no-unused-vars
	likesByMonth = likesByMonth.filter(([key, _]) => key >= '2019-01');
	// eslint-disable-next-line no-unused-vars
	likesByYear = likesByYear.filter(([key, _]) => key >= '2019');
	// Sort and take top 10 for topics and categories
	let topTopics = Array.from(topTopicsMap)
		.sort((a, b) => b[1].count - a[1].count)
		.slice(0, 10)
		.map(([title, data]) => [title, data.url, data.count]);

	let topCategories = Array.from(topCategoriesMap)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 10)
		.map(([category, count]) => [category, count]);

	return {
		firstPost: minNonPmDate ? formatDate(minNonPmDate).toString() : '',
		topTopics,
		postsByMonth,
		postsByYear,
		pmsByMonth,
		likesByMonth,
		likesByYear,
		topCategories,
		postCount,
		pmCount,
		likeCount
	};
}

function calcVisits(data) {
	const headers = data[0];
	const rows = data.slice(1);

	const visitedAtIndex = headers.indexOf('visited_at');
	const postsReadIndex = headers.indexOf('posts_read');
	const mobileIndex = headers.indexOf('mobile');
	const timeReadIndex = headers.indexOf('time_read');

	let visitedPhoneCount = 0;
	let visitedCount = 0;
	let timeRead = 0;
	let numPostsRead = 0;

	let timeReadByDay = {};
	let timeReadByMonth = new Map();
	let timeReadByYear = new Map();

	let timeReadByWeekday = {
		Sunday: 0,
		Monday: 0,
		Tuesday: 0,
		Wednesday: 0,
		Thursday: 0,
		Friday: 0,
		Saturday: 0
	};

	rows.forEach((row) => {
		const visitedAt = row[visitedAtIndex];
		const postsRead = parseInt(row[postsReadIndex], 10) || 0; // Default to 0 if NaN
		const isMobile = row[mobileIndex] === 'true';
		const timeReadValue = parseInt(row[timeReadIndex], 10) || 0; // Default to 0 if NaN

		if (!isNaN(postsRead)) {
			numPostsRead += postsRead;
		}

		if (!isNaN(timeReadValue)) {
			timeRead += timeReadValue;
		}

		if (postsRead + timeReadValue > 0) {
			visitedCount++;
		}

		if (isMobile) {
			visitedPhoneCount++;
		}

		// Day-wise stats
		const date = new Date(visitedAt);
		if (!isNaN(date.getTime())) {
			const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
			timeReadByWeekday[dayOfWeek] = (timeReadByWeekday[dayOfWeek] || 0) + timeReadValue;
			const dateString = date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
			if (!timeReadByDay[dateString]) {
				timeReadByDay[dateString] = 0;
			}
			timeReadByDay[dateString] += timeReadValue;
		}

		// Month and Year-wise stats
		if (!isNaN(date.getTime())) {
			const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
			const year = `${date.getFullYear()}`;

			timeReadByMonth.set(monthYear, (timeReadByMonth.get(monthYear) || 0) + timeReadValue);
			timeReadByYear.set(year, (timeReadByYear.get(year) || 0) + timeReadValue);
		}
	});

	const visitedPhonePercent = (visitedPhoneCount / rows.length) * 100;
	const avgTimePerPost = numPostsRead > 0 ? timeRead / numPostsRead : 0; // Avoid division by zero
	const visitedPercent = (visitedCount / rows.length) * 100;

	const timeReadByDayArray = Object.entries(timeReadByDay);
	const timeReadByMonthArray = Array.from(timeReadByMonth, ([key, value]) => [key, value]);
	const timeReadByYearArray = Array.from(timeReadByYear, ([key, value]) => [key, value]);

	return {
		timeReadByWeekday,
		visitedPhonePercent,
		visitedCount,
		visitedPercent,
		timeRead,
		numPostsRead,
		timeReadByDay: timeReadByDayArray,
		timeReadByMonth: timeReadByMonthArray,
		timeReadByYear: timeReadByYearArray,
		avgTimePerPost
	};
}

function calcQueue(data) {
	// The count is the number of rows minus the header row
	return data.length - 2;
}

export { calcQueue };

export { calcVisits };

export { calcArchive };

export { calcLikes };

export { calcFlags };

export { calcBookmarks };

export { calcBadges };
