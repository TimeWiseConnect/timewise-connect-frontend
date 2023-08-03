import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { $formStore, nextPhase, prevPhase } from '../../store/form'
import { Arrow } from '../shared/icons/Arrow'
import { FormButton } from '../../styles/FormButton'
import { MainText } from '../../styles/fonts/MainText'
import { CodeInput } from '../shared/CodeInput'
import { device } from '../../styles/const'

export const FourthPhase = () => {
    const { availablePhase } = useStore($formStore)
    const [code, setCode] = useState('')

    return (
        <Layout>
            <Text>
                На ваш номер поступит звонок. Введите последние 4 цифры номера, с{'\u00A0'}которого поступает звонок.
            </Text>
            <CodeInput value={code} setValue={setCode} />
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
                    disabled={code.length !== 4}
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Text = styled(MainText)`
    @media ${device.mobileS} {
        margin-bottom: 30px;
    }
    @media ${device.tablet} {
        margin-bottom: 20px;
    }
`

const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
