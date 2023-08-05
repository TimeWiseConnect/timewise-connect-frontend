import React from 'react'
import styled from 'styled-components'
import { Close } from './icons/Close'
import { InvisibleButton } from '../../styles/InvisibleButton'

interface ModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    title: string
    children?: React.ReactNode
    agree: string
    disagree: string
    action: () => void
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
    z-index: 1000;
`

const ModalContent = styled.div`
    position: relative;
    color: ${(props) => props.theme.main};
    background-color: ${(props) => props.theme.form};
    padding: 100px 150px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    align-items: space-between;
    justify-content: center;
    padding: 20px 0px;
`

const Title = styled.h2`
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 50px;
`

const CloseButton = styled(InvisibleButton)`
    position: absolute;
    top: 40px;
    right: 40px;
`
const Buttons = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    gap: 100px;
`

const Button = styled.button`
    width: 194px;
    height: 53px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.accent1};
    background-color: transparent;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.accent3};
        border: 1px solid ${(props) => props.theme.accent3};
    }
`

const AgreeButton = styled(Button)`
    background-color: ${(props) => props.theme.accent1};
`

const DisagreeButton = styled(Button)`
    color: ${(props) => props.theme.main};
`

const Modal: React.FC<ModalProps> = ({ action, title, isOpen, setIsOpen, children, agree, disagree }) => {
    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <ModalOverlay $isOpen={isOpen} onMouseDown={closeModal}>
            <ModalContent onMouseDown={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>
                    <Close />
                </CloseButton>
                <Title>{title}</Title>
                {!!children && <Content>{children}</Content>}
                <Buttons>
                    <DisagreeButton onClick={() => closeModal()}>{disagree}</DisagreeButton>
                    <AgreeButton onClick={() => action()}>{agree}</AgreeButton>
                </Buttons>
            </ModalContent>
        </ModalOverlay>
    )
}

export default Modal
