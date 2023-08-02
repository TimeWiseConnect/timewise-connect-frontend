import React from 'react'
import { AccentPath } from './AccentPath'
import { device } from '../../../styles/const'
import { styled } from 'styled-components'

export const Close = () => (
    <SVG xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <AccentPath d="M1 1L12.5 12.5M24 24L12.5 12.5M12.5 12.5L24 1L1 24" strokeWidth="2" />
    </SVG>
)

const SVG = styled.svg`
    transition: 300ms all;

    @media ${device.tablet} {
        transform: scale(0.7);
    }

    @media ${device.laptop} {
        transform: scale(1);
    }
`
