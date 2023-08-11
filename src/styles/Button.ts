import { styled } from 'styled-components'
import { device } from './const'

export const Button = styled.button`
    border-radius: 5.333px;
    background-color: ${(props) => props.theme.accent1};
    color: ${(props) => props.theme.buttonText};
    border: none;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    margin-top: 10px;

    @media (hover: hover) {
        &:focus {
            background-color: ${(props) => props.theme.accent3};
            outline: none;
        }

        &:hover {
            background-color: ${(props) => props.theme.accent3};
        }
    }

    &:active {
        background-color: ${(props) => props.theme.accent4};
    }

    &:disabled {
        background-color: ${(props) => props.theme.buttonDisable};
        cursor: default;
    }

    @media ${device.mobileS} {
        font-size: 14px;
        padding: 16px 0px;
    }

    @media ${device.tablet} {
        padding: 10px 0px;
    }

    @media ${device.laptop} {
        padding: 18px 0px;
        font-size: 16px;
    }
`
