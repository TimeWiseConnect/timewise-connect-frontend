import { styled } from 'styled-components'
import { device } from './const'

export const Input = styled.input`
    background-color: ${(props) => props.theme.bg};
    border: 1px solid ${(props) => props.theme.lightGray};
    color: ${(props) => props.theme.main};
    border-radius: 8px;
    width: 100%;
    flex-grow: 1;

    &:focus {
        outline: 1px solid ${(props) => props.theme.accent1};
    }

    &::placeholder {
        color: ${(props) => props.theme.gray};
    }

    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
        margin-bottom: 5px;
        padding: 17px 20px;
    }

    @media ${device.tablet} {
        font-size: 14px;
        line-height: 130%;
    }

    @media ${device.laptop} {
        padding: 22px 30px;
        font-size: 16px;
        margin-bottom: 10px;
    }
`
