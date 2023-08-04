import React from 'react'
import { useStore } from 'effector-react'
import { styled } from 'styled-components'
import { $authStore } from '../../store/auth'
import { Hamburger } from '../shared/icons/mobile/Hamburger'
import { Logo } from '../shared/icons/sidebar/Logo'
import { Close } from '../shared/icons/Close'
import { $sidebarStore, changeSidebarStatus } from '../../store/sidebar'

export const Navbar = () => {
    const { isAuthenticated } = useStore($authStore)
    const collapsed = useStore($sidebarStore) === 'closed'

    return (
        <NavbarLayout>
            <LogoContainer>
                <Logo />
                <LogoText>
                    TimeWise
                    <br />
                    Connect
                </LogoText>
            </LogoContainer>
            <Button
                onClick={() => {
                    changeSidebarStatus(collapsed ? 'open' : 'closed')
                }}
            >
                {collapsed ? <Hamburger /> : <Close />}
            </Button>
        </NavbarLayout>
    )
}

const NavbarLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    margin: 30px 16px;
    color: ${(props) => props.theme.main};
`

const LogoContainer = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
`

const LogoText = styled.p`
    font-size: 12px;
`

const Button = styled.button`
    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.main};
    &:focus {
        outline: ${(props) => props.theme.main} 1px solid;
        border-radius: 3px;
    }

    body:not(.user-is-tabbing) &:focus {
        outline: none;
    }
`
