import { styled } from 'styled-components'
import { device } from './const'

export const Text = styled.p`
    color: ${(props) => props.theme.main};
    line-height: 130%;
    white-space: nowrap;

    @media ${device.tablet} {
        font-size: 12px;
    }

    @media ${device.laptop} {
        font-size: 16px;
    }
`
