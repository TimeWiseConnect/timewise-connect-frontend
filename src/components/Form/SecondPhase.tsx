import React from 'react'
import { styled } from 'styled-components'
import {
    $formStore,
    nextPhase,
    prevPhase,
    setChildName,
    setDisability,
    setGrade,
    setName,
    setRequest,
} from '../../store/form'
import { Arrow } from '../shared/icons/Arrow'
import { FormButton } from '../../styles/FormButton'
import { Tooltip } from '../shared/icons/Tooltip'
import { useStore } from 'effector-react'
import { device } from '../../styles/const'

export const SecondPhase = () => {
    const { name, childName, disabilty, grade, request } = useStore($formStore)

    return (
        <Layout>
            <Input value={name} placeholder="Ваше имя*" onChange={(e) => setName(e.target.value)} />
            <Input value={childName} placeholder="Имя обучающегося*" onChange={(e) => setChildName(e.target.value)} />
            <Grade>
                <Input value={grade} placeholder="Класс*" onChange={(e) => setGrade(Number(e.target.value))} />
                <Disabilty>
                    <Checkbox
                        checked={disabilty}
                        onChange={(e) => setDisability(!!e.target.value)}
                        type="checkbox"
                        id="disability"
                    />
                    <Label htmlFor="disability">ОВЗ</Label>
                </Disabilty>
                <Help>
                    <Tooltip />
                </Help>
            </Grade>
            <Input value={request} placeholder="Ваш запрос*" onChange={(e) => setRequest(e.target.value)} />
            <Buttons>
                <FormButton
                    onClick={() => {
                        prevPhase()
                    }}
                >
                    <Arrow reversed={true} />
                    Назад
                </FormButton>
                <FormButton
                    onClick={() => {
                        nextPhase()
                    }}
                >
                    Дальше
                    <Arrow />
                </FormButton>
            </Buttons>
        </Layout>
    )
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Input = styled.input`
    background-color: ${(props) => props.theme.bg};
    border: 1px solid ${(props) => props.theme.lightGray};
    padding: 17px 20px;
    color: ${(props) => props.theme.main};
    border-radius: 8px;
    margin-bottom: 5px;
    width: 100%;
    flex-grow: 1;

    &:focus {
        outline: 1px solid ${(props) => props.theme.accent1};
    }

    &::placeholder {
        color: ${(props) => props.theme.gray};
    }

    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
    }

    @media ${device.tablet} {
        font-size: 14px;
        line-height: 130%;
    }

    @media ${device.laptop} {
        font-size: 16px;
    }
`

const Grade = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
    align-items: center;
`

const Disabilty = styled.div`
    display: flex;
    gap: 5px;
    margin-left: 20px;
    margin-right: 14px;
    align-items: center;
`
const Checkbox = styled.input``

const Label = styled.label`
    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
    }
    @media ${device.tablet} {
        line-height: 130%;
    }

    @media ${device.laptop} {
        font-size: 14px;
    }
`

const Help = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
`

const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
