import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeCtx = {
	theme: Theme
	setTheme: (t: Theme) => void
}

const Ctx = createContext<ThemeCtx | null>(null)

export const useTheme = (): ThemeCtx => {
	const v = useContext(Ctx)
	if (!v) throw new Error('ThemeProvider missing')
	return v
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const ls = window.localStorage.getItem('THEME') as Theme | null
		if (ls) setTheme(ls)
		else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark')
	}, [])

	useEffect(() => {
		document.documentElement.dataset.theme = theme
		window.localStorage.setItem('THEME', theme)
	}, [theme])

	const value = useMemo(() => ({ theme, setTheme }), [theme])
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}


