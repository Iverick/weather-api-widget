export const converter = (inputDate) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = new Date(inputDate)
  const weekdayIndex = date.getDay()
  return weekdays[weekdayIndex]
}