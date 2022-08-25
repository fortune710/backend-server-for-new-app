function convertISOToTime(isoString){
    const hour = new Date(isoString).getHours()
    const minute = new Date(isoString).getMinutes()
    const extraZero = hour || minute < 10 ? "0" : ""

    return `${extraZero}${hour}:${extraZero}${minute}:00`
}

module.exports = {
    convertISOToTime: convertISOToTime
}