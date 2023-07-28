import React from 'react'
import { styled } from 'styled-components'
import { footerHeight } from '../styles/const'
import { Phone } from './shared/icons/footer/Phone'
import { WhatsApp } from './shared/icons/footer/WhatsApp'
import { Telegram } from './shared/icons/footer/Telegram'

const Footer = () => {
    return (
        <FooterLayout>
            <p>Политика конфиденциальности</p>
            <p>TimeWise Connect 2023</p>
            <ContactsSection>
                <MessengersLinks>
                    <AnchorCentered href="https://wa.me/79012879988" target="_blank">
                        <WhatsApp />
                    </AnchorCentered>
                    <AnchorCentered href="https://t.me/mozhem_pogovorit" target="_blank">
                        <Telegram />
                    </AnchorCentered>
                </MessengersLinks>
                <PhoneLinks>
                    <AnchorCentered href="tel:+79012879988" target="_blank">
                        <Phone />
                    </AnchorCentered>
                    +7 (901) 287-99-88
                </PhoneLinks>
            </ContactsSection>
        </FooterLayout>
    )
}

const FooterLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 100px;
    height: ${footerHeight};
    width: 100%;
    background-color: ${(props) => props.theme.footerBg};
    color: ${(props) => props.theme.footerMain};
    line-height: 130%;
    font-size: 12px;
    transition: 300ms background-color;
`

const ContactsSection = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 40px;
`

const MessengersLinks = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 20px;
`

const PhoneLinks = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;
`
const AnchorCentered = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Footer
