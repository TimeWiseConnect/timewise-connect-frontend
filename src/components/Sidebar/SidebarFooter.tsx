import { useStore } from 'effector-react'
import React from 'react'
import { $sidebarStore } from '../../store/sidebar'
import { $userStore, logOut } from '../../store/userStore'
import ThemeSwitch from '../shared/ThemeSwitch'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { LogOut } from '../shared/icons/sidebar/LogOut'
import { Text } from '../../styles/Text'

export const SidebarFooter = () => {
    const closed = useStore($sidebarStore).closed === 'closed'
    const { isAuthenticated } = useStore($userStore)

    return (
        <Layout $closed={closed}>
            <FooterContainer $closed={closed}>
                <ThemeSwitch closed={closed} />
                {isAuthenticated && (
                    <InvisibleButton onClick={() => logOut()}>
                        <LogOut /> {closed ? null : <Text>Выйти из аккаунта</Text>}
                    </InvisibleButton>
                )}
            </FooterContainer>
        </Layout>
    )
}
const Layout = styled.div<{ $closed: boolean }>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    @media ${device.mobileS} {
        align-items: start;
        gap: 16px;
        margin-bottom: 40px;
        color: ${(props) => props.theme.main};
    }

    @media ${device.tablet} {
        align-items: center;
        ${(props) => (props.$closed ? '' : 'padding: 0px 20px;')};
        gap: 10px;
        margin-bottom: 0;
    }

    @media ${device.laptop} {
        ${(props) => (props.$closed ? '' : 'padding: 0px 40px;')};
        gap: 20px;
    }
`

const FooterContainer = styled.div<{ $closed: boolean }>`
    display: flex;
    ${(props) => (props.$closed ? 'width: 26px;' : 'width: 100%; ')};
    flex-direction: column;
    align-items: start;
    gap: 20px;
    transition: 500ms all;
`
