import { styled } from 'styled-components'

export const AlwaysBlackFillPath = styled.path`
    fill: ${(props) => props.theme.alwaysBlack};
    transition: 300ms fill;
`
