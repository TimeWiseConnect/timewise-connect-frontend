import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { getRoleFx } from '../api/roles/getRoles'
import { $userStore } from '../store/userStore'
import { fetchEventsFx } from '../api/events/fetchEvents'

export const useRole = () => {
    const { isAuthenticated } = useStore($userStore)

    useEffect(() => {
        if (isAuthenticated) {
            getRoleFx()
            fetchEventsFx()
        }
    }, [isAuthenticated])
}
