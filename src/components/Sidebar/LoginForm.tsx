import React, { useState } from 'react'
import { styled } from 'styled-components'
import { PhoneInput } from '../shared/PhoneInput'

const LoginForm = () => {
    const [phone, setPhone] = useState('')
    return (
        <LoginFormLayout
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                // submitted()
            }}
        >
            <Text>Телефон</Text>
            <PhoneInput value={phone} setValue={setPhone}></PhoneInput>
            <Text>
                Нет аккаунта? <Link href="">Зарегистрируйтесь</Link>
            </Text>
            <Button type="submit">Отправить СМС</Button>
        </LoginFormLayout>
    )
}

const LoginFormLayout = styled.form`
    font-family: Golos Text;
    display: flex;
    flex-direction: column;
    transition: 300ms all;
`

const Text = styled.p`
    font-size: 14px;
    line-height: 130%;
    margin-bottom: 10px;
    color: ${(props) => props.theme.gray};
`

const Link = styled.a`
    color: ${(props) => props.theme.link};
    text-decoration: none;

    &:hover {
        color: ${(props) => props.theme.linkHover};
    }

    &:focus {
        outline: ${(props) => props.theme.main} 1px solid;
        border-radius: 3px;
    }
`

const Button = styled.button`
    padding: 18px 60px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.accent1};
    color: ${(props) => props.theme.buttonText};
    border: none;
    cursor: pointer;

    &:focus {
        outline: ${(props) => props.theme.focus} 1px solid;
    }
`

export default LoginForm
