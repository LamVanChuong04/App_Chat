function fullDateFormat(argument) {
	const date = new Date(argument);
	const options = { weekday: 'long', year: 'numeric', month: 'long' };

	function getDayWithSuffix(date) {
		const day = date.getDate();
		if (day > 3 && day < 21) return day + 'th'; // Ngày từ 4 đến 20 đều có hậu tố 'th'
		switch (day % 10) {
			case 1:
				return day + 'st';
			case 2:
				return day + 'nd';
			case 3:
				return day + 'rd';
			default:
				return day + 'th';
		}
	}

	const dayWithSuffix = getDayWithSuffix(date);

	const formattedDate = date.toLocaleDateString('en-US', options);
	const [month, year, weekday] = formattedDate.split(' ');

	const result = `${weekday}, ${dayWithSuffix} ${month} ${year}`;
	return result;
}

function longDateFormat(argument) {
	const date = new Date(argument);
	const options = { day: 'numeric', year: 'numeric', month: 'long' };
	return date.toLocaleDateString('vi-VN', options);
}

function shortDateFormat(argument) {
	const date = new Date(argument);
	return date.toLocaleDateString('vi-VN');
}

export { shortDateFormat, longDateFormat, fullDateFormat };