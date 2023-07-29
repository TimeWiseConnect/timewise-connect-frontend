import React from 'react'
import { device } from '../../../../styles/const'
import { styled } from 'styled-components'

export const SideButton = () => (
    <SVG xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
            d="M0 13C0 20.1797 5.8203 26 13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13Z"
            fill="#FFCDD7"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.0289 19.3417C14.3404 19.0925 14.3909 18.638 14.1417 18.3266L10.097 13.2707C9.97038 13.1124 9.97038 12.8875 10.097 12.7293L14.1417 7.67336C14.3909 7.3619 14.3404 6.90741 14.0289 6.65823C13.7175 6.40906 13.263 6.45956 13.0138 6.77103L8.96906 11.8269C8.42042 12.5127 8.42043 13.4872 8.96906 14.173L13.0138 19.2289C13.263 19.5404 13.7175 19.5909 14.0289 19.3417Z"
            fill="#0F1523"
        />
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
