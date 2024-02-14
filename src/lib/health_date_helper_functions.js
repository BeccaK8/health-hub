const get_formatted_health_date = (aDate) => {
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(aDate)
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(aDate)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(aDate)
    return `${year}-${month}-${day}`
}

const get_health_date_object = (aDateString) => {
    return new Date(aDateString + 'T00:00:00.000')
}

module.exports = {
    get_formatted_health_date,
    get_health_date_object
}