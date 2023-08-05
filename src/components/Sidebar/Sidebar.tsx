import React from 'react'
import { useStore } from 'effector-react'
import { $authStore, logOut } from '../../store/auth'
import { styled } from 'styled-components'
import { Logo } from '../shared/icons/sidebar/Logo'
import { SideButton } from '../shared/icons/sidebar/SideButton'
import { TWC } from '../shared/icons/sidebar/TWC'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { Text } from '../../styles/Text'
import ThemeSwitch from '../shared/ThemeSwitch'
import { LoginForm } from './LoginForm'
import { device } from '../../styles/const'
import { $sidebarStore, changeSidebarStatus } from '../../store/sidebar'
import { LogOut } from '../shared/icons/sidebar/LogOut'
import { Account } from './Account'

const Sidebar = () => {
    const collapsed = useStore($sidebarStore) === 'closed'
    const { isAuthenticated, registration } = useStore($authStore)
    return (
        <SidebarLayout $isCollapsed={collapsed}>
            <ChangeWidthButton
                $isCollapsed={collapsed}
                onClick={() => {
                    changeSidebarStatus(collapsed ? 'open' : 'closed')
                }}
            >
                <SideButton />
            </ChangeWidthButton>
            <SidebarHeader $isCollapsed={collapsed}>
                <HeaderContainer $isCollapsed={collapsed}>
                    <LogoContainer $isCollapsed={collapsed}>
                        <Logo isCollapsed />
                        {collapsed && <TWC />}
                        {!collapsed && (
                            <Text>
                                TimeWise
                                <br />
                                Connect
                            </Text>
                        )}
                    </LogoContainer>
                </HeaderContainer>
                {isAuthenticated ? (
                    <Account />
                ) : (
                    <>
                        <ChangelingButton
                            onClick={() => {
                                changeSidebarStatus('open')
                            }}
                            disabled={!collapsed}
                            $isCollapsed={collapsed}
                        >
                            {registration ? 'Зарегистрироваться' : 'Войти'}
                        </ChangelingButton>
                        <LoginForm />
                    </>
                )}
            </SidebarHeader>
            <SidebarFooter $isCollapsed={collapsed}>
                <FooterContainer $isCollapsed={collapsed}>
                    <ThemeSwitch isCollapsed={collapsed} />
                    {isAuthenticated && (
                        <InvisibleButton onClick={() => logOut()}>
                            <LogOut /> {collapsed ? null : <Text>Выйти из аккаунта</Text>}
                        </InvisibleButton>
                    )}
                </FooterContainer>
            </SidebarFooter>
        </SidebarLayout>
    )
}

type SidebarProps = {
    $isCollapsed: boolean
}

const animationSpeed = '500ms'

const SidebarLayout = styled.div<SidebarProps>`
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
    height: 100vh;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.main};
    border-left: 1px solid ${(props) => props.theme.lightGray};
    padding: 20px 0px 60px 0px;
    transition:
        ${animationSpeed} all,
        300ms background-color;

    @media ${device.tablet} {
        width: ${(props) => (props.$isCollapsed ? '60px' : '180px')};
    }

    @media ${device.laptop} {
        width: ${(props) => (props.$isCollapsed ? '75px' : '328px')};
    }
`

const SidebarHeader = styled.div<SidebarProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: 300ms all;

    @media ${device.tablet} {
        ${(props) => (props.$isCollapsed ? '' : 'padding: 0px 20px;')};
    }

    @media ${device.laptop} {
        ${(props) => (props.$isCollapsed ? '' : 'padding: 0px 40px;')};
    }
`

const HeaderContainer = styled.div<SidebarProps>`
    display: flex;
    ${(props) => (props.$isCollapsed ? 'width: 36px;' : 'width: 100%; ')};
    flex-direction: column;
    align-items: start;
    transition: ${animationSpeed} all;
`

const LogoContainer = styled.div<SidebarProps>`
    display: flex;
    flex-direction: ${(props) => (props.$isCollapsed ? 'column' : 'row')};
    align-items: center;
    justify-content: center;

    @media ${device.tablet} {
        gap: 2.78px;
        padding-bottom: 35px;
    }

    @media ${device.laptop} {
        gap: 5px;
        padding-bottom: 60px;
    }
`

const SidebarFooter = styled.div<SidebarProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    @media ${device.tablet} {
        ${(props) => (props.$isCollapsed ? '' : 'padding: 0px 20px;')};
        gap: 10px;
    }

    @media ${device.laptop} {
        ${(props) => (props.$isCollapsed ? '' : 'padding: 0px 40px;')};
        gap: 20px;
    }
`

const FooterContainer = styled.div<SidebarProps>`
    display: flex;
    ${(props) => (props.$isCollapsed ? 'width: 26px;' : 'width: 100%; ')};
    flex-direction: column;
    align-items: start;
    gap: 20px;
    transition: ${animationSpeed} all;
`

const ChangelingButton = styled(InvisibleButton)<SidebarProps>`
    display: flex;
    flex-direction: column;
    align-items: start;
    transition:
        ${animationSpeed} all,
        150ms color;

    ${(props) => (props.$isCollapsed ? '' : 'cursor: auto;')}

    @media ${device.tablet} {
        width: ${(props) => (props.$isCollapsed ? '42px' : '100%')};
        margin-bottom: 30px;
    }

    @media ${device.laptop} {
        width: ${(props) => (props.$isCollapsed ? '48px' : '100%')};
        margin-bottom: 40px;
    }
`

const ChangeWidthButton = styled(InvisibleButton)<SidebarProps>`
    transition: ${animationSpeed} all;
    position: absolute;
    ${(props) => (props.$isCollapsed ? '' : 'rotate: 180deg;')}

    @media ${device.tablet} {
        right: calc(${(props) => (props.$isCollapsed ? '60px' : '180px')} - 13px);
    }

    @media ${device.laptop} {
        right: calc(${(props) => (props.$isCollapsed ? '75px' : '328px')} - 13px);
    }
`

export default Sidebar
