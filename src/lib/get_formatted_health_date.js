module.exports = (aDate) => {
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(aDate)
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(aDate)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(aDate)
    return `${year}-${month}-${day}`
}
