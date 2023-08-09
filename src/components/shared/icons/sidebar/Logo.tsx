import React from 'react'
import { SidebarPath } from './SidebarPath'
import { styled } from 'styled-components'
import { device } from '../../../../styles/const'

type Props = {
    closed?: boolean
}

export const Logo = ({ closed }: Props) => (
    <SVG
        $isCollapsed={closed}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="28"
        viewBox="0 0 24 28"
        fill="none"
    >
        <SidebarPath
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.5 14L15.9498 21.0651L22.8666 26.8184L21.755 28L13.8855 21.4543L13.8855 14.7888L7.63622 14.7888C7.51602 16.4703 6.95408 18.1367 5.91441 19.4501C4.7146 20.9658 2.89215 21.9864 0.50001 21.9864L0.500011 20.4088C2.32251 20.4088 3.66104 19.6546 4.56855 18.5082C5.49396 17.3391 5.9831 15.7391 5.98309 14.0986C5.98309 12.4581 5.49396 10.858 4.56855 9.689C3.66104 8.54257 2.3225 7.78838 0.499998 7.78838L0.499998 6.21083C2.89214 6.21083 4.71459 7.23138 5.91441 8.74708C6.91341 10.0091 7.47133 11.5971 7.62009 13.2112L13.8855 13.2112L13.8856 6.54566L21.755 -7.6278e-08L22.8666 1.18158L15.9498 6.93486L23.5 14ZM15.5633 8.79881L15.5633 19.2012L21.1216 14L15.5633 8.79881Z"
        />
    </SVG>
)

type SvgProps = {
    $isCollapsed?: boolean
}

const SVG = styled.svg<SvgProps>`
    transition: 300ms all;

    @media ${device.mobileS} {
        transform: scale(1.16);
    }

    @media ${device.tablet} {
        transform: scale(${(props) => (props.$isCollapsed ? '0.8' : '0.9')});
    }

    @media ${device.laptop} {
        transform: scale(1);
    }
`
