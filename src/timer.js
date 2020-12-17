export default function timer(createdTrack = Date.now(), pause = 0) {
    const created = createdTrack;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    seconds = Math.round(((Date.now() - created - pause) / 1000));
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        if (minutes >= 60) {
            hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
        }
    }
    return `${hours}:${minutes}:${seconds}`;
}
