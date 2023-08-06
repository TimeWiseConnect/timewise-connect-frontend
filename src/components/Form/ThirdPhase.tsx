import React from 'react'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { useStore } from 'effector-react'
import { $formStore, nextPhase, prevPhase, setCall, setComment, setMessenger, setPhone, setSms } from '../../store/form'
import { MainText } from '../../styles/fonts/MainText'
import { Arrow } from '../shared/icons/Arrow'
import { FormButton } from '../../styles/FormButton'
import { PhoneInput } from '../shared/PhoneInput'
import { LogInRequest, makeACallFx } from '../../api/auth/logIn'
import { $authStore, setAuthPhone } from '../../store/auth'
import { addEventFx } from '../../api/events/addEvent'

export const ThirdPhase = () => {
    const { connections, phone, request, name, childName, grade, disability, comment, availablePhase, id } =
        useStore($formStore)
    const { currentUser } = useStore($authStore)
    return (
        <Layout>
            <Text>Предпочитаемый способ связи*</Text>
            <OptionList>
                <Option>
                    <Checkbox
                        checked={connections.call}
                        onChange={() => setCall(!connections.call)}
                        type="checkbox"
                        id="call"
                    />
                    <Label htmlFor="call">звонок</Label>
                </Option>
                <Option>
                    <Checkbox
                        checked={connections.sms}
                        onChange={() => setSms(!connections.sms)}
                        type="checkbox"
                        id="sms"
                    />
                    <Label htmlFor="sms">смс</Label>
                </Option>
                <Option>
                    <Checkbox
                        checked={connections.messenger}
                        onChange={() => setMessenger(!connections.messenger)}
                        type="checkbox"
                        id="messenger"
                    />
                    <Label htmlFor="messenger">мессенджер</Label>
                </Option>
            </OptionList>
            <PhoneInput setValue={setPhone} value={phone} placeholder="Ваш номер*" isInForm={true} />
            <TextArea placeholder="Комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
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
                    disabled={availablePhase < 4}
                    onClick={() => {
                        if (currentUser?.id) {
                            if (grade && id)
                                addEventFx({
                                    reqBody: {
                                        phone,
                                        request,
                                        name,
                                        childName,
                                        grade,
                                        disability,
                                        call: connections.call,
                                        sms: connections.sms,
                                        messenger: connections.messenger,
                                        comment,
                                    },
                                    id,
                                })
                            return
                        }
                        const req: LogInRequest = { type: 'LogIn', phone }
                        setAuthPhone(phone)
                        makeACallFx(req)
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
    align-items: start;
`

const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const Text = styled(MainText)`
    margin-bottom: 14px;
`

const Checkbox = styled.input`
    display: flex;
    cursor: pointer;
`

const OptionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
`

const Option = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Label = styled.label`
    cursor: pointer;
    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
    }
    @media ${device.tablet} {
        line-height: 130%;
    }

    @media ${device.laptop} {
        font-size: 16px;
    }
`

const TextArea = styled.textarea`
    resize: none;
    background-color: ${(props) => props.theme.bg};
    border: 1px solid ${(props) => props.theme.lightGray};
    color: ${(props) => props.theme.main};
    border-radius: 8px;
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
        margin-bottom: 5px;
        padding: 17px 20px;
    }

    @media ${device.tablet} {
        font-size: 14px;
        line-height: 130%;
    }

    @media ${device.laptop} {
        padding: 22px 30px;
        font-size: 16px;
        margin-bottom: 10px;
    }
`
