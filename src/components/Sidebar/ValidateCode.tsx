import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Link } from '../../styles/Link'
import { device } from '../../styles/const'
import { Button } from '../../styles/Button'
import { $authStore, setPhase } from '../../store/auth'
import { validateFx } from '../../api/auth/logIn'
import { useStore } from 'effector-react'

export const ValidateCode = () => {
    const [timer, setTimer] = useState(5)
    const [code, setCode] = useState('')
    const { phone } = useStore($authStore)

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
            <Text>Звоним на указанный номер. Введите последние 4 цифры номера, с которого поступит звонок.</Text>
            {!!timer && <Text>Перезвонить можно через {timer} секунд.</Text>}
            {!timer && (
                <Text>
                    Не пришло? <Link>Отправить ещё раз</Link>
                </Text>
            )}
            <Link onClick={() => setPhase(1)}>Вернутся к набору номера</Link>
            <Input
                maxLength={4}
                value={code}
                placeholder="Введите последние 4 цифры"
                onChange={(e) => setCode(e.target.value.replaceAll(/\D/g, ''))}
            />
            <Button
                disabled={code.length !== 4}
                type="submit"
                onClick={(event) => {
                    // event.currentTarget.blur()
                }}
            >
                Отправить СМС
            </Button>
        </Layout>
    )
}

const Text = styled.div`
    font-size: 14px;
    line-height: 130%;
`

const Layout = styled.form`
    gap: 10px;
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
        margin-bottom: 20px;
    }

    @media ${device.laptop} {
        height: 43px;
        padding-left: 20px;
        font-size: 14px;
    }
`
