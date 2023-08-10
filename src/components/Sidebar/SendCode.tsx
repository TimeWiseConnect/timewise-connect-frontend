import React from 'react'
import { $sidebarStore, setRegistration } from '../../store/sidebar'
import { useStore } from 'effector-react'
import { $userStore, setAuthPhone, setName } from '../../store/userStore'
import { PhoneInput } from '../shared/PhoneInput'
import { Link } from '../../styles/Link'
import { Button } from '../../styles/Button'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { makeACallFx } from '../../api/auth/logIn'
import { ErrorMessage } from './ValidateCode'

export const SendCode = () => {
    const collapsed = useStore($sidebarStore).closed === 'closed'
    const { phone, name, error } = useStore($userStore)
    const { registration } = useStore($sidebarStore)

    return (
        <LoginFormLayout
            $isCollapsed={collapsed}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                makeACallFx({ phone, name })
            }}
        >
            {registration ? (
                <>
                    <Label>Имя</Label>
                    <Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
                </>
            ) : null}
            <Label>Телефон</Label>
            <PhoneInput
                placeholder="+7"
                tabIndex={collapsed ? -1 : 0}
                value={phone}
                setValue={setAuthPhone}
            ></PhoneInput>
            <Text>
                {registration ? 'Есть аккаунт? ' : 'Нет аккаунта? '}
                <BR />
                <Link
                    tabIndex={collapsed ? -1 : 0}
                    href="/"
                    onClick={(event) => {
                        event.preventDefault()
                        event.currentTarget.blur()
                        setRegistration(!registration)
                    }}
                >
                    {registration ? 'Войдите' : 'Зарегистрируйтесь'}
                </Link>
            </Text>
            {!!registration && (
                <SmallText>
                    Нажимая на кнопку, вы соглашаетесь с <Link>политикой конфиденциальности</Link> и 
                    <Link>условиями предоставления услуг</Link>.
                </SmallText>
            )}
            {!!error && error === 'Укажите ваше имя' ? (
                <ErrorMessage>Аккаунт не найден.</ErrorMessage>
            ) : error === 'Internal server error' || error === 'Network Error' ? (
                <ErrorMessage>Сервер не отвечает. Попробуйте позже.</ErrorMessage>
            ) : (
                <ErrorMessage>{error}</ErrorMessage>
            )}
            <Button
                disabled={phone.length !== 10}
                tabIndex={collapsed ? -1 : 0}
                type="submit"
                onClick={(event) => {
                    event.currentTarget.blur()
                }}
            >
                {registration ? 'Зарегистрироваться' : 'Отправить СМС'}
            </Button>
        </LoginFormLayout>
    )
}

type SidebarProps = {
    $isCollapsed: boolean
}

const LoginFormLayout = styled.form<SidebarProps>`
    width: 100%;
    opacity: ${(props) => (props.$isCollapsed ? '0' : '1')};
    ${(props) => (props.$isCollapsed ? 'visibility: hidden;' : '')};
    font-family: Golos Text;
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    transition: 300ms all;
`

const Label = styled.p`
    line-height: 130%;
    color: ${(props) => props.theme.gray};

    @media ${device.mobileS} {
        font-size: 12px;
        margin-bottom: 5px;
    }

    @media ${device.laptop} {
        margin-bottom: 10px;
        font-size: 14px;
    }
`

const Text = styled.p`
    line-height: 130%;
    color: ${(props) => props.theme.main};
    white-space: nowrap;

    @media ${device.mobileS} {
        font-size: 12px;
        margin-bottom: 20px;
    }

    @media ${device.tablet} {
        margin-bottom: 0;
        margin-top: 20px;
    }

    @media ${device.laptop} {
        font-size: 14px;
    }
`

const BR = styled.br`
    @media ${device.mobileS} {
        display: none;
    }
    @media ${device.tablet} {
        display: block;
    }

    @media ${device.laptop} {
        display: none;
    }
`
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

const SmallText = styled.p`
    margin-top: 20px;
    font-size: 12px;
    line-height: 130%;
`
