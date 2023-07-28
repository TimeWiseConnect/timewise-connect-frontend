import React, { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router'
import { useStore } from 'effector-react'
import { $isAuth } from '../store/auth'

const AppRouter: FC = () => {
    const { isAuthenticated } = useStore($isAuth)
    return (
        <Routes>
            {isAuthenticated
                ? privateRoutes.map((route) => (
                      <Route path={route.path} element={<route.component />} key={route.path} />
                  ))
                : publicRoutes.map((route) => (
                      <Route path={route.path} element={<route.component />} key={route.path} />
                  ))}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRouter
