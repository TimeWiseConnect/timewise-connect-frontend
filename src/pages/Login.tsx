import React from 'react'
import { createStore, createEvent, sample } from 'effector'
import { useStoreMap } from 'effector-react'
import { styled } from 'styled-components'
import { logInFx, LogInRequest } from '../api/auth/logIn'

const submitted = createEvent()
const setField = createEvent<{ key: string; value: string }>()

const $form = createStore<LogInRequest>({ phone: '', password: '' }).on(setField, (state, { key, value }) => ({
    ...state,
    [key]: value,
}))
sample({
    clock: submitted,
    source: $form,
    target: logInFx,
})

const handleChange = setField.prepend((e: React.ChangeEvent<HTMLInputElement>) => ({
    key: e.target.name,
    value: e.target.value,
}))

type FieldProps = {
    name: string
    type?: string
    label: string
}

const Field: React.FC<FieldProps> = ({ name, type, label }) => {
    const value = useStoreMap({
        store: $form,
        keys: [name],
        fn: (values) => values[name as keyof LogInRequest] || '',
    })
    return (
        <div>
            {label} <input name={name} type={type} value={value} onChange={handleChange} />
        </div>
    )
}
const Login: React.FC = () => {
    return (
        <LoginLayout>
            <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    submitted()
                }}
            >
                <Field name="phone" label="Login" />
                <Field name="password" type="password" label="Password" />
                <button type="submit">Войти</button>
            </form>
        </LoginLayout>
    )
}

const LoginLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    background-color: #161616;
    border-radius: 10%;
`
export default Login
