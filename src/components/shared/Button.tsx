import React from 'react'
import { styled } from 'styled-components'

type Props = {
    onClick: () => void
    children: React.ReactNode
}

const Button: React.FC<Props> = ({ onClick, children }) => {
    return <ButtonLayout onClick={onClick}>{children}</ButtonLayout>
}

const ButtonLayout = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.main};
    border: none;
`

export default Button
