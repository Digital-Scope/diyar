const removeMarkdown = require('remove-markdown');
const moment = require('moment');

exports.createExcerpt = (body, len) => `${removeMarkdown(body).substring(0, len)}...`;

exports.filterItemByDate = (itemPublishDate, dateFilterValue) => {
    if (!dateFilterValue.value) {
        return true;
    }

    const todayDate = moment();
    const itemDate = moment(itemPublishDate);

    if (dateFilterValue.value.toLowerCase() === "this month") {
        return todayDate.year() === itemDate.year() && todayDate.month() === itemDate.month();
    }
    else if (dateFilterValue.value.toLowerCase() === "last month") {
        const minDateForLastLastMonth = todayDate.clone().subtract(1, 'month').date(1);
        const maxDateForLastMonth = todayDate.clone().subtract(1, 'month').endOf('month');
        return itemDate >= minDateForLastLastMonth && itemDate <= maxDateForLastMonth;
    }
    else if (dateFilterValue.value.toLowerCase() === "last 3 months") {
        const minDateForLastThreeMonths = todayDate.clone().subtract(3, 'month').date(1);
        const maxDateForLastThreeMonths = todayDate.clone().subtract(1, 'month').endOf('month');
        return itemDate >= minDateForLastThreeMonths && itemDate <= maxDateForLastThreeMonths;;
    }
    else if (dateFilterValue.value.toLowerCase() === "this year") {
        return todayDate.year() === itemDate.year();
    }
    else if (dateFilterValue.value.toLowerCase() === "last year") {
        return todayDate.year() === itemDate.year() + 1;
    }
    else if (dateFilterValue.value.toLowerCase() === "all") {
        return true;
    }
    return false;
}

exports.isArabicURL = url => {
    return url.startsWith('/ar/') || url.endsWith('/ar');
}