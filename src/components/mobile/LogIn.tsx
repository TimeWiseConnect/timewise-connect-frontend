import React from 'react'
import { styled } from 'styled-components'
import ThemeSwitch from '../shared/ThemeSwitch'
import { MobileFooter } from '../Footer/MobileFooter'
import { LoginForm } from '../Sidebar/LoginForm'
import { useStore } from 'effector-react'
import { $userStore, logOut } from '../../store/userStore'
import { Account } from '../Sidebar/Account'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { LogOut } from '../shared/icons/sidebar/LogOut'
import { Text } from '../../styles/Text'
import { $sidebarStore } from '../../store/sidebar'

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
                        <FootWrap>
                            <ThemeSwitch closed={false} />
                            {isAuthenticated && (
                                <InvisibleButton onClick={() => logOut()}>
                                    <LogOut /> <Text>Выйти из аккаунта</Text>
                                </InvisibleButton>
                            )}
                        </FootWrap>
                    </>
                )}
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
    height: 100%;
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

const FootWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    gap: 16px;
    margin-bottom: 40px;
    color: ${(props) => props.theme.main};
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
