import { useEffect } from 'react'

const handleTab = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
        document.body.classList.add('user-is-tabbing')
        window.removeEventListener('keydown', handleTab)
    }
}

const handleClick = () => {
    document.body.classList.remove('user-is-tabbing')
    window.addEventListener('keydown', handleTab)
}

const useRemoveFocusWhenNotTab = () => {
    useEffect(() => {
        window.addEventListener('keydown', handleTab)
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('keydown', handleTab)
            window.removeEventListener('click', handleClick)
        }
    })

    return null
}

export default useRemoveFocusWhenNotTab
