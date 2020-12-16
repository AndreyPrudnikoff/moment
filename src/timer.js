export function timer() {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            if (minutes === 60) {
                hours++;
            }
        }
        console.log(`${hours}:${minutes}:${seconds}`)
    }, 1000)
}
