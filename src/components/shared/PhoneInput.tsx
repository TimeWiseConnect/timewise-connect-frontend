import React, { Dispatch, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'

type Props = {
    value: string
    setValue: Dispatch<SetStateAction<string>>
}
function format(value: string, pattern: string) {
    let i = 0
    return pattern.replace(/#/g, (_) => value[i++] ?? '')
}

export const PhoneInput = ({ value, setValue }: Props) => {
    const changeHandler = (value: string) => {
        value = value.slice(0, 17)
        if (value.startsWith('+7')) {
            value = value.slice(2).replaceAll(/\D/g, '')
        } else {
            value = value.replaceAll(/\D/g, '')
        }
        setValue(value)
        console.log(value)

        let formatted = ''
        if (value.length < 3) formatted = format(value, '###').trim()
        if (value.length > 2 && value.length < 6) formatted = format(value, '### ###')
        if (value.length > 5 && value.length < 8) formatted = format(value, '### ###-##')
        if (value.length > 7) formatted = format(value, '### ###-##-##')

        setPhone('+7 ' + formatted)
    }

    const [phone, setPhone] = useState('')

    return (
        <Input
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeHandler(e.target.value)
            }}
            placeholder="+7"
            onBlur={(e) => {
                if (value === '') {
                    setPhone(value)
                }
            }}
        />
    )
}

const Input = styled.input`
    border: 1px solid ${(props) => props.theme.lightGray};
    color: ${(props) => props.theme.main};
    height: 43px;
    border-radius: 5px;
    margin-bottom: 20px;
    padding-left: 20px;
    background-color: transparent;
    transition: 300ms all;
    font-size: 14px;
    line-height: 130%;

    &::placeholder {
        color: ${(props) => props.theme.gray};
    }

    &:focus {
        outline: ${(props) => props.theme.link} 1px solid;
    }
`
