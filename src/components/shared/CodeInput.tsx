import React from 'react'
import { Input } from '../../styles/Input'

type Props = {
    value: string
    setValue: (string: string) => void
}

export const CodeInput = ({ value, setValue }: Props) => {
    const changeHandler = (value: string) => {
        value = value.replaceAll(/\D/g, '')
        setValue(value)
    }

    return (
        <Input
            value={value}
            maxLength={4}
            onChange={(e) => changeHandler(e.target.value)}
            placeholder="Введите последние 4 цифры номера"
        />
    )
}
