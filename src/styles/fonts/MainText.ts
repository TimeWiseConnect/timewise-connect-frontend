import { styled } from 'styled-components'
import { device } from '../const'

export const MainText = styled.p`
    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
    }
    @media ${device.tablet} {
        font-size: 14px;
        line-height: 130%;
    }
    @media ${device.laptop} {
        font-size: 16px;
    }
`
