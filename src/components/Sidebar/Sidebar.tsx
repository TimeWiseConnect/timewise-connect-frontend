import React from 'react'
import { useStore } from 'effector-react'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { $sidebarStore } from '../../store/sidebar'
import { CollapseButton } from './CollapseButton'
import { SidebarHeader } from './SidebarHeader'
import { SidebarFooter } from './SidebarFooter'

const Sidebar = () => {
    const collapsed = useStore($sidebarStore).closed === 'closed'
    return (
        <SidebarLayout $isCollapsed={collapsed}>
            <CollapseButton />
            <SidebarHeader />
            <SidebarFooter />
        </SidebarLayout>
    )
}

type SidebarProps = {
    $isCollapsed: boolean
}

const animationSpeed = '500ms'

const SidebarLayout = styled.div<SidebarProps>`
    z-index: 1000;
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
    height: 100vh;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.main};
    border-left: 1px solid ${(props) => props.theme.lightGray};
    padding: 20px 0px 60px 0px;
    transition:
        ${animationSpeed} all,
        300ms background-color;

    @media ${device.tablet} {
        width: ${(props) => (props.$isCollapsed ? '60px' : '180px')};
    }

    @media ${device.laptop} {
        width: ${(props) => (props.$isCollapsed ? '75px' : '328px')};
    }
`

export default Sidebar
