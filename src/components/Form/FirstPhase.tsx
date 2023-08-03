import { useStore } from 'effector-react'
import React from 'react'
import { $calendarStore } from '../../store/calendar'
import { formatDateWord, getTimeFromDate } from '../../utils/dateTimeUtils'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { $formStore, nextPhase, setAuthor } from '../../store/form'
import { CheckButton } from '../shared/CheckButton'
import { Arrow } from '../shared/icons/Arrow'
import { FormButton } from '../../styles/FormButton'

export const FirstPhase = () => {
    const { choosenDate } = useStore($calendarStore)
    const { author, availablePhase } = useStore($formStore)

    return (
        <Layout>
            <Header>
                Запись на {formatDateWord(choosenDate)} {getTimeFromDate(choosenDate)}
            </Header>
            <Question>Кто заполняет форму?</Question>
            <Label $checked={author === 'parent'} htmlFor="parent">
                Родитель
                <SwitchButton
                    onChange={() => setAuthor('parent')}
                    id="parent"
                    type="radio"
                    checked={author === 'parent'}
                />
                <CheckButton checked={author === 'parent'} />
            </Label>
            <Label $checked={author === 'child'} htmlFor="child">
                Обучающийся
                <SwitchButton
                    onChange={() => setAuthor('child')}
                    id="child"
                    type="radio"
                    checked={author === 'child'}
                />
                <CheckButton checked={author === 'child'} />
            </Label>
            <FormButton
                disabled={availablePhase < 2}
                onClick={() => {
                    nextPhase()
                }}
            >
                Дальше
                <Arrow />
            </FormButton>
        </Layout>
    )
}

type Props = {
    $checked: boolean
}

const Header = styled.h2`
    font-weight: 400;

    @media ${device.mobileS} {
        margin-bottom: 30px;
        font-size: 16px;
    }

    @media ${device.tablet} {
        margin-bottom: 40px;
        font-size: 18px;
    }

    @media ${device.laptop} {
        font-size: 22px;
    }
`

const Question = styled.h3`
    font-weight: 400;

    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
        margin-bottom: 21.5px;
    }

    @media ${device.tablet} {
        font-size: 14px;
        line-height: 130%;
        margin-bottom: 20px;
    }

    @media ${device.laptop} {
        font-size: 16px;
    }
`

const Layout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SwitchButton = styled.input`
    visibility: hidden;
    height: 0;
    width: 0;
`
const Label = styled.label<Props>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    padding: 17px 20px;
    cursor: pointer;
    background-color: ${(props) => props.theme.bg};
    border: 1px solid ${(props) => props.theme.lightGray};

    &:hover,
    &:hover > * {
        border: 1px solid ${(props) => props.theme.accent1};
    }

    ${(props) => (props.$checked ? `border: 1px solid ${props.theme.accent1};` : ``)}

    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
        margin-bottom: 4px;
    }

    @media ${device.tablet} {
        font-size: 14px;
        line-height: 130%;
        margin-bottom: 5px;
    }

    @media ${device.laptop} {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 130%;
    }

    &:checked {
        border: 1px solid red;
        font-size: 16px;
    }
`
