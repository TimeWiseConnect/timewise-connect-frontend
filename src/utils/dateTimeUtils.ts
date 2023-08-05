import { capitalizeFirstLetter } from './stringUtils'

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

export const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export const formatDateWord = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }
    return date.toLocaleDateString('ru-RU', options)
}

export const formatDateNumber = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric' }
    return date.toLocaleDateString('ru-RU', options)
}

export const getMonth = (date: Date) => {
    return capitalizeFirstLetter(date.toLocaleString('ru-RU', { month: 'long' }))
}

export const getTimeFromDate = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}
