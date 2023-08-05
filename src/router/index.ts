import { Main } from '../pages/Main'

export interface IRoute {
    path: string
    component: React.ComponentType
}

export enum RouteNames {
    MAIN = '/',
}

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.MAIN,
        component: Main,
    },
]

export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.MAIN,
        component: Main,
    },
]
