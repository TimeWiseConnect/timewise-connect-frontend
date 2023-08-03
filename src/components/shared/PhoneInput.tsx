import React, { Dispatch, InputHTMLAttributes, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { Input } from '../../styles/Input'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    value: string
    setValue: Dispatch<SetStateAction<string>> | ((string: string) => void)
    isInForm?: boolean
}
function format(value: string, pattern: string) {
    let i = 0
    return pattern.replace(/#/g, () => value[i++] ?? '')
}

const formatAll = (value: string) => {
    let formatted = ''
    if (value.length < 3) formatted = format(value, '(###').trim()
    if (value.length > 2 && value.length < 6) formatted = format(value, '(###) ###')
    if (value.length > 5 && value.length < 8) formatted = format(value, '(###) ###-##')
    if (value.length > 7) formatted = format(value, '(###) ###-##-##')
    return formatted
}

export const PhoneInput = ({ value, setValue, isInForm, ...otherProps }: Props) => {
    const changeHandler = (pureValue: string, oldValue: string) => {
        value = pureValue.slice(0, 18)
        const last = pureValue.slice(-1).replaceAll(/[^0-9()\-]/g, '')
        if (value.startsWith('+7')) {
            value = value.slice(2).replaceAll(/\D/g, '')
        } else {
            value = value.replaceAll(/\D/g, '')
        }
        if (last && value.length < 10 && value === oldValue) value = value.slice(0, value.length - 1)
        setValue(value)
        setPhone('+7 ' + formatAll(value))
    }

    const [phone, setPhone] = useState(value ? '+7 ' + formatAll(value) : '')

    if (isInForm)
        return (
            <Input
                placeholder="Ваш номер*"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeHandler(e.target.value, value)
                }}
                onBlur={() => {
                    if (value === '') {
                        setPhone(value)
                    }
                }}
            />
        )

    return (
        <DefaultInput
            {...otherProps}
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeHandler(e.target.value, value)
            }}
            onBlur={() => {
                if (value === '') {
                    setPhone(value)
                }
            }}
        />
    )
}

const DefaultInput = styled.input`
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
