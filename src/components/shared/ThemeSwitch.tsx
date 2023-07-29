import React from 'react'
import { $themeStore, changeTheme } from '../../store/theme'
import { useStore } from 'effector-react'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { Moon } from './icons/sidebar/Moon'
import { Text } from '../../styles/Text'
import { Sun } from './icons/sidebar/Sun'

const ThemeSwitch = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const theme = useStore($themeStore)
    return (
        <div>
            {theme === 'light' ? (
                <InvisibleButton
                    onClick={(event) => {
                        changeTheme('dark')
                        event.currentTarget.blur()
                    }}
                >
                    <Moon />
                    {!isCollapsed && <Text>Темная тема</Text>}
                </InvisibleButton>
            ) : (
                <InvisibleButton
                    onClick={(event) => {
                        changeTheme('light')
                        event.currentTarget.blur()
                    }}
                >
                    <Sun />
                    {!isCollapsed && <Text>Светлая тема</Text>}
                </InvisibleButton>
            )}
        </div>
    )
}

export default ThemeSwitch
