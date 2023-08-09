import React from 'react'
import { SideButton } from '../shared/icons/sidebar/SideButton'
import { useStore } from 'effector-react'
import { $sidebarStore, changeSidebarStatus } from '../../store/sidebar'
import { styled } from 'styled-components'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { device } from '../../styles/const'
import { AlwaysAccentFillPath } from '../shared/paths/AlwaysAccentFillPath'

export const CollapseButton = () => {
    const closed = useStore($sidebarStore).closed === 'closed'

    return (
        <Button
            $closed={closed}
            onClick={(event) => {
                changeSidebarStatus(closed ? 'open' : 'closed')
                if (!document.body.classList.contains('user-is-tabbing')) event.currentTarget.blur()
            }}
        >
            <SideButton />
        </Button>
    )
}

const Button = styled(InvisibleButton)<{ $closed: boolean }>`
    position: absolute;
    ${(props) => (props.$closed ? '' : 'rotate: 180deg;')}

    transition:
        500ms right,
        500ms rotate,
        300ms color;

    @media ${device.tablet} {
        right: calc(${(props) => (props.$closed ? '60px' : '180px')} - 13px);
    }

    @media ${device.laptop} {
        right: calc(${(props) => (props.$closed ? '75px' : '328px')} - 13px);
    }

    @media (hover: hover) {
        &:hover > * > ${AlwaysAccentFillPath}, &:focus > * > ${AlwaysAccentFillPath} {
            fill: ${(props) => props.theme.accent3};
        }

        &:focus {
            outline: none;
        }
    }
`
