import React from 'react'
import { FooterPath } from './FooterPath'
import { device } from '../../../../styles/const'
import { styled } from 'styled-components'

export const Telegram = () => (
    <SVG width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="iconmonstr-telegram-4 (1) 2" clipPath="url(#clip0_925_3332)">
            <FooterPath
                id="telegram-4"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 0C4.92617 0 0 4.92433 0 11C0 17.0748 4.92617 22 11 22C17.0748 22 22 17.0748 22 11C22 4.92433 17.0748 0 11 0ZM13.9553 16.3818C14.1277 16.5037 14.3495 16.5339 14.5475 16.4597C14.7446 16.3845 14.8903 16.2149 14.9343 16.0096C15.3991 13.8261 16.5266 8.29858 16.9492 6.31308C16.9813 6.16275 16.9281 6.00692 16.8108 5.907C16.6925 5.80708 16.5293 5.77867 16.3845 5.83183C14.1423 6.66233 7.23708 9.25283 4.41467 10.2969C4.23592 10.3638 4.1195 10.5352 4.125 10.725C4.13142 10.9138 4.25883 11.0779 4.44217 11.1329C5.70808 11.5115 7.36908 12.0386 7.36908 12.0386C7.36908 12.0386 8.1455 14.3834 8.54975 15.5751C8.60108 15.7254 8.71842 15.8427 8.87242 15.8831C9.02733 15.9234 9.19142 15.8812 9.30692 15.7722C9.95683 15.1589 10.9615 14.2102 10.9615 14.2102C10.9615 14.2102 12.8718 15.6099 13.9553 16.3818ZM8.06758 11.7416L8.96592 14.7033L9.16575 12.8278C9.16575 12.8278 12.6335 9.69925 14.6117 7.91633C14.6694 7.86408 14.6768 7.77608 14.6291 7.71467C14.5814 7.65325 14.4934 7.63858 14.4283 7.68075C12.1367 9.14375 8.06758 11.7416 8.06758 11.7416Z"
            />
        </g>
        <defs>
            <clipPath id="clip0_925_3332">
                <rect width="22" height="22" fill="white" />
            </clipPath>
        </defs>
    </SVG>
)

const SVG = styled.svg`
    transition: 300ms all;

    @media ${device.mobileS} {
        transform: scale(1);
    }

    @media ${device.tablet} {
        transform: scale(0.82);
    }

    @media ${device.laptop} {
        transform: scale(1);
    }
`
