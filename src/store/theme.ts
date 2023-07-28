import { createEvent, createStore } from 'effector'

export type theme = 'light' | 'dark'

const DEFAULT_STORE: theme = (localStorage.getItem('theme') as theme) || 'light'

export const changeTheme = createEvent<theme>()

export const $themeStore = createStore<theme>(DEFAULT_STORE).on(changeTheme, (_, newState) => newState)

$themeStore.watch((state) => {
    localStorage.setItem('theme', state)
})
