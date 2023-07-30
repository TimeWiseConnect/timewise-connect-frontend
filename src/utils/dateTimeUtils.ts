export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
}

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
    const date1WithoutTime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
    const date2WithoutTime = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

    return date1WithoutTime.getTime() === date2WithoutTime.getTime()
}

export const formatDateWord = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }
    return date.toLocaleDateString('ru-RU', options)
}

export const formatDateNumber = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric' }
    return date.toLocaleDateString('ru-RU', options)
}
