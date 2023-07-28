import React, { useState } from 'react'
import styled from 'styled-components'
import { Divider } from './Divider'

interface ModalProps {
    title: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    children: React.ReactNode
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
`

const ModalContent = styled.div`
    color: black;
    min-width: 30em;
    min-height: 30em;
    background-color: white;
    padding: 20px;
    border-radius: 4px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    color: black;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    justify-content: space-between;
    padding: 20px;
    color: black;
`

const Modal: React.FC<ModalProps> = ({ title, isOpen, setIsOpen, children }) => {
    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <ModalOverlay $isOpen={isOpen} onMouseDown={closeModal}>
                <ModalContent onMouseDown={(e) => e.stopPropagation()}>
                    <Header>
                        <h2>{title}</h2>
                        <button onClick={closeModal}>Close</button>
                    </Header>
                    <Divider />
                    <Content>{children}</Content>
                </ModalContent>
            </ModalOverlay>
        </>
    )
}

export default Modal
