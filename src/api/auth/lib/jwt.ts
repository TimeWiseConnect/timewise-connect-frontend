export const getJwtToken = () => {
    return localStorage.getItem('auth')
}

export const setJwtToken = (token: string) => {
    return localStorage.setItem('auth', token)
}
