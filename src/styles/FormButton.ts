import { styled } from 'styled-components'
import { device } from './const'

export const FormButton = styled.button`
    cursor: pointer;
    align-self: end;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.accent1};
    border: none;
    border-radius: 5.333px;
    color: ${(props) => props.theme.buttonText};

    &:disabled {
        background-color: ${(props) => props.theme.buttonDisable};
        cursor: default;
    }

    @media ${device.mobileS} {
        padding: 10px;
        margin-top: 30px;
        gap: 30px;
        font-size: 12px;
        line-height: 140%;
    }

    @media ${device.tablet} {
        padding: 10px 15px;
        margin-top: 20px;
        gap: 33px;
        font-size: 14px;
        line-height: normal;
    }

    @media ${device.laptop} {
        padding: 17px 30px;
        margin-top: 60px;
        gap: 38px;
        font-size: 16px;
    }
`
