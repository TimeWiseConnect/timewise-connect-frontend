import React from 'react'
import { $sidebarStore } from '../../store/sidebar'
import { useStore } from 'effector-react'
import { $authStore, setPhone } from '../../store/auth'
import { PhoneInput } from '../shared/PhoneInput'
import { Link } from '../../styles/Link'
import { Button } from '../../styles/Button'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { makeACallFx } from '../../api/auth/logIn'

export const SendCode = () => {
    const collapsed = useStore($sidebarStore) === 'closed'
    const { phone } = useStore($authStore)

    return (
        <LoginFormLayout
            $isCollapsed={collapsed}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                makeACallFx({ phone })
            }}
        >
            <Label>Телефон</Label>
            <PhoneInput placeholder="+7" tabIndex={collapsed ? -1 : 0} value={phone} setValue={setPhone}></PhoneInput>
            <Text>
                Нет аккаунта? <BR />
                <Link
                    tabIndex={collapsed ? -1 : 0}
                    href="/"
                    onClick={(event) => {
                        event.preventDefault()
                    }}
                >
                    Зарегистрируйтесь
                </Link>
            </Text>
            <Button
                disabled={phone.length !== 10}
                tabIndex={collapsed ? -1 : 0}
                type="submit"
                onClick={(event) => {
                    // event.currentTarget.blur()
                }}
            >
                Отправить СМС
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

    @media ${device.tablet} {
        margin-bottom: 5px;
        font-size: 12px;
    }

    @media ${device.laptop} {
        margin-bottom: 10px;
        font-size: 14px;
    }
`

const Text = styled.p`
    line-height: 130%;
    color: ${(props) => props.theme.main};
    margin-bottom: 10px;
    white-space: nowrap;

    @media ${device.tablet} {
        font-size: 12px;
    }

    @media ${device.laptop} {
        font-size: 14px;
    }
`

const BR = styled.br`
    @media ${device.tablet} {
        display: block;
    }

    @media ${device.laptop} {
        display: none;
    }
`
