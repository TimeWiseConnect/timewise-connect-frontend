import { useStore } from 'effector-react'
import React from 'react'
import { styled } from 'styled-components'
import { $sidebarStore } from '../../store/sidebar'
import { device } from '../../styles/const'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { Settings } from '../shared/icons/sidebar/Settings'
import { $userStore } from '../../store/userStore'

export const Account = () => {
    const { currentUser, role } = useStore($userStore)
    const collapsed = useStore($sidebarStore).closed === 'closed'

    return (
        <Layout>
            <Header $collapsed={collapsed}>
                <User>
                    <Avatar $collapsed={collapsed} $admin={role === 'ADMIN'}></Avatar>
                    {!collapsed && <Name>{currentUser?.name}</Name>}
                </User>
                {!collapsed && (
                    <InvisibleButton onClick={(e) => e.currentTarget.blur()}>
                        <Settings />
                    </InvisibleButton>
                )}
            </Header>
        </Layout>
    )
}

const Layout = styled.div`
    width: 100%;
    margin-bottom: 2px;
`

type Props = {
    $collapsed: boolean
    $admin?: boolean
}

const Header = styled.div<Props>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$collapsed ? 'center' : 'space-between')};
`

const Avatar = styled.div<Props>`
    border-radius: 50%;
    background-color: ${(props) => props.theme.main};
    ${(props) => (props.$admin ? `outline: 2px solid ${props.theme.accent2};` : '')}

    @media ${device.mobileS} {
        width: 50px;
        height: 50px;
    }

    @media ${device.tablet} {
        width: 40px;
        height: 40px;
    }

    @media ${device.laptop} {
        width: 60px;
        height: 60px;
    }
`

const Name = styled.div`
    @media ${device.mobileS} {
        font-size: 20px;
    }

    @media ${device.tablet} {
        font-size: 16px;
    }

    @media ${device.laptop} {
        font-size: 20px;
    }
`

const User = styled.div`
    display: flex;
    align-items: center;
    @media ${device.mobileS} {
        gap: 20px;
    }

    @media ${device.tablet} {
        gap: 10px;
    }

    @media ${device.laptop} {
        gap: 20px;
    }
`
