import CalendarPage from '../pages/Calendar'
import Login from '../pages/Login'
import Registration from '../pages/Registration'

export interface IRoute {
    path: string
    component: React.ComponentType
}

export enum RouteNames {
    MAIN = '/',
    LOGIN = '/login',
    REGISTRATION = '/reg',
}

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.MAIN,
        component: CalendarPage,
    },
    {
        path: RouteNames.LOGIN,
        component: Login,
    },
    {
        path: RouteNames.REGISTRATION,
        component: Registration,
    },
]

export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.MAIN,
        component: CalendarPage,
    },
]
