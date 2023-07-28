import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { $isAuth, logOut } from '../../store/auth'
import { styled } from 'styled-components'
import { footerHeight } from '../../styles/const'
import { Logo } from '../shared/icons/sidebar/Logo'
import { $themeStore, changeTheme } from '../../store/theme'
import { Sun } from '../shared/icons/sidebar/Sun'
import { Moon } from '../shared/icons/sidebar/Moon'
import { SideButton } from '../shared/icons/sidebar/SideButton'
import { TWC } from '../shared/icons/sidebar/TWC'
import LoginForm from './LoginForm'

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
    const { isAuthenticated, currentUser } = useStore($isAuth)
    const theme = useStore($themeStore)
    return (
        <SidebarLayout $isCollapsed={isCollapsed}>
            <ChangeWidthButton
                $isCollapsed={isCollapsed}
                onClick={() => {
                    setIsCollapsed(!isCollapsed)
                }}
            >
                <SideButton />
            </ChangeWidthButton>
            <SidebarHeader $isCollapsed={isCollapsed}>
                <HeaderContainer $isCollapsed={isCollapsed}>
                    <LogoContainer $isCollapsed={isCollapsed}>
                        <Logo />
                        {isCollapsed && <TWC />}
                        {!isCollapsed && (
                            <Text>
                                TimeWise
                                <br />
                                Connect
                            </Text>
                        )}
                    </LogoContainer>
                    {isAuthenticated ? (
                        <div>
                            AVATAR
                            <Text>{currentUser?.name}</Text>
                        </div>
                    ) : (
                        <InvisibleButton
                            onClick={() => {
                                setIsCollapsed(!isCollapsed)
                            }}
                        >
                            Войти
                        </InvisibleButton>
                    )}
                    {!isCollapsed && <LoginForm />}
                </HeaderContainer>
            </SidebarHeader>
            <SidebarFooter>
                {theme === 'light' ? (
                    <InvisibleButton
                        onClick={() => {
                            changeTheme('dark')
                        }}
                    >
                        <Moon />
                        {!isCollapsed && <p>Темная тема</p>}
                    </InvisibleButton>
                ) : (
                    <InvisibleButton
                        onClick={() => {
                            changeTheme('light')
                        }}
                    >
                        <Sun />
                        {!isCollapsed && <Text>Светлая тема</Text>}
                    </InvisibleButton>
                )}
                {isAuthenticated && (
                    <div onClick={() => logOut()}>
                        (isCollapsed ? <Text>ВЫЙТИ1</Text> : <Text>ВЫЙТИ2</Text>)
                    </div>
                )}
            </SidebarFooter>
        </SidebarLayout>
    )
}

type SidebarProps = {
    $isCollapsed: boolean
}

const animationSpeed = '500ms'

const SidebarLayout = styled.div<SidebarProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: ${(props) => (props.$isCollapsed ? '100px' : '328px')};
    height: calc(100vh - ${footerHeight});
    padding: 20px 0px 60px 0px;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.main};
    transition: ${animationSpeed} all;
    background-color: 300ms color;
    border-left: 1px solid ${(props) => props.theme.lightGray};
`

const SidebarHeader = styled.div<SidebarProps>`
    display: flex;
    justify-content: center;
    width: ${(props) => (props.$isCollapsed ? '47px' : '100%')};
    ${(props) => (props.$isCollapsed ? '' : 'padding-left: 40px;')}
    transition: ${animationSpeed} all;
`

const HeaderContainer = styled.div<SidebarProps>`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 60px;
    width: ${(props) => (props.$isCollapsed ? '37px' : '100%')};
    transition: ${animationSpeed} all;
`

const LogoContainer = styled.div<SidebarProps>`
    display: flex;
    flex-direction: ${(props) => (props.$isCollapsed ? 'column' : 'row')};
    align-items: center;
    justify-content: center;
    gap: 5px;
`

const SidebarFooter = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 60px;
`

const InvisibleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.main};
    font-size: 16px;
    line-height: 130%;
`

const Text = styled.p`
    color: ${(props) => props.theme.main};
    font-size: 16px;
    line-height: 130%;
`

const ChangeWidthButton = styled(InvisibleButton)<SidebarProps>`
    transition: ${animationSpeed} all;
    position: absolute;
    right: calc(${(props) => (props.$isCollapsed ? '100px' : '328px')} - 13px);
    ${(props) => (props.$isCollapsed ? '' : 'rotate: 180deg;')}
`

export default Sidebar
