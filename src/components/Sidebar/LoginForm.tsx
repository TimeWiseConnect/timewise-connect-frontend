import React from 'react'
import { useStore } from 'effector-react'
import { SendCode } from './SendCode'
import { $authStore } from '../../store/auth'
import { ValidateCode } from './ValidateCode'

export const LoginForm = () => {
    const { phase } = useStore($authStore)

    return (
        <>
            {phase === 1 && <SendCode />}
            {phase === 2 && <ValidateCode />}
        </>
    )
}
