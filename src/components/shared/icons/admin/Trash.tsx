import React from 'react'
import { styled } from 'styled-components'
import { device } from '../../../../styles/const'
import { WhiteStrokePath } from './WhiteStrokePath'

export const Trash = () => (
    <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <WhiteStrokePath d="M2.5 5H4.16667H17.5" strokeLinecap="round" strokeLinejoin="round" />
        <WhiteStrokePath
            d="M15.8337 5.00033V16.667C15.8337 17.109 15.6581 17.5329 15.3455 17.8455C15.0329 18.1581 14.609 18.3337 14.167 18.3337H5.83366C5.39163 18.3337 4.96771 18.1581 4.65515 17.8455C4.34259 17.5329 4.16699 17.109 4.16699 16.667V5.00033M6.66699 5.00033V3.33366C6.66699 2.89163 6.84259 2.46771 7.15515 2.15515C7.46771 1.84259 7.89163 1.66699 8.33366 1.66699H11.667C12.109 1.66699 12.5329 1.84259 12.8455 2.15515C13.1581 2.46771 13.3337 2.89163 13.3337 3.33366V5.00033"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <WhiteStrokePath d="M8.33301 9.16699V14.167" strokeLinecap="round" strokeLinejoin="round" />
        <WhiteStrokePath d="M11.667 9.16699V14.167" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
)

const SVG = styled.svg`
    transition: 300ms all;

    @media ${device.tablet} {
        transform: scale(0.77);
    }

    @media ${device.laptop} {
        transform: scale(1);
    }
`
