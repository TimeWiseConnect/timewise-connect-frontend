import React, { FC, useEffect } from 'react'
import AppRouter from './router/AppRouter'
import { createGlobalStyle, styled } from 'styled-components'
import { useStore, useEvent } from 'effector-react'
import { checkAuthFx } from './api/auth/auth'
import { $isAuth, setLoadingFalse } from './store/auth'
import Footer from './components/Footer'
import { footerHeight } from './styles/const'
import Theme from './components/Theme'
import Sidebar from './components/Sidebar/Sidebar'
import { changeTheme, theme } from './store/theme'

const App: FC = () => {
    useEffect(() => {
        if (localStorage.getItem('auth')) fetchEvent()
        else setLoadingFalse()
    }, [])
    useEffect(() => {
        if (localStorage.getItem('theme')) changeTheme(localStorage.getItem('theme') as theme)
    }, [])

    const { isLoading } = useStore($isAuth)
    const fetchEvent = useEvent(checkAuthFx)

    return (
        <div>
            <GlobalStyle />
            <Theme>
                {!isLoading ? (
                    <>
                        <Layout>
                            {/* <AppRouter /> */}
                            <Sidebar />
                        </Layout>
                        <Footer />
                    </>
                ) : (
                    <Layout>Loading</Layout>
                )}
            </Theme>
        </div>
    )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Golos Text', sans-serif;
  }
`

const Layout = styled.div`
    height: calc(100vh - ${footerHeight});
    display: flex;
    justify-content: end;
    align-items: center;
    background-color: ${(props) => props.theme.bg};
    transition: 300ms background-color;
`

export default App
