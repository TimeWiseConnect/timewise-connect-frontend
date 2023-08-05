import { useEffect } from 'react'
import { $formStore, Phase, setAvailablePhase } from '../store/form'
import { useStore } from 'effector-react'

export const useWatchForm = () => {
    const { author, name, childName, connections, disability, grade, request, phone } = useStore($formStore)
    useEffect(() => {
        const connectionDefined = Object.values(connections).includes(true)
        let phase: Phase = 1
        if (!!author) phase = 2
        if (name && (author === 'child' || childName) && grade && request) phase = 3
        if (phone?.length === 10 && connectionDefined) phase = 4
        setAvailablePhase(phase)
    }, [author, name, childName, connections, disability, grade, request, phone])
}
