import React, { createContext, useState } from 'react'
import NavBar, { Url } from './navbar'

const urls: Url[] = [
	{
		url: '/',
		name: 'Home',
	},
	{
		url: '/test',
		name: 'Test',
	},
	{
		url: '/about',
		name: 'About',
	},
	{
		url: '/contact',
		name: 'Contact',
	},
]

export const HistoryContext = createContext<
	[string[], React.Dispatch<React.SetStateAction<string[]>>]
>([
	[],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
])

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [history, setHistory] = useState<string[]>([])

	return (
		<>
			<NavBar urls={urls} authenticated={false} />

			<HistoryContext.Provider value={[history, setHistory]}>
				{children}
			</HistoryContext.Provider>
		</>
	)
}
