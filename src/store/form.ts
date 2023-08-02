import { createEvent, createStore } from 'effector'

type Phase = 1 | 2 | 3
type Author = 'parent' | 'child'

export type Form = {
    phase: Phase
    author: Author | undefined
    name?: string
    childName: string | undefined
    disabilty: boolean
    grade: number | undefined
    request: string | undefined
}

const DEFAULT_STORE: Form = {
    phase: 1,
    author: undefined,
    name: undefined,
    childName: undefined,
    disabilty: false,
    grade: undefined,
    request: undefined,
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

export const $formStore = createStore<Form>(DEFAULT_STORE)
    .on(nextPhase, (oldState) => {
        if (oldState.phase !== 3) oldState.phase++
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
