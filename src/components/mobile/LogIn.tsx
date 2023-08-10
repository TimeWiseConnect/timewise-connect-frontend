import React from 'react'
import { styled } from 'styled-components'
import { MobileFooter } from '../Footer/MobileFooter'
import { LoginForm } from '../Sidebar/LoginForm'
import { useStore } from 'effector-react'
import { $userStore } from '../../store/userStore'
import { Account } from '../Sidebar/Account'
import { $sidebarStore } from '../../store/sidebar'
import { SidebarFooter } from '../Sidebar/SidebarFooter'

export const LogIn = () => {
    const { isAuthenticated } = useStore($userStore)
    const { registration } = useStore($sidebarStore)
    return (
        <Layout>
            <SideBar>
                {isAuthenticated ? (
                    <Account />
                ) : (
                    <>
                        <HeadWrap>
                            <Header>{registration ? 'Зарегистрироваться' : 'Войти'}</Header>
                            <LoginForm />
                        </HeadWrap>
                    </>
                )}
                <SidebarFooter />
            </SideBar>
            <MobileFooter />
        </Layout>
    )
}

const Layout = styled.div`
    z-index: 100;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100dvh;
    width: 100%;
    color: ${(props) => props.theme.main};
    background-color: ${(props) => props.theme.mobileBg};
`
const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0px 16px;
`

const HeadWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${(props) => props.theme.main};
`

const Header = styled.h1`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 40px;
`
