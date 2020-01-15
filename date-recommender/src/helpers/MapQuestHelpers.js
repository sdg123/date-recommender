function getHourAndMinuteDescription(timeInMinutes) { 
    return `${Math.floor(timeInMinutes/60)}h ${timeInMinutes%60}m`;
}

function getMinuteDescription(timeInMinutes) {
    return `${timeInMinutes} m`;
}

export default {
    getTimeDescription(timeInSeconds) {
        var timeInMinutes = Math.round(timeInSeconds / 60);
        return timeInMinutes > 60 ? getHourAndMinuteDescription(timeInMinutes) : getMinuteDescription(timeInMinutes);
    }
};