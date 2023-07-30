import { Calendar } from '../pages/Calendar'

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
        component: Calendar,
    },
]

export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.MAIN,
        component: Calendar,
    },
]
