import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Navbar } from './Navbar'
import { LogIn } from './LogIn'

const Mobile = () => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <Layout $isCollapsed={isCollapsed}>
            <Navbar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
            {!isCollapsed ? <LogIn /> : null}
        </Layout>
    )
}

type StyledProps = {
    $isCollapsed: boolean
}

const Layout = styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.$isCollapsed ? props.theme.bg : props.theme.mobileBg)};
`

export default Mobile
