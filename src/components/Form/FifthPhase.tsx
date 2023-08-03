import { useStore } from 'effector-react'
import React from 'react'
import { $calendarStore, chooseDate } from '../../store/calendar'
import { formatDateWord, getTimeFromDate } from '../../utils/dateTimeUtils'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { $formStore, nextPhase, setAuthor, setDefault, setPhase } from '../../store/form'
import { CheckButton } from '../shared/CheckButton'
import { Arrow } from '../shared/icons/Arrow'
import { FormButton } from '../../styles/FormButton'
import { MainText } from '../../styles/fonts/MainText'

export const FifthPhase = () => {
    const { choosenDate } = useStore($calendarStore)
    const { author, availablePhase } = useStore($formStore)

    return (
        <Layout>
            <Header>Вы успешно записались!</Header>
            <Text>
                В ближайшее время с вами свяжется специалист для подтверждения данных и уточнения вашего запроса.
            </Text>
            <Button
                onClick={() => {
                    chooseDate(new Date(choosenDate.getFullYear(), choosenDate.getMonth(), choosenDate.getDate()))
                    setDefault()
                }}
            >
                Хорошо
            </Button>
        </Layout>
    )
}

const Layout = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Header = styled.h2`
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 40px;
    text-align: center;
`

const Button = styled(FormButton)`
    align-self: center;

    @media ${device.mobileS} {
        padding: 10px 31.5px;
    }

    @media ${device.tablet} {
        padding: 10px 41px;
    }

    @media ${device.laptop} {
        padding: 17px 65.5px;
    }
`

const Text = styled(MainText)`
    text-align: center;
`
