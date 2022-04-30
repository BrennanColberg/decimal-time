const MS_PER_DAY = 1000 * 60 * 60 * 24
const DISPLAY_PRECISION = 100000 // display to centiday precision

function currentDecimalTime() {
  const now = new Date()
  const nowUnix = now.getTime()
  const midnight = new Date(now)
  midnight.setHours(0)
  midnight.setMinutes(0)
  midnight.setSeconds(0)
  midnight.setMilliseconds(0)
  const midnightUnix = midnight.getTime()
  const msSinceMidnight = nowUnix - midnightUnix
  return msSinceMidnight / MS_PER_DAY
}

function updateTime() {
  const time = currentDecimalTime()
  // use string concatenation instead of the more "proper" rounding
  // followed by stringification, to avoid having to pad with 0's
  const timeText = "0." + Math.floor(time * DISPLAY_PRECISION)
  document.getElementById("time").innerText = timeText
  // display two fewer digits in the tab name because it gets
  // updated less frequently when not actively viewing the page
  document.title = timeText.slice(0, -2)
}

// update the time 10x per visible increment, to smooth over
// times that are skipped due to ms/day division mismatches
setInterval(updateTime, MS_PER_DAY / (DISPLAY_PRECISION * 10))
