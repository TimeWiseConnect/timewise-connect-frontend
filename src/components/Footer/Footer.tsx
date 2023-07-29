import React from 'react'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { Phone } from '../shared/icons/footer/Phone'
import { WhatsApp } from '../shared/icons/footer/WhatsApp'
import { Telegram } from '../shared/icons/footer/Telegram'
import { AnchorCentered, ContactsSection, FooterLayout, MessengersLinks, PhoneLinks } from '../../styles/Footer'

export const Footer = () => {
    return (
        <FooterLayout>
            <p>Политика конфиденциальности</p>
            <p>2023 TimeWise Connect</p>
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
