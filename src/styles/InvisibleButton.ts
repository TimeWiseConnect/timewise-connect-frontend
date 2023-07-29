import { styled } from 'styled-components'
import { device } from './const'
import { Text } from './Text'
import { SidebarPath } from '../components/shared/icons/sidebar/SidebarPath'

export const InvisibleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.main};
    line-height: 130%;
    margin: 1px;

    ${Text}, ${SidebarPath} {
        color: ${(props) => props.theme.main};
        fill: ${(props) => props.theme.main};
    }

    &:focus {
        outline: ${(props) => props.theme.main} 1px solid;
        border-radius: 3px;
    }
    &:focus ${Text}, &:focus ${SidebarPath} {
        color: ${(props) => props.theme.accent1};
        fill: ${(props) => props.theme.accent1};
    }

    &:hover,
    &:hover ${Text},&:hover ${SidebarPath} {
        color: ${(props) => props.theme.accent1};
        fill: ${(props) => props.theme.accent1};
    }

    &:active,
    &:active ${SidebarPath},&:active ${Text} {
        color: ${(props) => props.theme.accent3};
        fill: ${(props) => props.theme.accent3};
    }

    &:disabled {
        color: ${(props) => props.theme.main};
    }

    body:not(.user-is-tabbing) &:focus {
        outline: none;
    }

    @media ${device.mobileS} {
        gap: 10px;
        font-size: 14px;
    }

    @media ${device.laptop} {
        gap: 14px;
        font-size: 16px;
    }
`
