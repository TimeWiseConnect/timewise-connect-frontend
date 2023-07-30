import React from 'react'
import { ThemeProvider } from 'styled-components'
import { $themeStore } from '../store/theme'
import { useStore } from 'effector-react'

type ColorTheme = {
    bg: string
    main: string
    contrast: string
    lightGray: string
    gray: string
    darkGray: string
    accent1: string
    accentHover: string
    accent2: string
    accent3: string
    accent4: string
    footerBg: string
    footerMain: string
    disable: string
    form: string
    link: string
    linkHover: string
    danger: string
    focus: string

    buttonText: string
    buttonOutlineText: string
    buttonReset: string
    error: string
    stroke: string

    mobileFooter: string
    mobileBg: string
}

type Props = {
    children: React.ReactNode
}

export const Theme = ({ children }: Props) => {
    const theme = useStore($themeStore)
    const colors: ColorTheme =
        theme === 'light'
            ? {
                  bg: '#FFFFFF',
                  main: '#0F1523',
                  contrast: '#181C26',
                  lightGray: '#D1D5DB',
                  gray: '#9596A6',
                  darkGray: '#3A3C45',
                  accent1: '#FFCDD7',
                  accentHover: '#FFF0F3',
                  accent2: '#5EC1E8',
                  accent3: '#BF7281',
                  accent4: '#B6465B',
                  footerBg: '#3A3C45',
                  footerMain: '#D1D5DB ',
                  disable: '#E8EAEE',
                  form: '#F7F8FA',
                  link: '#BF7281',
                  linkHover: '#FFCDD7',
                  danger: '#E23131',
                  focus: '#FFCDD7',

                  buttonText: '#0F1523',
                  buttonOutlineText: '#C3C3C3',
                  buttonReset: '#0F1523',
                  error: '#E23131',
                  stroke: '#D1D5DB',
                  mobileFooter: '#3A3C45',
                  mobileBg: '#FFFFFF',
              }
            : {
                  bg: '#131720',
                  main: '#C3C3C3',
                  contrast: '#181C26',
                  lightGray: '#494F58',
                  gray: '#4A4B5A',
                  darkGray: '#3A3C45',
                  accent1: '#DBADB6',
                  accentHover: '#4F444D',
                  accent2: '#458CA8',
                  accent3: '#BF7281',
                  accent4: '#B6465B',
                  footerBg: '#0E121A',
                  footerMain: '#6C7178',
                  disable: '#0E1118',
                  form: '#181C26',
                  link: '#DBADB6',
                  linkHover: '#BF7281',
                  danger: '#F44242',
                  focus: '#BF7281',

                  buttonText: '#181C26',
                  buttonOutlineText: '#181C26',
                  buttonReset: '#DBADB6',
                  error: '#BF7281',
                  stroke: '#4A4B5A',
                  mobileFooter: '#131720',
                  mobileBg: '#181C26',
              }
    return <ThemeProvider theme={colors}>{children}</ThemeProvider>
}
