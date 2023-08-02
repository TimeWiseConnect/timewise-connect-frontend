import { createEvent, createStore } from 'effector'

type Phase = 1 | 2 | 3
type Author = 'parent' | 'child'

export type Form = {
    phase: Phase
    author: Author | undefined
}

const DEFAULT_STORE: Form = {
    phase: 1,
    author: undefined,
}

export const nextPhase = createEvent()
export const prevPhase = createEvent()
export const setPhase = createEvent<Phase>()
export const setAuthor = createEvent<Author>()

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
