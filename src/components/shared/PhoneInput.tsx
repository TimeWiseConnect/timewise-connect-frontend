import React, { Dispatch, InputHTMLAttributes, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'
import { device } from '../../styles/const'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    value: string
    setValue: Dispatch<SetStateAction<string>>
}
function format(value: string, pattern: string) {
    let i = 0
    return pattern.replace(/#/g, (_) => value[i++] ?? '')
}

export const PhoneInput = ({ value, setValue, ...otherProps }: Props) => {
    const changeHandler = (pureValue: string, oldValue: string) => {
        value = pureValue.slice(0, 18)
        const last = pureValue.slice(-1).replaceAll(/[^0-9()\-]/g, '')
        console.log(last)
        console.log(pureValue)
        console.log(pureValue.replaceAll(/[^0-9)\-\s\+]/g, ''))
        if (value.startsWith('+7')) {
            value = value.slice(2).replaceAll(/\D/g, '')
        } else {
            value = value.replaceAll(/\D/g, '')
        }
        console.log(value.length < 10)
        if (last && value.length < 10 && value === oldValue) value = value.slice(0, value.length - 1)
        setValue(value)

        let formatted = ''
        if (value.length < 3) formatted = format(value, '(###').trim()
        if (value.length > 2 && value.length < 6) formatted = format(value, '(###) ###')
        if (value.length > 5 && value.length < 8) formatted = format(value, '(###) ###-##')
        if (value.length > 7) formatted = format(value, '(###) ###-##-##')

        setPhone('+7 ' + formatted)
    }

    const [phone, setPhone] = useState('')

    return (
        <Input
            {...otherProps}
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeHandler(e.target.value, value)
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
    border-radius: 5px;
    background-color: transparent;
    transition: 300ms all;
    line-height: 130%;

    &::placeholder {
        color: ${(props) => props.theme.gray};
    }

    &:focus {
        outline: ${(props) => props.theme.link} 1px solid;
    }

    @media ${device.mobileS} {
        height: 40px;
        padding-left: 20px;
        font-size: 12px;
        margin-bottom: 30px;
    }

    @media ${device.tablet} {
        height: 40px;
        padding-left: 10px;
        font-size: 12px;
        margin-bottom: 20px;
    }

    @media ${device.laptop} {
        height: 43px;
        padding-left: 20px;
        font-size: 14px;
    }
`
