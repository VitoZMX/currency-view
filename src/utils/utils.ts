export function subtractWorkday(date: string) {
    const x = new Date(Date.parse(date))

    const dayOfWeek = x.getDay() // получаем день недели от 0 (воскресенье) до 6 (суббота)
    const daysToSubtract = dayOfWeek === 1 ? 3 : 1 // если понедельник, то отнимаем 3 дня, иначе 1 день
    const newDate = new Date(x)
    newDate.setDate(x.getDate() - daysToSubtract) // отнимаем дни от даты
    return new Date(newDate).toISOString()
}