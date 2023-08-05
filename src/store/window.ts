import { createEvent, createStore } from 'effector'

export type WindowStatus = 'management' | 'appointments'

const DEFAULT_STORE: WindowStatus = 'management'

export const setWindow = createEvent<WindowStatus>()

export const $windowStore = createStore<WindowStatus>(DEFAULT_STORE).on(setWindow, (_, newState) => newState)
