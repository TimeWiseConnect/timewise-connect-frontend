import React from 'react'
import { styled } from 'styled-components'
import { Navbar } from './Navbar'
import { LogIn } from './LogIn'
import { useStore } from 'effector-react'
import { $sidebarStore } from '../../store/sidebar'

const Mobile = () => {
    const collapsed = useStore($sidebarStore).closed === 'closed'

    return (
        <Layout $isCollapsed={collapsed}>
            <Navbar />
            {!collapsed ? <LogIn /> : null}
        </Layout>
    )
}

type StyledProps = {
    $isCollapsed: boolean
}

const Layout = styled.div<StyledProps>`
    ${(props) => (props.$isCollapsed ? '' : 'position: absolute;')}

    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: 100%;
    ${(props) => (props.$isCollapsed ? '' : 'height: 100%;')}
    background-color: ${(props) => (props.$isCollapsed ? props.theme.bg : props.theme.mobileBg)};
`

export default Mobile
