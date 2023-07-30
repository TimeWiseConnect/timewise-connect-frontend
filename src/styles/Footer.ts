import { styled } from 'styled-components'
import { device } from './const'

export const FooterLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: ${(props) => props.theme.footerMain};
    line-height: 130%;
    transition: 300ms background-color;
    z-index: 5;

    @media ${device.mobileS} {
        flex-direction: column;
        background-color: ${(props) => props.theme.mobileFooter};
        font-size: 10px;
        padding: 16px 20px;
        gap: 16px;
    }

    @media ${device.mobileM} {
        font-size: 11px;
    }

    @media ${device.tablet} {
        flex-direction: row;
        background-color: ${(props) => props.theme.footerBg};
        padding: 0px 75px;
        min-height: 33px;
        display: flex;
    }

    @media ${device.laptop} {
        font-size: 12px;
        min-height: 36px;
        padding: 0px 30px;
    }

    @media ${device.laptopL} {
        min-height: 40px;
        padding: 0px 100px;
    }

    @media ${device.desktop} {
        min-height: 40px;
        padding: 0px 328px;
    }
`

export const ContactsSection = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

    @media ${device.tablet} {
        gap: 20px;
    }

    @media ${device.laptopL} {
        gap: 40px;
    }
`

export const MessengersLinks = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

    @media ${device.tablet} {
        gap: 10px;
    }

    @media ${device.laptop} {
        gap: 20px;
    }
`

export const PhoneLinks = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;
`
export const AnchorCentered = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    gap: 5px;
    color: ${(props) => props.theme.footerMain};
`
