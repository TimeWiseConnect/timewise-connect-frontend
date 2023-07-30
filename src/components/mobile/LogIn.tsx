import React, { useState } from 'react'
import { styled } from 'styled-components'
import { PhoneInput } from '../shared/PhoneInput'
import { Link } from '../../styles/Link'
import { Button } from '../../styles/Button'
import ThemeSwitch from '../shared/ThemeSwitch'
import { MobileFooter } from '../Footer/MobileFooter'

export const LogIn = () => {
    const [phone, setPhone] = useState('')
    return (
        <Layout>
            <SideBar>
                <HeadWrap
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault()
                        // submitted()
                    }}
                >
                    <Header>Войти</Header>
                    <Label>Телефон</Label>
                    <PhoneInput value={phone} setValue={setPhone} />
                    <Text>
                        Нет аккаунта?{' '}
                        <Link
                            href="/"
                            onClick={(event) => {
                                event.preventDefault()
                            }}
                        >
                            Зарегистрируйтесь
                        </Link>
                    </Text>
                    <Button
                        type="submit"
                        onClick={(event) => {
                            event.currentTarget.blur()
                        }}
                    >
                        Отправить СМС
                    </Button>
                </HeadWrap>
                <FootWrap>
                    <ThemeSwitch isCollapsed={false} />
                </FootWrap>
            </SideBar>

            <MobileFooter />
        </Layout>
    )
}

const Layout = styled.div`
    z-index: 100;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.main};
    background-color: ${(props) => props.theme.mobileBg};
`
const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0px 16px;
`

const HeadWrap = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${(props) => props.theme.main};
`

const FootWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 40px;
    color: ${(props) => props.theme.main};
`

const Header = styled.h1`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 40px;
`

const Text = styled.p`
    font-size: 12px;
    margin-bottom: 20px;
`

const Label = styled.label`
    font-size: 12px;
    color: ${(props) => props.theme.gray};
    margin-bottom: 5px;
`
