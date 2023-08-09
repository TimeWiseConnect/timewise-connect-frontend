import React from 'react'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { $sidebarStore, changeSidebarStatus } from '../../store/sidebar'
import { useStore } from 'effector-react'
import { $userStore } from '../../store/userStore'
import { Logo } from '../shared/icons/sidebar/Logo'
import { TWC } from '../shared/icons/sidebar/TWC'
import { Text } from '../../styles/Text'
import { Account } from './Account'
import { LoginForm } from './LoginForm'

export const SidebarHeader = () => {
    const closed = useStore($sidebarStore).closed === 'closed'
    const { registration } = useStore($sidebarStore)
    const { isAuthenticated } = useStore($userStore)

    return (
        <Layout $closed={closed}>
            <HeaderContainer $closed={closed}>
                <LogoContainer $closed={closed}>
                    <Logo closed />
                    {closed && <TWC />}
                    {!closed && (
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
                        disabled={!closed}
                        $closed={closed}
                    >
                        {registration ? 'Зарегистрироваться' : 'Войти'}
                    </ChangelingButton>
                    <LoginForm />
                </>
            )}
        </Layout>
    )
}

type SidebarProps = {
    $closed: boolean
}

const Layout = styled.div<SidebarProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: 300ms all;

    @media ${device.tablet} {
        ${(props) => (props.$closed ? 'padding: 0;' : 'padding: 0px 20px;')};
    }

    @media ${device.laptop} {
        ${(props) => (props.$closed ? 'padding: 0;' : 'padding: 0px 40px;')};
    }
`

const HeaderContainer = styled.div<SidebarProps>`
    display: flex;
    ${(props) => (props.$closed ? 'width: 36px;' : 'width: 100%; ')};
    flex-direction: column;
    align-items: start;
    transition: 300ms all;
`

const LogoContainer = styled.div<SidebarProps>`
    display: flex;
    flex-direction: ${(props) => (props.$closed ? 'column' : 'row')};
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

const ChangelingButton = styled(InvisibleButton)<SidebarProps>`
    display: flex;
    flex-direction: column;
    align-items: start;
    transition:
        300ms all,
        150ms color;

    ${(props) => (props.$closed ? '' : 'cursor: auto;')}

    @media ${device.tablet} {
        width: ${(props) => (props.$closed ? '42px' : '100%')};
        margin-bottom: 30px;
    }

    @media ${device.laptop} {
        width: ${(props) => (props.$closed ? '48px' : '100%')};
        margin-bottom: 40px;
    }
`
