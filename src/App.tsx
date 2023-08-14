import React, { FC, useEffect } from 'react'
import { createGlobalStyle, styled } from 'styled-components'
import { useStore, useEvent } from 'effector-react'
import { checkAuthFx } from './api/auth/auth'
import Sidebar from './components/Sidebar/Sidebar'
import useRemoveFocusWhenNotTab from './hooks/useRemoveFocusWhenNotTab'
import Mobile from './components/mobile/Mobile'
import { Footer } from './components/Footer/Footer'
import AppRouter from './router/AppRouter'
import { Theme } from './components/Theme'
import { device } from './styles/const'
import { useRole } from './hooks/useRoles'
import { useMediaQuery } from './hooks/useMediaQuery'

export const App: FC = () => {
    useRemoveFocusWhenNotTab()
    useRole()
    useEffect(() => {
        if (localStorage.getItem('auth')) fetchEvent()
        // else setLoadingFalse()
    }, [])

    const loading = useStore(checkAuthFx.pending)
    const fetchEvent = useEvent(checkAuthFx)
    const matches = useMediaQuery(device.tablet)

    return (
        <>
            <GlobalStyle />
            <>{console.log(matches)}</>
            <Theme>
                {loading ? (
                    <Layout></Layout>
                ) : (
                    <Wrapper>
                        <Layout>
                            <AppRouter />
                            {matches ? <Sidebar /> : <Mobile />}
                        </Layout>
                        {matches ? <Footer /> : null}
                    </Wrapper>
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
    @media (prefers-color-scheme: light) {
  html {
    background-color: #FFFFFF;
  }
}

@media (prefers-color-scheme: dark) {
  html {
    background-color: #131720;
  }
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
    width: 100%;
    background-color: ${(props) => props.theme.bg};
    transition: 300ms background-color;
    flex-grow: 1;

    @media ${device.mobileS} {
        flex-direction: column-reverse;
        justify-content: start;
    }

    @media ${device.tablet} {
        flex-direction: row;
        justify-content: space-between;
    }
`
