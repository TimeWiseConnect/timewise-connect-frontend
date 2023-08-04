import { useStore } from 'effector-react'
import React from 'react'
import { styled } from 'styled-components'
import { $authStore } from '../../store/auth'
import { $sidebarStore } from '../../store/sidebar'
import { device } from '../../styles/const'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { Settings } from '../shared/icons/sidebar/Settings'

export const Account = () => {
    const { currentUser } = useStore($authStore)
    const collapsed = useStore($sidebarStore) === 'closed'

    return (
        <Layout>
            <Header $collapsed={collapsed}>
                <User>
                    <Avatar></Avatar>
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
`

type Props = {
    $collapsed: boolean
}

const Header = styled.div<Props>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$collapsed ? 'center' : 'space-between')};
`

const Avatar = styled.div`
    border-radius: 50%;
    background-color: ${(props) => props.theme.main};

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
