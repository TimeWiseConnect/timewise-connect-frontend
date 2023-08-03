import React, { useState } from 'react'
import { Input } from '../../styles/Input'

type Props = {
    value: number | undefined
    setValue: (number: number | undefined) => void
}

export const GradeInput = ({ value, setValue }: Props) => {
    const [val, setVal] = useState<string>(value?.toString() ?? '')

    const changeHandler = (value: string) => {
        value = value.replaceAll(/\D/g, '')
        const valueNum = Number(value)
        if (!value) {
            setValue(undefined)
            setVal(value)
            return
        }
        if (valueNum < 1) {
            setValue(1)
            setVal('1')
            return
        }
        if (valueNum > 11) {
            setValue(11)
            setVal('11')
            return
        }
        setValue(valueNum)
        setVal(value)
    }

    return <Input value={val} onChange={(e) => changeHandler(e.target.value)} placeholder="Класс*" />
}
