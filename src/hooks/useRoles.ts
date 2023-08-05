import { useStore } from 'effector-react'
import { $authStore } from '../store/auth'
import { useEffect } from 'react'
import { getRoleFx } from '../api/roles/getRoles'

export const useRole = () => {
    const { isAuthenticated } = useStore($authStore)

    useEffect(() => {
        if (isAuthenticated) {
            getRoleFx()
        }
    }, [isAuthenticated])
}
