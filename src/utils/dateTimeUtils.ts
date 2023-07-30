export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
}

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
    const date1WithoutTime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
    const date2WithoutTime = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

    return date1WithoutTime.getTime() === date2WithoutTime.getTime()
}

export const isTimeEqual = (date1: Date, date2: Date): boolean => {
    return date1.getTime() === date2.getTime()
}

export const formatDateWord = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }
    return date.toLocaleDateString('ru-RU', options)
}

export const formatDateNumber = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric' }
    return date.toLocaleDateString('ru-RU', options)
}

export const getTimeFromDate = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}
