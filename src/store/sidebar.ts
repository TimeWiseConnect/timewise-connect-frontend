import { createEvent, createStore } from 'effector'

export type SidebarStatus = 'closed' | 'open'

const DEFAULT_STORE: SidebarStatus = 'closed'

export const changeSidebarStatus = createEvent<SidebarStatus>()

export const $sidebarStore = createStore<SidebarStatus>(DEFAULT_STORE).on(
    changeSidebarStatus,
    (_, newState) => newState,
)
