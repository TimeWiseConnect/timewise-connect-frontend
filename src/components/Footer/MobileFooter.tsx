import React from 'react'
import { AnchorCentered, ContactsSection, FooterLayout, MessengersLinks, PhoneLinks } from '../../styles/Footer'
import { WhatsApp } from '../shared/icons/footer/WhatsApp'
import { Telegram } from '../shared/icons/footer/Telegram'
import { Phone } from '../shared/icons/footer/Phone'
import { styled } from 'styled-components'

export const MobileFooter = () => {
    return (
        <FooterLayout>
            <Row>
                <PhoneLinks>
                    <AnchorCentered href="tel:+79012879988" target="_blank">
                        <Phone />
                        +7 (901) 287-99-88
                    </AnchorCentered>
                </PhoneLinks>
                <PhoneLinks>
                    <AnchorCentered href="https://wa.me/79012879988" target="_blank">
                        <WhatsApp />
                        <p>WhatsApp</p>
                    </AnchorCentered>
                </PhoneLinks>
                <PhoneLinks>
                    <AnchorCentered href="https://t.me/mozhem_pogovorit" target="_blank">
                        <Telegram />
                        <p>Telegram</p>
                    </AnchorCentered>
                </PhoneLinks>
            </Row>
            <Row>
                <p>Политика конфиденциальности</p>
                <p>2023 TimeWise Connect</p>
            </Row>
        </FooterLayout>
    )
}

const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
