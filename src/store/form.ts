import { createEvent, createStore } from 'effector'

export type Phase = 1 | 2 | 3 | 4 | 5
export type Author = 'parent' | 'child'

export type Form = {
    phase: Phase
    availablePhase: Phase
    author: Author | undefined
    name: string
    childName?: string
    disabilty: boolean
    grade: number | undefined
    request: string
    connections: {
        call: boolean
        sms: boolean
        messenger: boolean
    }
    phone: string
    comment?: string
}

const DEFAULT_STORE: Form = {
    phase: 1,
    availablePhase: 1,
    author: undefined,
    name: '',
    childName: undefined,
    disabilty: false,
    grade: undefined,
    request: '',
    connections: {
        call: false,
        sms: false,
        messenger: false,
    },
    phone: '',
    comment: undefined,
}

export const nextPhase = createEvent()
export const prevPhase = createEvent()
export const setPhase = createEvent<Phase>()
export const setAuthor = createEvent<Author>()
export const setName = createEvent<string>()
export const setChildName = createEvent<string>()
export const setDisability = createEvent<boolean>()
export const setGrade = createEvent<number>()
export const setRequest = createEvent<string>()
export const setCall = createEvent<boolean>()
export const setSms = createEvent<boolean>()
export const setMessenger = createEvent<boolean>()
export const setAvailablePhase = createEvent<Phase>()
export const setPhone = createEvent<string>()
export const setComment = createEvent<string>()
export const setDefault = createEvent()

export const $formStore = createStore<Form>(DEFAULT_STORE)
    .on(nextPhase, (oldState) => {
        if (oldState.phase !== 5) oldState.phase++
        return { ...oldState }
    })
    .on(prevPhase, (oldState) => {
        if (oldState.phase !== 1) oldState.phase--
        return { ...oldState }
    })
    .on(setAuthor, (oldState, author) => ({ ...oldState, author }))
    .on(setPhase, (oldState, phase) => ({ ...oldState, phase }))
    .on(setName, (oldState, name) => ({ ...oldState, name }))
    .on(setChildName, (oldState, childName) => ({ ...oldState, childName }))
    .on(setDisability, (oldState, disabilty) => ({ ...oldState, disabilty }))
    .on(setGrade, (oldState, grade) => ({ ...oldState, grade }))
    .on(setRequest, (oldState, request) => ({ ...oldState, request }))
    .on(setCall, (oldState, call) => ({ ...oldState, connections: { ...oldState.connections, call } }))
    .on(setSms, (oldState, sms) => ({ ...oldState, connections: { ...oldState.connections, sms } }))
    .on(setMessenger, (oldState, messenger) => ({ ...oldState, connections: { ...oldState.connections, messenger } }))
    .on(setAvailablePhase, (oldState, availablePhase) => ({ ...oldState, availablePhase }))
    .on(setPhone, (oldState, phone) => ({ ...oldState, phone }))
    .on(setComment, (oldState, comment) => ({ ...oldState, comment }))
    .on(setDefault, () => DEFAULT_STORE)
