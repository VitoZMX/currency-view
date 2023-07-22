export function subtractWorkday(date: string) {
    const x = new Date(Date.parse(date.split('T')[0]))

    const dayOfWeek = x.getDay() // получаем день недели от 0 (воскресенье) до 6 (суббота)
    let daysToSubtract = 1 // по умолчанию отнимаем 1 день
    if (dayOfWeek === 0) { // если воскресенье, то отнимаем 2 дня
        daysToSubtract = 2
    } else if (dayOfWeek === 1) { // если понедельник, то отнимаем 3 дня
        daysToSubtract = 3
    }
    const newDate = new Date(x)
    newDate.setDate(x.getDate() - daysToSubtract) // отнимаем дни от даты
    return newDate.toISOString().slice(0, 10) // возвращаем дату в формате YYYY-MM-DD
}