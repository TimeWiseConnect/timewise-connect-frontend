import React, { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router'
import { useStore } from 'effector-react'
import { $userStore } from '../store/userStore'

const AppRouter: FC = () => {
    const { isAuthenticated } = useStore($userStore)
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
