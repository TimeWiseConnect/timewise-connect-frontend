import React from 'react'
import { styled } from 'styled-components'
import { device } from '../../../styles/const'

export const Arrow = ({ reversed }: { reversed?: boolean }) => (
    <SVG
        $reversed={!!reversed}
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="15"
        viewBox="0 0 36 15"
        fill="none"
    >
        <path
            d="M1 7.5H35M35 7.5L26.8312 0.5M35 7.5L26.8312 14.5"
            stroke="#181C26"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </SVG>
)

const SVG = styled.svg<{ $reversed: boolean }>`
    transition: 300ms all;

    ${(props) => (props.$reversed ? 'rotate: 180deg;' : '')}

    @media ${device.mobileS} {
        transform: scale(0.38);
    }

    @media ${device.tablet} {
        transform: scale(0.58);
    }

    @media ${device.laptop} {
        transform: scale(1);
    }
`
