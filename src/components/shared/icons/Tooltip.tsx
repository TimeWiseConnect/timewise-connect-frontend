import React from 'react'
import { styled } from 'styled-components'
import { device } from '../../../styles/const'

export const Tooltip = () => (
    <SVG xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" stroke="#9596A6" />
        <path
            d="M8.5795 3.60254L8.49427 9.87527H7.50564L7.42041 3.60254H8.5795ZM7.99996 12.398C7.78973 12.398 7.60933 12.3227 7.45876 12.1721C7.30819 12.0216 7.23291 11.8412 7.23291 11.6309C7.23291 11.4207 7.30819 11.2403 7.45876 11.0898C7.60933 10.9392 7.78973 10.8639 7.99996 10.8639C8.21018 10.8639 8.39058 10.9392 8.54115 11.0898C8.69172 11.2403 8.767 11.4207 8.767 11.6309C8.767 11.7702 8.73149 11.898 8.66047 12.0145C8.59229 12.1309 8.49996 12.2247 8.38348 12.2957C8.26984 12.3639 8.142 12.398 7.99996 12.398Z"
            fill="#9596A6"
        />
    </SVG>
)

const SVG = styled.svg`
    transition: 300ms all;

    @media ${device.mobileS} {
        transform: scale(1);
    }

    @media ${device.tablet} {
        transform: scale(0.875);
    }

    @media ${device.laptop} {
        transform: scale(1);
    }
`
