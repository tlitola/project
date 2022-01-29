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

const authenticated = false

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<NavBar urls={urls} authenticated={authenticated} />
			{children}
		</>
	)
}
