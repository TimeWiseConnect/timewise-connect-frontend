import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Link } from '../../styles/Link'
import { device } from '../../styles/const'
import { Button } from '../../styles/Button'
import { $userStore, setPhase } from '../../store/userStore'
import { validateFx } from '../../api/auth/logIn'
import { useStore } from 'effector-react'
import { $sidebarStore } from '../../store/sidebar'

export const ValidateCode = () => {
    const [timer, setTimer] = useState(5)
    const [code, setCode] = useState('')
    const { phone, error } = useStore($userStore)
    const { registration } = useStore($sidebarStore)

    useEffect(() => {
        let intervalId: NodeJS.Timer | undefined
        if (timer) intervalId = setInterval(() => setTimer(timer - 1), 1000)
        if (!timer) clearInterval(intervalId)
        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [timer])

    return (
        <Layout
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                validateFx({ phone, code })
            }}
        >
            <Text>
                {!!timer && `В течение ${timer} секунд на указанный номер поступит звонок.`} Введите последние 4 цифры
                номера входящего звонка. Отвечать на звонок не нужно.
                <br />
                {!timer && (
                    <>
                        Не позвонили? <Link onClick={() => setTimer(5)}>Попробовать ещё раз</Link>.
                    </>
                )}
            </Text>
            <Link onClick={() => setPhase(1)}>Вернутся к набору номера</Link>
            <Input
                maxLength={4}
                value={code}
                placeholder="Введите 4 цифры"
                onChange={(e) => setCode(e.target.value.replaceAll(/\D/g, ''))}
            />
            {!!error && (error === 'Internal server error' || error === 'Network Error') ? (
                <ErrorMessage>Сервер не отвечает. Попробуйте позже.</ErrorMessage>
            ) : (
                <ErrorMessage>{error}</ErrorMessage>
            )}
            <Button
                disabled={code.length !== 4}
                type="submit"
                onClick={(event) => {
                    event.currentTarget.blur()
                }}
            >
                {registration ? 'Зарегистрироваться' : 'Войти'}
            </Button>
        </Layout>
    )
}

const Text = styled.div`
    font-size: 14px;
    line-height: 130%;
    margin-bottom: 10px;
`
export const ErrorMessage = styled.div`
    font-size: 14px;
    line-height: 130%;
    margin-top: 5px;
    color: ${(props) => props.theme.danger};
`

const Layout = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
`

const Input = styled.input`
    border: 1px solid ${(props) => props.theme.lightGray};
    color: ${(props) => props.theme.main};
    border-radius: 5px;
    background-color: transparent;
    transition: 300ms all;
    line-height: 130%;
    width: 100%;

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
        margin-bottom: 0px;
        margin-top: 20px;
    }

    @media ${device.laptop} {
        height: 43px;
        padding-left: 20px;
        font-size: 14px;
    }
`
