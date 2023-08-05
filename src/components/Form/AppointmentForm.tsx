import { useStore } from 'effector-react'
import React from 'react'
import { styled } from 'styled-components'
import { $formStore, setId, setPhase } from '../../store/form'
import { FirstPhase } from './FirstPhase'
import { SecondPhase } from './SecondPhase'
import { ThirdPhase } from './ThirdPhase'
import { device } from '../../styles/const'
import { ProgressBar } from './ProgressBar'
import { Close } from '../shared/icons/Close'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { $calendarStore, chooseDate } from '../../store/calendar'
import { useWatchForm } from '../../hooks/useWatchForm'
import { FourthPhase } from './FourthPhase'
import { FifthPhase } from './FifthPhase'

export const AppointmentForm = () => {
    const { choosenDate } = useStore($calendarStore)
    const { phase } = useStore($formStore)
    useWatchForm()
    return (
        <Layout>
            <Background />
            <Form>
                <Header>
                    <InvisibleButton
                        onClick={() => {
                            chooseDate(
                                new Date(choosenDate.getFullYear(), choosenDate.getMonth(), choosenDate.getDate()),
                            )
                            setId(null)
                            setPhase(1)
                        }}
                    >
                        <Close />
                    </InvisibleButton>
                </Header>
                <Content>
                    {phase !== 5 && <ProgressBar />}
                    {phase === 1 && <FirstPhase />}
                    {phase === 2 && <SecondPhase />}
                    {phase === 3 && <ThirdPhase />}
                    {phase === 4 && <FourthPhase />}
                    {phase === 5 && <FifthPhase />}
                </Content>
            </Form>
        </Layout>
    )
}

const Form = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.form};
    border: 1px solid ${(props) => props.theme.stroke};
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${device.mobileS} {
        width: 100%;
        margin-top: 30px;
        height: 453px;
    }

    @media ${device.tablet} {
        width: calc(100% / 2);
        height: 458px;
    }

    @media ${device.laptop} {
        width: calc(100% / 5 * 3);
        height: 691px;
    }

    @media ${device.laptopL} {
        width: 100%;
        margin-top: 0;
    }
`

const Background = styled.div`
    @media ${device.tablet} {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.5;
    }

    @media ${device.laptopL} {
        display: none;
    }
`

const Layout = styled.div`
    @media ${device.tablet} {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 5;
    }

    @media ${device.laptopL} {
        width: calc(100% / 7 * 3);
        height: fit-content;
        position: relative;
        display: block;
    }
`

const Content = styled.div`
    width: 100%;
    height: 100%;
    @media ${device.mobileS} {
        padding: 40px 38px 80px 38px;
    }

    @media ${device.tablet} {
        padding: 40px 50px 50px 50px;
    }

    @media ${device.laptop} {
        padding: 60px 122px;
    }
`

const Header = styled.div`
    @media ${device.mobileS} {
        display: none;
    }
    @media ${device.tablet} {
        position: absolute;
        right: 0;
        display: flex;
        justify-content: end;
        padding: 20px;
    }
    @media ${device.laptop} {
        padding: 40px;
    }
`
