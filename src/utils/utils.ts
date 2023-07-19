export function subtractWorkday(date: Date) {
    const dayOfWeek = date.getDay() // получаем день недели от 0 (воскресенье) до 6 (суббота)
    const daysToSubtract = dayOfWeek === 1 ? 3 : 1 // если понедельник, то отнимаем 3 дня, иначе 1 день
    const newDate = new Date(date)
    newDate.setDate(date.getDate() - daysToSubtract) // отнимаем дни от даты
    return newDate.toISOString()
}