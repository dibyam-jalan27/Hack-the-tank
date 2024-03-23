export const convertSecondstoTime = function (given_seconds) {
  const dateObj = new Date(given_seconds * 1000)
  const hours = dateObj.getUTCHours()
  const minutes = dateObj.getUTCMinutes()
  const seconds = dateObj.getSeconds()

  const timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")

  return timeString
}
export const convertSecondstoTimeWords = function (given_seconds) {
  const dateObj = new Date(given_seconds * 1000)
  const hours = dateObj.getUTCHours()
  const minutes = dateObj.getUTCMinutes()
  const seconds = dateObj.getSeconds()

  const timeString =
    hours.toString().padStart(2, "0") +
    "h " +
    minutes.toString().padStart(2, "0") +
    "m " +
    seconds.toString().padStart(2, "0") +
    "s"

  return timeString
}
