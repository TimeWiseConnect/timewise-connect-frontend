import React, { FC, useEffect } from 'react'
import { createGlobalStyle, styled } from 'styled-components'
import { useStore, useEvent } from 'effector-react'
import { checkAuthFx } from './api/auth/auth'
import { $isAuth, setLoadingFalse } from './store/auth'
import Theme from './components/Theme'
import Sidebar from './components/Sidebar/Sidebar'
import { changeTheme, theme } from './store/theme'
import useWindowDimensions from './utils/useWindowDimensions'
import useRemoveFocusWhenNotTab from './utils/useRemoveFocusWhenNotTab'
import Mobile from './components/mobile/Mobile'
import { Footer } from './components/Footer/Footer'

const App: FC = () => {
    const { width } = useWindowDimensions()
    useRemoveFocusWhenNotTab()
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
        <>
            <GlobalStyle />
            <Theme>
                {!isLoading ? (
                    <Wrapper>
                        <Layout>
                            {/* <AppRouter /> */}
                            {width >= 768 ? <Sidebar /> : <Mobile />}
                        </Layout>
                        {width >= 768 ? <Footer /> : null}
                    </Wrapper>
                ) : (
                    <Layout>Loading</Layout>
                )}
            </Theme>
        </>
    )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Golos Text', sans-serif;
    }
    html, body, #root {
    height: 100%;
    margin: 0;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const Layout = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    background-color: ${(props) => props.theme.bg};
    transition: 300ms background-color;
    flex-grow: 1;
`

export default App
