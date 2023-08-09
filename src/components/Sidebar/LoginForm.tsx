import React from 'react'
import { useStore } from 'effector-react'
import { SendCode } from './SendCode'
import { ValidateCode } from './ValidateCode'
import { $sidebarStore } from '../../store/sidebar'
import { styled } from 'styled-components'
import { $userStore } from '../../store/userStore'

export const LoginForm = () => {
    const { phase } = useStore($userStore)
    const collapsed = useStore($sidebarStore).closed === 'closed'

    return (
        <Layout $isCollapsed={collapsed}>
            {phase === 1 && <SendCode />}
            {phase === 2 && <ValidateCode />}
        </Layout>
    )
}

const Layout = styled.div<{
    $isCollapsed: boolean
}>`
    opacity: ${(props) => (props.$isCollapsed ? '0' : '1')};
    ${(props) => (props.$isCollapsed ? 'user-select: none;' : '')};
`
