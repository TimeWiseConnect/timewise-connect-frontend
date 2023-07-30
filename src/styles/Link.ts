import { styled } from 'styled-components'
import { device } from './const'

export const Link = styled.a`
    color: ${(props) => props.theme.link};
    text-decoration: none;

    @media (hover: hover) {
        &:hover {
            color: ${(props) => props.theme.linkHover};
        }

        &:focus {
            outline: ${(props) => props.theme.main} 1px solid;
            border-radius: 3px;
        }
    }

    &:active {
        color: ${(props) => props.theme.accent4};
    }

    body:not(.user-is-tabbing) &:focus {
        outline: none;
    }

    @media ${device.tablet} {
        gap: 10px;
        font-size: 12px;
    }

    @media ${device.laptop} {
        gap: 14px;
        font-size: 14px;
    }
`
